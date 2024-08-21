import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCalendar, FaUser, FaMapMarkerAlt, FaFileAlt, FaSearch, FaSort } from 'react-icons/fa';

const History = () => {
    const [suratList, setSuratList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('tanggal');
    const [sortDirection, setSortDirection] = useState('desc');

    useEffect(() => {
        fetchSuratList();
    }, []);

    const fetchSuratList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/history');
            setSuratList(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('There was an error fetching the surat data!', error);
            setIsLoading(false);
        }
    };

    const handleSort = (field) => {
        setSortField(field);
        setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    };

    const sortedAndFilteredSuratList = suratList
        .filter(surat => 
            surat.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.kepada.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.untuk.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-300">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-900 mb-8 text-center">History Surat Tugas</h2>
                
                <div className="mb-6 flex justify-between items-center">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="pl-10 pr-4 py-2 rounded-full border-2 border-indigo-300 focus:outline-none focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-indigo-400" />
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => handleSort('tanggal')}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 flex items-center"
                        >
                            Sort by Date <FaSort className="ml-2" />
                        </button>
                        <button
                            onClick={() => handleSort('nomor')}
                            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300 flex items-center"
                        >
                            Sort by Number <FaSort className="ml-2" />
                        </button>
                    </div>
                </div>

                {sortedAndFilteredSuratList.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-xl p-8 text-center">
                        <p className="text-xl text-gray-600">Not found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sortedAndFilteredSuratList.map((surat) => (
                            <div key={surat.id} className="bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
                                    <h3 className="text-xl font-semibold text-white truncate">{surat.nomor}</h3>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center">
                                        <FaUser className="text-indigo-500 mr-3" />
                                        <p className="truncate"><span className="font-semibold">Kepada:</span> {surat.kepada}</p>
                                    </div>
                                    <div className="flex items-start">
                                        <FaFileAlt className="text-indigo-500 mr-3 mt-1" />
                                        <p className="line-clamp-2"><span className="font-semibold">Untuk:</span> {surat.untuk}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaCalendar className="text-indigo-500 mr-3" />
                                        <p><span className="font-semibold">Tanggal:</span> {new Date(surat.tanggal).toLocaleDateString()}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="text-indigo-500 mr-3" />
                                        <p className="truncate"><span className="font-semibold">Tempat:</span> {surat.tempat}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;