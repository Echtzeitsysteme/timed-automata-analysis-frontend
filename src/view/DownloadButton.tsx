import React from 'react';
import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel';
import { TimedAutomaton } from '../model/ta/timedAutomaton.ts';
import Button from "@mui/material/Button";
import {AutomatonOptionType, OpenedProcesses} from "./ProcessSelection.tsx";

interface ActiveModel {
  viewModel: AnalysisViewModel;
  openedProcesses : OpenedProcesses;
}

const createFile = async (automatonOptions: AutomatonOptionType[]) => {
  //TODO doesnt encompass any processes, systems or other definitions since the TA Definition only contains these types
  const system = 'system'; //system name
  const systemDef = 'system:' + system + '\n';

  let taFile = systemDef;

  automatonOptions.forEach((option)=> {
    const process = option.label;
    const processDef = 'process:' + process + '\n';

    const ta = option.automaton;

    let clocks = '';
    let locations = '';
    let edges = '';

    ta.clocks.forEach((clock) => {
      const newClock = 'clock:' + '1' + ':' + clock.name + '\n';
      clocks += newClock;
    });
    ta.locations.forEach((location) => {
      let newLocation = 'location:' + process + ':' + location.name + '{';
      if (location.isInitial) {
        newLocation += 'initial:';
      }
      if (location.invariant != undefined) {
        location.invariant.clauses.forEach((clause) => {
          const newClause = clause.lhs.name.toString() + clause.op.toString() + clause.rhs.toString();
          newLocation += 'invariant:' + newClause;
        });
      }
      newLocation += '}' + '\n';
      locations += newLocation;
    });
    ta.switches.forEach((edge) => {
      let newEdge = 'edge:' + process + ':' + edge.source.name + ':' + edge.target.name + ':' + edge.actionLabel + '{';
      if (edge.guard != undefined) {
        let first: boolean = true;
        edge.guard.clauses.forEach((clause) => {
          let newClause = "";
          if(clause.op.toString() == "="){
            newClause = clause.lhs.name.toString() + "==" + clause.rhs.toString();
          } else{
            newClause = clause.lhs.name.toString() + clause.op.toString() + clause.rhs.toString();
          }
          if (first) {
            newEdge += 'provided:' + newClause;
            first = false;
          } else {
            newEdge += '&&' + newClause;
          }
        });
      }
      if (edge.guard != undefined && edge.reset.length > 0) {
        newEdge += ':';
      }
      edge.reset.forEach((reset) => {
        newEdge += 'do:' + reset.name + '=0';
      });
      newEdge += '}' + '\n';
      edges += newEdge;
    });
    const singularProcess = processDef + clocks + locations + edges;
    taFile += singularProcess;
  })
  //console.log(taFile);

  return taFile;
};

const DownloadButton: React.FC<ActiveModel> = (props) => {
  const { viewModel, openedProcesses } = props;
  //console.log(viewModel);
  const automatonOptions = openedProcesses.automatonOptions;

  const downloadModel = async () => {
    try {
      const file = await createFile(automatonOptions);

      const blob = new Blob([file]);
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'file.tck';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error(error);
    }
  };

  //TODO hier noch das "Download Model" in diese Localization file tun
  return (
    <label htmlFor="downloadModel">
      <Button variant='contained' onClick={downloadModel} sx={{mr: 0.15, mb: 0.2}}>
        Download System
      </Button>
    </label>
  );
};

export default DownloadButton;
