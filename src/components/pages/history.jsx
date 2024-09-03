import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaUser, FaMapMarkerAlt, FaFileAlt, FaSearch, FaSort, FaTrash, FaEdit, FaTimes, FaPrint } from 'react-icons/fa';
<img src="/assets/ketua.png" alt="Ketua" />


const History = () => {
    const [suratList, setSuratList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('tanggal');
    const [sortDirection, setSortDirection] = useState('desc');
    const [editingSurat, setEditingSurat] = useState(null);
    const [totalSurat, setTotalSurat] = useState(0);
    const navigate = useNavigate(); // Tambahkan ini

    useEffect(() => {
        fetchSuratList();
    }, []);

    const fetchSuratList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/history');
            setSuratList(response.data);
            setTotalSurat(response.data.length);  // Update totalSurat with the length of the data
            setIsLoading(false);
        } catch (error) {
            console.error('There was an error fetching the surat data!', error);
            setIsLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/history/${id}`);
            fetchSuratList();
        } catch (error) {
            console.error('There was an error deleting the surat!', error);
        }
    };

    const handleEdit = (surat) => {
        setEditingSurat(surat);
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/history/${editingSurat.id}`, editingSurat);
            setEditingSurat(null);
            fetchSuratList();
        } catch (error) {
            console.error('There was an error updating the surat!', error);
        }
    };

    const handleSort = (field) => {
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);
    };

    const handlePrint = (surat) => {
        const printContent = `
            <html>
                <head>
                    <title>Print Surat</title>
                    <style>
                        @font-face {
                            font-family: 'Bookman Old Style';
                            src: local('Bookman Old Style'), local('Bookman');
                        }
    
                        body { 
                            font-family: 'Bookman Old Style', serif; 
                            padding: 40px; 
                        }
                        .header { text-align: center; margin-bottom: 40px; }
                        .header h2 { 
                            font-size: 24px; 
                            margin: 0; 
                            position: relative;
                            display: inline-block; 
                        }
                        .underline-container {
                            display: flex;
                            justify-content: center;
                            margin-top: 10px; /* Add space between title and underline */
                        }
                        .underline {
                            width: 600px; /* Adjust the width of the underline */
                            border-bottom: 2px solid black; /* Line color and thickness */
                        }
                        .header h3 { 
                            font-size: 18px; /* Smaller font size for the number */
                            margin: 5px 0; 
                        }
                        .content { margin-top: 20px; }
                        .content p { margin: 10px 0; font-size: 16px; }
                        .content .field { margin-bottom: 20px; }
                        .content .field span { 
                            display: inline-block; 
                            width: 150px; 
                            vertical-align: top; 
                            font-weight: bold; /* Make label bold */
                        }
                        .content .field ol { 
                            margin: 0; 
                            padding: 0; 
                            list-style-type: lower-alpha; 
                            margin-left: 0; /* Remove default left margin */
                            padding-left: 0; /* Remove default padding */
                        }
                        .content .field ol li {  
                            margin-left: 0; /* Align list items with the content */
                            line-height: 1.2;
                            margin-bottom: 10px; 
                        }
                        .content .field.flex-container { 
                            display: flex; 
                            align-items: flex-start; /* Align items at the top */
                            margin-bottom: 20px; 
                        }
                        .content .field.flex-container .text { 
                            flex: 1; /* Take up the remaining space */
                            margin-left: 10px; /* Add space between label and content */
                        }
                        .footer { margin-top: 50px; text-align: center; font-size: 14px; color: #555; }
                        .footer p { margin: 5px 0; }
                        .signature { margin-top: 60px; text-align: right; }
                        .signature p { margin: 5px 0; }
                        .inline-block { 
                            display: inline-block; 
                            vertical-align: top; 
                            width: calc(100% - 150px); 
                        }
                        .title { text-align: center; font-weight: bold; margin-top: 30px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>SURAT TUGAS</h2>
                        <div class="underline-container">
                            <div class="underline"></div>
                        </div>
                        <h3>Nomor: ${surat.nomor}</h3> <!-- Moved below the title -->
                    </div>
                    <div class="content">
                        <div class="field flex-container">
                            <span>Menimbang:</span>
                            <div class="text">
                                <ol>
                                    <li>Undang - Undang Nomor 7 Tahun 2017 tentang Pemilihan Umum (lembaran Negara Republik Indonesia Tahun 2017 Nomor 182, Tambahan Lembaran Negara Republik Indonesia Nomor 6109);</li>
                                    <li>Peraturan Komisi Pemilihan Umum Nomor 3 Tahun 2023 tentang Tugas, fungsi, Susunan Organisasi, dan Tata Kerja Sekretariat Jenderal Komisi Pemilihan Umum, Sekretariat Komisi Pemilihan Umum Provinsi, dan Sekretariat Komisi Pemilihan Umum Kabupaten/Kota;</li>
                                    <li>Biaya Perjalanan Dinas ditanggung oleh APBN.</li>
                                </ol>
                            </div>
                        </div>
                        <div class="field flex-container">
                            <span>Dasar:</span>
                            <div class="text">
                                Nota Dinas Kepala Sub Bagian Perencanaan, Data dan Informasi Nomor /PL.02.1-ND/3277/2024 tanggal Juli Perihal Permohonan Fasilitasi Perjalanan Dinas ke Kelurahan se Kota Cimahi
                            </div>
                        </div>
                        <div class="title">
                            <p>KETUA KOMISI PEMILIHAN UMUM KOTA CIMAHI</p>
                            <p>MEMBERI TUGAS</p>
                        </div>
                        <div class="field">
                            <span>Kepada:</span> ${surat.kepada}
                        </div>
                        <div class="field">
                            <span>Untuk:</span> ${surat.untuk}
                        </div>
                        <div class="field">
                            <span>Hari/Tanggal:</span> ${new Date(surat.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </div>
                        <div class="field">
                            <span>Tempat:</span> ${surat.tempat}
                        </div>
                    </div>
                    <div class="signature">
                        <p>Cimahi, ${new Date(surat.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p>KETUA KOMISI PEMILIHAN UMUM</p>
                        <p>KOTA CIMAHI</p>
                        <br /><br /><br />
                        <p><strong>Anzhar Ishal Afryand</strong></p>
                    </div>
                    <div class="footer">
                        <p></p>
                    </div>
                </body>
            </html>
        `; 
        const newWindow = window.open('', '_blank', 'width=800,height=600');
    
        if (newWindow) {
            newWindow.document.open();
            newWindow.document.write(printContent);
            newWindow.document.close();
            newWindow.focus();
            newWindow.print();
            newWindow.close();
        } else {
            console.error('Failed to open new window for printing.');
        }
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
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-indigo-400">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-indigo-600"></div>
                </div>
            );
        }
    
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-200 to-indigo-400 py-8 px-4 sm:px-6 lg:px-8">
                <div className="mt-20 max-w-7xl mx-auto">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-8 text-center tracking-tight">
                        History Surat Tugas
                    </h2>
                    <div className="mb-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
    <div className="relative flex items-center w-full sm:w-auto">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-full border-2 border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
    </div>
    <div className="flex space-x-2">
        <button
            onClick={() => handleSort('tanggal')}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full hover:shadow-lg transition duration-300 flex items-center text-sm"
        >
            Date <FaSort className="ml-1" />
        </button>
        <button
            onClick={() => handleSort('nomor')}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full hover:shadow-lg transition duration-300 flex items-center text-sm"
        >
            Number <FaSort className="ml-1" />
        </button>
        <button
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg transition duration-300 flex items-center text-sm"
        >
            Total Surat: {totalSurat}
        </button>
        <button
            onClick={() => navigate('/createsuratketua')}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-600 text-white rounded-full hover:shadow-lg transition duration-300 flex items-center text-sm"
        >
            Buat Surat
        </button>
        {/* Total Surat Button */}
    </div>
