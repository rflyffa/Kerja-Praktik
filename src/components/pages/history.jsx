import React, { useState, useEffect } from 'react';
import axios from 'axios';

const History = () => {
    const [suratList, setSuratList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/history')
            .then((response) => {
                setSuratList(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the surat data!', error);
            });
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">History Surat Tugas</h2>
                <ul className="space-y-4">
                    {suratList.map((surat) => (
                        <li key={surat.id} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                            <p><strong>Nomor:</strong> {surat.nomor}</p>
                            <p><strong>Kepada:</strong> {surat.kepada}</p>
                            <p><strong>Untuk:</strong> {surat.untuk}</p>
                            <p><strong>Tanggal:</strong> {surat.tanggal}</p>
                            <p><strong>Tempat:</strong> {surat.tempat}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default History;
