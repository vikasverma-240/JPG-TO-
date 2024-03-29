import React, { useState } from 'react';

function Upload() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileName, setFileName] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isConverted, setIsConverted] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileName(file.name);
            setUploadProgress(0);
            setIsConverted(false);
            setDownloadUrl('');
            setUploadStatus('');
        }
    };

    const handleUploadAndConvert = async () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://jpg-to.onrender.com/convert', true);
            xhr.responseType = 'blob';

            xhr.upload.onprogress = (event) => {
                if (event.lengthComputable) {
                    const progress = (event.loaded / event.total) * 100;
                    setUploadProgress(progress);
                }
            };

            xhr.onload = () => {
                if (xhr.status === 200) {
                    setIsConverted(true);
                    const blob = xhr.response;
                    const url = window.URL.createObjectURL(blob);
                    setDownloadUrl(url);
                    setUploadStatus('Conversion successful!');
                } else {
                    setUploadStatus('Conversion failed.');
                }
            };

            xhr.onerror = () => {
                setUploadStatus('Upload error. Please try again.');
            };

            xhr.send(formData);
        } catch (error) {
            console.error('Upload exception:', error);
            setUploadStatus('An error occurred. Please try again.');
        }
    };

    return (
        <div className="App p-4 h-[70vh] pt-12 font-sans text-gray-900 bg-slate-50 border-box">
            <div className='flex justify-center w-full mx-auto sm:max-w-lg'>
                <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                    <div className="mt-10 mb-10 text-center">
                        <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                        {/* Conditionally display the file name or the instruction */}
                        <p className="text-xs text-gray-500">
                            {fileName || "File should be of format JPEG OR JPG"}
                        </p>
                        <input type="file" id="fileInput" onChange={handleFileChange} accept="image/jpeg,image/jpg" className="hidden" />
                        <label
                            htmlFor="fileInput"
                            className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
                        >
                            <p className="z-10 text-xs font-light text-center text-gray-500">
                                Drag &amp; Drop your files here
                            </p>
                            <svg
                                className="z-10 w-8 h-8 text-purple-800"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </svg>
                        </label>
                        {!isConverted && selectedFile && (
                            <button
                                onClick={handleUploadAndConvert}
                                disabled={!selectedFile}
                                className="ml-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition-colors"
                            >
                                Upload and Convert
                            </button>
                        )}
                        {uploadProgress > 0 && (
                            <div className="mt-2">
                                <progress value={uploadProgress} max="100" className="w-full"></progress>
                                <div className="text-center">{Math.round(uploadProgress)}%</div>
                            </div>
                        )}
                    </div>
                </div>


            </div>
            <p className="mt-2">{uploadStatus}</p>
            {isConverted && downloadUrl && (
                <a href={downloadUrl} download="converted-image.webp">
                    <button className="mt-2 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700 transition-colors">
                        Download Converted Image
                    </button>
                </a>
            )}
        </div>
    );
}

export default Upload;
