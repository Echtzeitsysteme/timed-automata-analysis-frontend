import React from 'react';

import { AnalysisViewModel } from '../viewmodel/AnalysisViewModel.ts';
import { TsTckParser } from '../parser/tsTck.ts';
//import timedAutomata_doof from '../parser/timedAutomata_doof';

export interface OpenedDocs {
  viewModel: AnalysisViewModel; //für update Locations iwie?
  // brauche dann noch so ne "mapParsedDataToTA" Funktion und kann dann aus mappingUtils die Fkt aufrufen
  //fileContents: string; //<-- brauch ich sowas???
}

const parseFile = async (fileContent: string) => {
  //const parser = new timedAutomata.Parser();
  //const parser = new timedAutomata_alt.Parser();
  const parser = new TsTckParser();
  const parsedData = parser.parse(fileContent);

  return parsedData;
};

const UploadButton: React.FC<OpenedDocs> = () => {
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
        //console.log(JSON.parse(parsedData)); //contents of parsed File
        //parsedData.forEach((elem) => console.log(elem));
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
