import React from 'react';

import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import { TsTckParser } from '../parser/tsTck.ts';
import {TimedAutomaton} from "../model/ta/timedAutomaton.ts";
import timedAutomata from '../parser/timedAutomata';
import {Clock} from "../model/ta/clock.ts";
import {Location} from "../model/ta/location.ts";
import {ClockConstraint} from "../model/ta/clockConstraint.ts";
import {Clause} from "../model/ta/clause.ts";
import {ClockComparator} from "../model/ta/clockComparator.ts";

export interface OpenedDocs {
  viewModel: AnalysisViewModel; //für update Locations iwie?
  // brauche dann noch so ne "mapParsedDataToTA" Funktion und kann dann aus mappingUtils die Fkt aufrufen
  //fileContents: string; //<-- brauch ich sowas???
}

const parseFile = async (fileContent: string) => {
  const parser = new timedAutomata.Parser();
  //const parser = new TsTckParser();
  const parsedData = parser.parse(fileContent);

  return parsedData;
};

const convertToTa = async (parsedData)=> {
  const taModel: [string,TimedAutomaton][] = []; //TODO das abändern, oder Namen in timedAutomaton.ts packen?

  parsedData.items.forEach((item) => {
    if(item.type == 'process'){
      const name: string = item.name;
      const TA: TimedAutomaton = {
        locations: [],
        clocks: [],
        switches: [],
      };
      taModel.push([name, TA]);
    }
    if(item.type == 'event') {

    }
    if(item.type == 'clock') {
      if (item.amount == 1) {
        const newClock: Clock = item.name;
        taModel[1].forEach((ta:TimedAutomaton) => { ta.clocks.push(newClock) });
      } else {
        for (let i = 0; i < item.amount; i++) {
          const clockName: string = item.name + String(item.amount)
          const newClock: Clock = {name: clockName};
          taModel[1].forEach((ta:TimedAutomaton) => { ta.clocks.push(newClock) });
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
          const lhs: Clock = {name: attribute.constraint.lhs};
          const comparator: ClockComparator = attribute.constraint.comparator;
          const rhs: number = attribute.constraint.rhs;
          const newClause: Clause = { lhs: lhs, op: comparator, rhs: rhs};
          invariants.clauses.push(newClause);
        }
        if(attribute.hasOwnProperty('labels')){

        }
        if(attribute.hasOwnProperty('commited')){

        }
        if(attribute.hasOwnProperty('urgent')){

        }
      })
      //const newLocation: Location = {name:  };
    }
    if(item.type == 'edge'){
      const processName : string = item.processName;
      const actionLabel : string = item.event;
      const sourceName : string = item.source;
      const targetName : string = item.target;
      //TODO d.h. muss noch die Location anhand des Namens raussuchen

      const guard :ClockConstraint = { clauses: [] };
      const setClocks : Clock[] = [];
      item.attributes.forEach((attribute) => {

        if (attribute.hasOwnProperty('provided')) {
          const lhs: Clock = attribute.maths.lhs;
          const comparator: ClockComparator = attribute.maths.comparator;
          const rhs: number = attribute.maths.rhs;
          const newClause: Clause = { lhs: lhs, op: comparator, rhs: rhs};
          guard.clauses.push(newClause);
        }
        if(attribute.hasOwnProperty('do')){
          const lhs: Clock = attribute.maths.lhs;
          const set: ClockComparator = attribute.maths.set;
          const rhs: number = attribute.maths.rhs;
          //for now only really resets clocks?
          if(set == '=' && rhs == 0){
            setClocks.push(lhs);
          }
          //TODO was wenn nicht zB x=0? das ist ja glaub ich noch nicht möglich
        }
      });
    }
    if(item.type == 'sync'){
    }

  });
  //TODO und dann eben hier einen TA erstellen und anhand der File clocks, locations, edges einfügen
}

const UploadButton: React.FC<OpenedDocs> = (props) => {
  const { viewModel } = props;

  const handleClick = (uploadedFileEvent: React.ChangeEvent<HTMLInputElement>) => {
    const inputElem = uploadedFileEvent.target as HTMLInputElement & {
      files: FileList;
    };

    //TODO der überprüft ja momentan noch nicht wirklich, ob das eine .tck Datei ist...
    if (!inputElem.files[0] || !inputElem.files[0].name.endsWith('.tck')) {
      console.log('Invalid or no File');
      return;
    }
    console.log(inputElem.files[0]); //eingelesene File

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const fileContent = fileReader.result as string;
      console.log(fileContent);

      try {
        const parsedData = await parseFile(fileContent);
        console.log(parsedData);
        const ta = await convertToTa(parsedData);
        //console.log(JSON.parse(parsedData)); //contents of parsed File
      } catch (error) {
        console.error(error);
      }
    };
    fileReader.readAsText(inputElem.files[0]);

    //TODO Muss ich die File noch irgendwo anders abspeichern?
  };

  //TODO hier noch das "Upload file" in diese Localization file tun
  return (
    <label htmlFor="uploadFile">
      <input id="uploadFile" type="file" accept=".tck" onChange={handleClick} />
      <div className="uploadButton">Upload file</div>
    </label>
  );
};

export default UploadButton;