</div>



                {sortedAndFilteredSuratList.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-xl p-8 text-center">
                        <p className="text-xl text-gray-600">No results found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {sortedAndFilteredSuratList.map((surat) => (
                            <div key={surat.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 flex flex-col">
                                <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 flex-none">
                                    <h3 className="text-lg font-semibold truncate">{surat.nomor}</h3>
                                </div>
                                <div className="p-4 flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800 flex flex-col space-y-2">
                                    <div className="flex items-center">
                                        <FaUser className="text-indigo-600 mr-2 text-sm" />
                                        <p className="truncate text-sm"><span className="font-semibold">Kepada:</span> {surat.kepada}</p>
                                    </div>
                                    <div className="flex items-start">
                                        <FaFileAlt className="text-indigo-600 mr-2 text-sm mt-1" />
                                        <p className="line-clamp-2 text-sm"><span className="font-semibold">Untuk:</span> {surat.untuk}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaCalendar className="text-indigo-600 mr-2 text-sm" />
                                        <p className="text-sm"><span className="font-semibold">Tanggal:</span> {new Date(surat.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="text-indigo-600 mr-2 text-sm" />
                                        <p className="truncate text-sm"><span className="font-semibold">Tempat:</span> {surat.tempat}</p>
                                    </div>
                                </div>
                                <div className="flex-none px-4 py-2 bg-gray-100 flex justify-end items-center space-x-2">
                                    <button
                                        onClick={() => handleEdit(surat)}
                                        className="text-green-500 hover:bg-green-100 p-2 rounded-full transition duration-300 text-sm flex items-center"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(surat.id)}
                                        className="text-red-500 hover:bg-red-100 p-2 rounded-full transition duration-300 text-sm flex items-center"
                                    >
                                        <FaTrash />
                                    </button>
                                    <button
                                        onClick={() => handlePrint(surat)}
                                        className="text-blue-500 hover:bg-blue-100 p-2 rounded-full transition duration-300 text-sm flex items-center"
                                    >
                                        <FaPrint />
                                    </button>
                                </div>
                            </div>
                        ))}

                    </div>
                )}

                {editingSurat && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Edit Surat</h3>
                                <button onClick={() => setEditingSurat(null)} className="text-gray-500 hover:text-gray-700">
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="nomor" className="block text-sm font-medium text-gray-700 mb-1">Nomor:</label>
                                    <input
                                        type="text"
                                        id="nomor"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        value={editingSurat.nomor}
                                        onChange={(e) => setEditingSurat({ ...editingSurat, nomor: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="kepada" className="block text-sm font-medium text-gray-700 mb-1">Kepada:</label>
                                    <input
                                        type="text"
                                        id="kepada"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        value={editingSurat.kepada}
                                        onChange={(e) => setEditingSurat({ ...editingSurat, kepada: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="untuk" className="block text-sm font-medium text-gray-700 mb-1">Untuk:</label>
                                    <textarea
                                        id="untuk"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        value={editingSurat.untuk}
                                        onChange={(e) => setEditingSurat({ ...editingSurat, untuk: e.target.value })}
                                        rows="2"
                                    />
                                </div>
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-1">Tanggal:</label>
                                        <input
                                            type="date"
                                            id="tanggal"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            value={editingSurat.tanggal}
                                            onChange={(e) => setEditingSurat({ ...editingSurat, tanggal: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <label htmlFor="tempat" className="block text-sm font-medium text-gray-700 mb-1">Tempat:</label>
                                        <input
                                            type="text"
                                            id="tempat"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            value={editingSurat.tempat}
                                            onChange={(e) => setEditingSurat({ ...editingSurat, tempat: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </form>
                            <div className="flex justify-end mt-6 space-x-3">
                                <button
                                    onClick={() => setEditingSurat(null)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition duration-300 text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 text-sm"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
