import React from 'react';

import {AnalysisViewModel} from '../viewmodel/AnalysisViewModel.ts';
import {TimedAutomaton} from "../model/ta/timedAutomaton.ts";
import timedAutomata from '../parser/timedAutomata';
import {Clock} from "../model/ta/clock.ts";
import {Location} from "../model/ta/location.ts";
import {ClockConstraint} from "../model/ta/clockConstraint.ts";
import {Clause} from "../model/ta/clause.ts";
import {ClockComparator} from "../model/ta/clockComparator.ts";
import {Switch} from "../model/ta/switch.ts";
import {Button} from "@mui/material";
import { useMathUtils } from '../utils/mathUtils';
import {AutomatonOptionType, OpenedProcesses} from "../viewmodel/OpenedProcesses.ts";

export interface OpenedDocs {
  viewModel: AnalysisViewModel;//für update Locations iwie?
  openedProcesses : OpenedProcesses;
  // brauche dann noch so ne "mapParsedDataToTA" Funktion und kann dann aus mappingUtils die Fkt aufrufen
  //fileContents: string; //<-- brauch ich sowas???
}

const parseFile = async (fileContent: string) => {
  const parser = new timedAutomata.Parser();
  //const parser = new TsTckParser();
  const parsedData = parser.parse(fileContent);

  return parsedData;
};

const convertToTa = async (parsedData, viewModel, avgRounded ):Promise<AutomatonOptionType[]> => {
  const taModel: AutomatonOptionType[] = []; //TODO das abändern, oder Namen in timedAutomaton.ts packen?

  parsedData.items.forEach((item) => {
    if (item.type == 'process') {
      const name: string = item.name;
      const TA: TimedAutomaton = {
        locations: [],
        clocks: [],
        switches: [],
      };
      taModel.push({label:name, automaton:TA});
    }
  });
  parsedData.items.forEach((item) => {
    if(item.type == 'event') {

    }
    if(item.type == 'clock') {
      if (item.amount == 1) {
        const newClock: Clock = { name: item.name };
        taModel.forEach((option) => {option.automaton.clocks.push(newClock) });
      } else {
        for (let i = 0; i < item.amount; i++) {
          const clockName: string = item.name + String(item.amount);
          const newClock: Clock = {name: clockName};
          taModel.forEach((option) => { option.automaton.clocks.push(newClock) });
        }
      }
    }
    if(item.type == 'int'){

    }
    if(item.type == 'location'){
      const processName : string = item.processName;
      const locName: string = item.name;
      let isInitial: boolean = false;
      const invariants : ClockConstraint = { clauses: [] };
      item.attributes.forEach((attribute) => {
        if(attribute.hasOwnProperty('initial')){
          isInitial = true;
        }
        if(attribute.hasOwnProperty('invariant')){
          attribute.constraint.forEach((constr) => {
            const lhs: Clock = {name: constr.lhs};
            const comparator: ClockComparator = constr.comparator;
            const rhs: number = constr.rhs;
            const newClause: Clause = { lhs: lhs, op: comparator, rhs: rhs};
            invariants.clauses.push(newClause);
          });
        }
        if(attribute.hasOwnProperty('labels')){

        }
        if(attribute.hasOwnProperty('commited')){

        }
        if(attribute.hasOwnProperty('urgent')){

        }
      })
      const locations = viewModel.ta.locations;
      const xCoordAvg = avgRounded(locations.map((l) => l.xCoordinate));
      const yCoordAvg = avgRounded(locations.map((l) => l.yCoordinate));
      const newLocation: Location = {name: locName, isInitial: isInitial, invariant: invariants, xCoordinate: xCoordAvg, yCoordinate: yCoordAvg };
      taModel.forEach((option) => {
        if(option.label == processName){
          option.automaton.locations.push(newLocation);
        }
      });
    }
    if(item.type == 'edge'){
      const processName : string = item.processName;
      const actionLabel : string = item.event;
      const sourceName : string = item.source;
      const targetName : string = item.target;
      let source : Location;
      let target : Location;
      taModel.forEach((option) => {
        if(option.label == processName){
          source = option.automaton.locations.filter((location) => location.name === sourceName)[0];
          target = option.automaton.locations.filter((location) => location.name === targetName)[0];
        }
      });

      const guard :ClockConstraint = { clauses: [] };
      const setClocks : Clock[] = [];
      //const clockNames : string[] = [];
      item.attributes.forEach((attribute) => {

        if (attribute.hasOwnProperty('provided')) {
          attribute.constraint.forEach((constr) => {
            const lhs: Clock = {name: constr.lhs};
            let comparator: ClockComparator;
            if(constr.comparator == "=="){
              comparator = ClockComparator.EQ;
            }else{
              comparator = constr.comparator;
            }
            const rhs: number = constr.rhs;
            const newClause: Clause = { lhs: lhs, op: comparator, rhs: rhs};
            guard.clauses.push(newClause);
          });
        }
        if(attribute.hasOwnProperty('do')){
          attribute.maths.forEach((math) => {
            const lhs: Clock = {name: math.lhs};
            const set: ClockComparator = math.set;
            const rhs: number = math.rhs;
            //for now only really resets clocks?
            if(set == '=' && rhs == 0){
              setClocks.push(lhs);
              //clockNames.push(lhs.name);
            }
          });
          //TODO was wenn nicht zB x=0? das ist ja glaub ich noch nicht möglich
        }
      });
      const newSwitch : Switch = {source: source, guard: guard, actionLabel: actionLabel, reset: setClocks, target: target};
      taModel.forEach((option) => {
        if(option.label == processName){
          option.automaton.switches.push(newSwitch);
        }
      });
    }
    if(item.type == 'sync'){
    }

  });
  console.log("All processes:", taModel);
  return taModel;
}

