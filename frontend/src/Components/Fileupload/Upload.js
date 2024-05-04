import React from 'react';

function FileUpload({ onFileSelect, onConvert, format, downloadUrl, uploadStatus, isConverted }) {
    return (
        <div className="flex flex-col items-center justify-center my-4">
            <input type="file" onChange={onFileSelect} accept="image/jpeg,image/jpg" />
            <button onClick={onConvert} className="mt-2 bg-blue-500 text-white p-2 rounded">
                Convert to {format.toUpperCase()}
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
            {isConverted && downloadUrl && (
                <a href={downloadUrl} download={`converted-image.${format}`}>
                    <button className="mt-2 bg-green-500 text-white p-2 rounded">
                        Download Converted Image
                    </button>
                </a>
            )}
        </div>
    );
}

export default FileUpload;
