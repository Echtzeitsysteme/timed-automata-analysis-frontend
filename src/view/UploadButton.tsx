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
import {useClockConstraintUtils} from "../utils/clockConstraintUtils.ts";
import {OpenedSystems, SystemOptionType} from "../viewmodel/OpenedSystems.ts";

export interface OpenedDocs {
  viewModel: AnalysisViewModel; //für update Locations iwie?
  openedSystems : OpenedSystems;
  openedProcesses: OpenedProcesses;
}

const parseFile = async (fileContent: string) => {
  const parser = new timedAutomata.Parser();
  //const parser = new TsTckParser();
  const parsedData = parser.parse(fileContent);

  return parsedData;
};

const convertToTa = async (parsedData, viewModel, avgRounded, constraintUsesClock ):Promise<[string, AutomatonOptionType[]]> => {
  const systemName: string = parsedData.system.name;
  const taProcesses: AutomatonOptionType[] = [];

  parsedData.items.forEach((item) => {
    if (item.type == 'process') {
      const name: string = item.name;
      const TA: TimedAutomaton = {
        locations: [],
        clocks: [],
        switches: [],
      };
      taProcesses.push({label:name, automaton:TA});
    }
  });
  parsedData.items.forEach((item) => {
    if(item.type == 'event') {

    }
    if(item.type == 'clock') {
      if (item.amount == 1) {
        const newClock: Clock = { name: item.name };
        taProcesses.forEach((option) => {option.automaton.clocks.push(newClock) });
      } else {
        for (let i = 0; i < item.amount; i++) {
          const clockName: string = item.name + '[' + String(item.amount) + ']';
          const newClock: Clock = {name: clockName};
          taProcesses.forEach((option) => { option.automaton.clocks.push(newClock) });
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
            let comparator: ClockComparator;
            if(constr.comparator == "=="){
              comparator = ClockComparator.EQ;
            } else if(constr.comparator == "≤"){
              comparator = ClockComparator.LEQ;
            } else if(constr.comparator == "≥"){
              comparator = ClockComparator.GEQ;
            } else{
              comparator = constr.comparator;
            }
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
      taProcesses.forEach((option) => {
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
      taProcesses.forEach((option) => {
        if(option.label == processName){
          source = option.automaton.locations.filter((location) => location.name === sourceName)[0];
          target = option.automaton.locations.filter((location) => location.name === targetName)[0];
        }
      });

      const guard :ClockConstraint = { clauses: [] };
      const setClocks : Clock[] = [];
      item.attributes.forEach((attribute) => {

        if (attribute.hasOwnProperty('provided')) {
          attribute.constraint.forEach((constr) => {
            const lhs: Clock = {name: constr.lhs};
            let comparator: ClockComparator;
            if(constr.comparator == "=="){
              comparator = ClockComparator.EQ;
            } else if(constr.comparator == "≤"){
              comparator = ClockComparator.LEQ;
            } else if(constr.comparator == "≥"){
              comparator = ClockComparator.GEQ;
            } else{
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
            }
          });
          //TODO was wenn nicht zB x=0? das ist ja glaub ich noch nicht möglich
        }
      });
      const newSwitch : Switch = {source: source, guard: guard, actionLabel: actionLabel, reset: setClocks, target: target};
      taProcesses.forEach((option) => {
        if(option.label == processName){
          option.automaton.switches.push(newSwitch);
        }
      });
    }
    if(item.type == 'sync'){
    }

  });

  //Filter unnecessary clocks
  taProcesses.forEach((ta)=> {
    const guards = ta.automaton.switches.map((sw) => sw.guard);
    const invariants = ta.automaton.locations.map((loc) => loc.invariant);
    const guardsAndInvars = [...guards, ...invariants].filter((constraint) => {return constraint !== undefined});
    ta.automaton.clocks = ta.automaton.clocks.filter((clock) => {
      return guardsAndInvars.filter((cc) => { return constraintUsesClock(clock.name, cc)}).length > 0;
    });
  });

  console.log("All processes:", taProcesses);
  return [systemName, taProcesses];
}

const UploadButton: React.FC<OpenedDocs> = (props) => {
  const { viewModel, openedSystems, openedProcesses } = props;
  const { avgRounded } = useMathUtils();
  const { constraintUsesClock } = useClockConstraintUtils();

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
        let [systemName, automatonOptions] = await convertToTa(parsedData, viewModel, avgRounded, constraintUsesClock);

        const one = 1;
        openedSystems.systemOptions.forEach(option => {
          if(option.label === systemName){
            systemName += '(' + String(one) + ')';
          }
        })
        const processes: AutomatonOptionType[] = automatonOptions;
        const newSystem : SystemOptionType = {label: systemName, processes: processes};

        openedProcesses.selectedOption.automaton = viewModel.ta;
        openedSystems.selectedSystem.processes =openedProcesses.automatonOptions;
        openedSystems.addSystemOption(openedSystems, newSystem);

        openedSystems.selectedSystem = newSystem;
        openedProcesses.setAutomatonOptions(openedProcesses, automatonOptions);
        viewModel.setAutomaton(viewModel, openedProcesses.selectedOption.automaton);

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
