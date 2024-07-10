import React from 'react';

const DownloadButton: React.FC = () => {
  //TODO hier noch das "Download Model" in diese Localization file tun
  const handleClick = () => {};

  return (
    <div>
      <label htmlFor="downloadModel">
        <button className="uploadButton" onClick={handleClick}>
          Download Model
        </button>
      </label>
    </div>
  );
};

export default DownloadButton;
