import React from 'react';
import { AnalysisViewModel, useAnalysisViewModel } from '../viewmodel/AnalysisViewModel';
import { TimedAutomaton } from '../model/ta/timedAutomaton.ts';

interface ActiveModel {
  viewModel: AnalysisViewModel;
}

const createFile = async (ta: TimedAutomaton) => {
  //TODO doesnt encompass any processes, systems or other definitions since the TA Definition only contains these types
  const system = 'system'; //system name
  const process = 'process'; //process name

  const systemDef = 'system:' + system + '\n';
  const processDef = 'process:' + process + '\n';

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
        const newClause = clause.lhs.name.toString() + clause.op.toString() + clause.rhs.toString();
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
  const taFile = systemDef + processDef + clocks + locations + edges;
  //console.log(taFile);

  return taFile;
};

const DownloadButton: React.FC<ActiveModel> = () => {
  //dieses viewModel darf nur in einer React.FC aufgerufen werden, wegen Hooks.
  const viewModel = useAnalysisViewModel(); //<-- ist das so überhaupt richtig?
  console.log(viewModel);

  const downloadModel = async () => {
    try {
      const file = await createFile(viewModel.ta);

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
      <button className="uploadButton" onClick={downloadModel}>
        Download Model (alt)
      </button>
    </label>
  );
};

export default DownloadButton;
