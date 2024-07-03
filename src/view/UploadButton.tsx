import React from 'react';

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

    if (!inputElem.files[0]) {
      return;
    }
    console.log(inputElem.files[0]); //eingelesene File

    //das alles vllcht in einen "Promise"-Block reinpacken???

    //definition für fileReader
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const fileContent = fileReader.result as string;
      console.log(fileContent);

      //TODO und hier dann in das onload selbst Parser noch rein
    };
    fileReader.readAsText(inputElem.files[0]);
    //TODO Parser Class in anderer Datei erstellen für String auslesen oder in onload selbst

    //TODO Muss ich die File noch irgendwo anders abspeichern?
  };

  //TODO hier noch das "Upload file" in diese Localization file tun
  return (
    <div>
      <label htmlFor="uploadFile">
        <input id="uploadFile" type="file" accept=".tck" onChange={handleClick} />
        <div className="uploadButton"> Upload file</div>
      </label>
    </div>
  );
};

export default UploadButton;
