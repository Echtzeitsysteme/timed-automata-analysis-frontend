import React from 'react';

import timedAutomata from '../parser/timedAutomata';
console.log(timedAutomata);

export interface OpenedDocs {
  //unbenennen in OpenedDocs oder so
  //fileContents: string;
}

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
    fileReader.onload = () => {
      const fileContent = fileReader.result as string;
      console.log(fileContent);

      //TODO das einkommentieren, sobald import geht
      const parser = new timedAutomata.Parser();

      const parsedData = parser.parse(fileContent);
      console.log(parsedData);
    };
    fileReader.readAsText(inputElem.files[0]);

    //TODO Muss ich die File noch irgendwo anders abspeichern?
  };

  /**
  const myPromise: Promise<any> = new Promise((resolve, reject)) => {
    parser.parse(inputFile);
  }

  //oder "File", wenn ich den fileReader hier mit reinpacke
  async function parseData(inputFile: string){
    try{
      const parsedData = await parser.parse(inputFile);
      console.log(parsedData);
      //ODER:
      // return parser.parse(inputFile);
      console.log('a');
    }
    catch(error){
      console.log(error);
    }

  }
   **/

  //TODO hier noch das "Upload file" in diese Localization file tun
  return (
    <label htmlFor="uploadFile">
      <input id="uploadFile" type="file" accept=".tck" onChange={handleClick} />
      <div className="uploadButton">Upload file</div>
    </label>
  );
};

export default UploadButton;