const UploadButton: React.FC<OpenedDocs> = (props) => {
  const { viewModel, openedProcesses } = props;
  const { avgRounded } = useMathUtils();
  const handleClick = (uploadedFileEvent: React.ChangeEvent<HTMLInputElement>) => {
    const inputElem = uploadedFileEvent.target as HTMLInputElement & {
      files: FileList;
    };

    //TODO der überprüft ja momentan noch nicht wirklich, ob das eine .tck Datei ist...
    if (!inputElem.files[0] || !inputElem.files[0].name.endsWith('.tck')) {
      console.log('Invalid or no File');
      return;
    }
    console.log("inputFile:", inputElem.files[0]); //eingelesene File

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const fileContent = fileReader.result as string;
      console.log("fileContent:", fileContent);

      try {
        const parsedData = await parseFile(fileContent);
        console.log("parsed Data:", parsedData);
        const automatonOptions = await convertToTa(parsedData, viewModel, avgRounded);

        console.log("AutomatonOptions:", automatonOptions);
        openedProcesses.automatonOptions = automatonOptions; //<-- sollte eig nicht notwendig sein, aber wird benötigt...
        openedProcesses.setAutomatonOptions(openedProcesses, automatonOptions);
        console.log("options set in opened Processes", openedProcesses);
        viewModel.setAutomaton(viewModel, automatonOptions[0].automaton);
        console.log("processes created in Selection bar!!");

      } catch (error) {
        console.error(error);
      }
    };
    fileReader.readAsText(inputElem.files[0]);

    inputElem.value = '';
    //TODO Muss ich die File noch irgendwo anders abspeichern?
  };

  //TODO hier noch das "Upload file" in diese Localization file tun
  return (
    <label htmlFor="uploadFile">
      <Button variant="contained" component="label" sx={{mr: 0.15, mb: 0.2}}>
        Upload File
        <input id="uploadFile" type="file" accept=".tck" onChange={handleClick}/>
      </Button>
    </label>
  );
};

export default UploadButton;
