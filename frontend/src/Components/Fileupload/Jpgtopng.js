import React, { useState } from 'react';
import Upload from './Upload';

function ConvertToWebP() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [isConverted, setIsConverted] = useState(false);
    const [downloadUrl, setDownloadUrl] = useState('');

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleConvert = () => {
        if (!selectedFile) {
            alert('Please select a file first!');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        fetch(`http://localhost:3001/convert?format=png`, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.blob();
        }).then(blob => {
            const url = window.URL.createObjectURL(blob);
            setDownloadUrl(url);
            setIsConverted(true);
            setUploadStatus('Conversion successful!');
        }).catch(error => {
            console.error('Error:', error);
            setUploadStatus('An error occurred. Please try again.');
        });
    };

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-center text-xl font-bold mb-4">Convert JPG png</h1>
            <Upload
                onFileSelect={handleFileSelect}
                onConvert={handleConvert}
                format="png"
                downloadUrl={downloadUrl}
                uploadStatus={uploadStatus}
                isConverted={isConverted}
            />
        </div>
    );
}

export default ConvertToWebP;
