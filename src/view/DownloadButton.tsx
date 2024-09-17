import React from 'react';
import Button from '@mui/material/Button';
import { OpenedSystems, SystemOptionType } from '../viewmodel/OpenedSystems.ts';
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import { OpenedProcesses } from '../viewmodel/OpenedProcesses.ts';
import { deParseClockComparator } from '../model/ta/clockComparator.ts';

interface ActiveModel {
  viewModel: AnalysisViewModel;
  openedSystems: OpenedSystems;
  openedProcesses: OpenedProcesses;
}

const createFile = async (currentSystem: SystemOptionType) => {
  //TODO doesnt encompass other sync definition
  // since the current TA Definition only contains theis types
  const prefix =
    '#\n' +
    '# This is a TChecker file\n' +
    '#\n' +
    '# This file has been automatically generated by' +
    '# https://github.com/Echtzeitsysteme/timed-automata-analysis-frontend' +
    '#\n' +
    '# The TChecker file format is described here:\n' +
    '# https://github.com/ticktac-project/tchecker/wiki/TChecker-file-format\n' +
    '#\n\n';
  const systemName = currentSystem.label;
  const systemDef = 'system:' + systemName + '\n' + '\n';
  let taFile = prefix + systemDef;
  let processes = '';
  let events = '';
  let integers = '';
  const existingEvents: string[] = [];
  const existingClocks: string[] = [];

  //integers
  currentSystem.integers.forEach((int) => {
    const integer = 'int:' + int.size + ':' + int.min + ':' + int.max + ':' + int.init + ':' + int.name + '\n';
    integers += integer;
  });

  const automatonOptions = currentSystem.processes;
  automatonOptions.forEach((option) => {
    const process = option.label;
    const processDef = 'process:' + process + '\n';

    const ta = option.automaton;

    let clocks = '';
    let locations = '';
    let edges = '';

    //clocks
    ta.clocks.forEach((clock) => {
      //clocks are supposed to be global variables, don't write them multiple times
      const alreadyWritten = existingClocks.some((existingClock) => existingClock == clock.name);
      if (!alreadyWritten) {
        const newClock = 'clock:' + '1' + ':' + clock.name + '\n';
        clocks += newClock;
        existingClocks.push(clock.name);
      }
    });

    //locations
    ta.locations.forEach((location) => {
      let newLocation = 'location:' + process + ':' + location.name + '{';
      let hasPrevElem = false;
      if (location.isInitial) {
        newLocation += 'initial:';
        hasPrevElem = true;
      }
      if (hasPrevElem && location.invariant != undefined && location.invariant.clauses.length > 0) {
        newLocation += ' : ';
        hasPrevElem = false;
      }
      if (location.invariant != undefined) {
        let first: boolean = true;
        location.invariant.clauses.forEach((clause) => {
          const operator = deParseClockComparator(clause.op);
          const newClause = clause.lhs.name.toString() + operator + clause.rhs.toString();

          if (first) {
            newLocation += 'invariant:' + newClause;
            first = false;
          } else {
            newLocation += ' && ' + newClause;
          }
          hasPrevElem = true;
        });
        if (hasPrevElem) {
          newLocation += ' : ';
          hasPrevElem = false;
        }
        location.invariant.freeClauses.forEach((clause) => {
          const newClause = clause.term;
          if (first) {
            newLocation += 'invariant:' + newClause;
            first = false;
          } else {
            newLocation += ' && ' + newClause;
          }

          hasPrevElem = true;
        });
      }
      if (hasPrevElem) {
        newLocation += ' : ';
        hasPrevElem = false;
      }
      if (location.urgent) {
        newLocation += 'urgent:';
        hasPrevElem = true;
      }
      if (hasPrevElem) {
        newLocation += ' : ';
        hasPrevElem = false;
      }
      if (location.committed) {
        newLocation += 'committed:';
        hasPrevElem = true;
      }
      if (hasPrevElem) {
        newLocation += ' : ';
        hasPrevElem = false;
      }
      if (location.labels && location.labels.length > 0) {
        let first: boolean = true;
        location.labels.forEach((label) => {
          if (first) {
            newLocation += 'labels:' + label;
            first = false;
          } else {
            newLocation += ',' + label;
          }
        });
      }
      if (hasPrevElem) {
        newLocation += ' : ';
        hasPrevElem = false;
      }
      newLocation += 'layout:' + location.xCoordinate.toString() + ',' + location.yCoordinate.toString();
      newLocation += '}' + '\n';
      locations += newLocation;
    });

    ta.switches.forEach((edge) => {
      //check for events
      if (
        existingEvents.filter((event) => {
          return event === edge.actionLabel;
        }).length == 0
      ) {
        existingEvents.push(edge.actionLabel);
        const newEvent = 'event:' + edge.actionLabel + '\n';
        events += newEvent;
      }
      //actual edge definition
      let newEdge = 'edge:' + process + ':' + edge.source.name + ':' + edge.target.name + ':' + edge.actionLabel + '{';
      let needColon: boolean = false;
      if (edge.guard != undefined) {
        let first: boolean = true;
        edge.guard.clauses.forEach((clause) => {
          const operator = deParseClockComparator(clause.op);
          const newClause = clause.lhs.name.toString() + operator + clause.rhs.toString();

          if (first) {
            newEdge += 'provided:' + newClause;
            first = false;
          } else {
            newEdge += ' && ' + newClause;
          }
          needColon = true;
        });
        edge.guard.freeClauses.forEach((clause) => {
          const newClause = clause.term;
          if (first) {
            newEdge += 'provided:' + newClause;
            first = false;
          } else {
            newEdge += ' && ' + newClause;
          }
          needColon = true;
        });
      }
      if (needColon && (edge.reset.length > 0 || (edge.statement && edge.statement.statements.length > 0))) {
        newEdge += ' : ';
      }
      let first: boolean = true;
      edge.reset.forEach((reset) => {
        if (first) {
          newEdge += 'do:' + reset.name + '=0';
          first = false;
        } else {
          newEdge += ';' + reset.name + '=0';
        }
      });
      if (edge.statement != undefined) {
        edge.statement.statements.forEach((stmt) => {
          if (first) {
            newEdge += 'do:' + stmt.term;
            first = false;
          } else {
            newEdge += ';' + stmt.term;
          }
        });
      }
      newEdge += '}' + '\n';
      edges += newEdge;
    });
    const singularProcess = processDef + clocks + locations + edges;
    processes += singularProcess + '\n' + '\n';
  });
  taFile += events + '\n';
  taFile += integers + '\n';
  taFile += processes;
  //console.log(taFile);

  return taFile;
};

const DownloadButton: React.FC<ActiveModel> = (props) => {
  const { openedSystems, viewModel, openedProcesses } = props;
  const currentSystem = openedSystems.selectedSystem;
  openedProcesses.selectedOption.automaton = viewModel.ta;
  currentSystem.processes = openedProcesses.automatonOptions;
  //console.log("Current System:", currentSystem);
  const fileName = currentSystem.label + '.tck';

  const downloadModel = async () => {
    try {
      const file = await createFile(currentSystem);

      const blob = new Blob([file]);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = fileName;
      a.click();
    } catch (error) {
      console.error(error);
    }
  };

  //TODO hier noch das "Download Model" in diese Localization file tun
  return (
    <label htmlFor="downloadModel">
      <Button variant="contained" onClick={downloadModel} sx={{ mr: 0.15, mb: 0.2 }}>
        Download System
      </Button>
    </label>
  );
};

export default DownloadButton;
