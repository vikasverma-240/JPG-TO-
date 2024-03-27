import React from 'react';

function Upload() {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const response = await fetch('http://localhost:3001/convert', {
            method: 'POST',
            body: formData,
        });
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'converted-image.webp';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="App">
            <div>
                <div className="h-[70vh] pt-12 font-sans text-gray-900 bg-slate-50 border-box">
                    <div className="flex justify-center w-full mx-auto sm:max-w-lg">
                        <div className="flex flex-col items-center justify-center w-full h-auto my-20 bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl">
                            <div className="mt-10 mb-10 text-center">
                                <h2 className="text-2xl font-semibold mb-2">Upload your files</h2>
                                <p className="text-xs text-gray-500">
                                    File should be of format .mp4, .avi, .mov or .mkv
                                </p>
                            </div>
                            <form
                                action="#" onSubmit={handleSubmit}
                                className="relative w-4/5 h-32 max-w-xs mb-10 bg-white bg-gray-100 rounded-lg shadow-inner"
                            >
                                <input type="file" name='image' id="image" className="hidden" />
                                <label
                                    htmlFor="image"
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
                                <button type="submit" className="px-4 py-2 my-5 bg-purple-800 text-white">Convert to WEBP</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default Upload;
