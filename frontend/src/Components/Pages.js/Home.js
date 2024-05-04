import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Jpgtowebp from '../Fileupload/Jpgtowebp';
import Jpgtopng from '../Fileupload/Jpgtopng';
import Jpgtopdf from '../Fileupload/Jpgtopdf';

const Home = () => {
    return (
        <div className='mx-auto max-w-screen-xl px-4 pb-8 pt-16 sm:px-6 lg:px-8 lg:pt-24'>
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-5xl">Customise Your Product</h2>

                <p className="mx-auto mt-4 max-w-sm text-gray-500">

                </p>

                <a
                    href="#"
                    className="mt-8 inline-block rounded-full border border-purple-800 px-12 py-3 text-sm font-medium text-purple-800 hover:bg-purple-800 hover:text-white focus:outline-none focus:ring active:bg-purple-800"
                >
                    Get Startet
                </a>
            </div>
            <div class="h-40 ">
                <div class="grid grid-cols-4 gap-8 py-8 ">
                    <div className='bg-cyan-500 hover:bg-cyan-600 text-white text-center'><Link to="/convert-to-webp">Convert to WebP</Link></div>
                    <div className='bg-cyan-500 hover:bg-cyan-600 text-white text-center'><Link to="/convert-to-png">Convert to PNG</Link></div>
                    <div className='bg-cyan-500 hover:bg-cyan-600 text-white text-center'><Link to="/convert-to-pdf">Convert to PDF</Link></div>
                </div>
            </div>

            <Routes>
                <Route path="/convert-to-webp" element={<Jpgtowebp />} />
                <Route path="/convert-to-png" element={<Jpgtopng />} />
                <Route path="/convert-to-pdf" element={<Jpgtopdf />} />
            </Routes>

        </div>
    )
}

export default Home
