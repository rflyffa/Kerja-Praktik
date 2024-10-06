import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSort, FaCalendar, FaMapMarkerAlt, FaEdit, FaTrash, FaPrint, FaClock, FaTimes, FaSearch } from 'react-icons/fa';
import Logo from '../../assets/sekretaris.png';
import { toast } from 'react-toastify';

const Historysuratsekre = ({ userRole }) => {
    const [suratList, setSuratList] = useState([]);
    const [originalSuratList, setOriginalSuratList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('tanggal');
    const [sortDirection, setSortDirection] = useState('desc');
    const [editingSurat, setEditingSurat] = useState(null);
    const [totalSurat, setTotalSurat] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchSuratList();
    }, []);

    const fetchSuratList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/historysuratsekre');
            setSuratList(response.data);
            setOriginalSuratList(response.data);  // Store the full list as the original
            setTotalSurat(response.data.length);  // Update totalSurat with the length of the data
            setIsLoading(false);
        } catch (error) {
            console.error('There was an error fetching the surat data!', error);
            setIsLoading(false);
        }
    };

    const handleDelete = (id) => {
        if (userRole === 'admin') {
            toast.error('Admin tidak dapat menghapus surat.', {
                autoClose: 1000
            });
            return;
        }

        const toastId = toast.info(
            <div className="flex flex-col items-center justify-center text-center">
                <p className="text-lg font-medium text-gray-900">Are you sure you want to delete this letter?</p>
                <div className="flex justify-center mt-3">
                    <button
                        onClick={async () => {
                            try {
                                await axios.delete(`http://localhost:5000/historysuratsekre/${id}`);
                                fetchSuratList();
                                toast.success('Letter deleted successfully.', {
                                    autoClose: 1000
                                });
                                toast.dismiss(toastId);
                            } catch (error) {
                                console.error('There was an error deleting the surat!', error);
                                toast.error('Failed to delete the surat.');
                                toast.dismiss(toastId);
                            }
                        }}
                        className="px-4 py-2 mr-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 focus:outline-none"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => toast.dismiss(toastId)}
                        className="px-4 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-300 focus:outline-none"
                    >
                        Cancel
                    </button>
                </div>
            </div>,
            {
                position: 'top-center',
                autoClose: false,
                closeOnClick: false,
                draggable: false,
            }
        );
    };

    const handleEdit = (surat) => {
        if (userRole === 'admin') {
            toast.error('Admin tidak diperbolehkan mengedit surat.', {
                autoClose: 1000
            });
            return;
        }
        setEditingSurat(surat);
    };

    const handleUpdate = async () => {
        if (userRole === 'admin') {
            toast.error('Admin tidak diperbolehkan mengupdate surat.');
            return;
        }

        try {
            await axios.put(`http://localhost:5000/historysuratsekre/${editingSurat.id}`, editingSurat);
            setEditingSurat(null);
            fetchSuratList();
            toast.success('Surat berhasil diupdate.');
        } catch (error) {
            console.error('There was an error updating the surat!', error);
            toast.error('Gagal mengupdate surat.');
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
                        @page {
                            size: A4; /* Mengatur ukuran kertas menjadi A4 */
                            margin: 20mm; /* Mengatur margin sesuai kebutuhan */
                        }
    
                        @font-face {
                            font-family: 'Bookman Old Style';
                            src: local('Bookman Old Style'), local('Bookman');
                        }
    
                        body { 
                            font-family: 'Bookman Old Style', serif; 
                            padding: 40px; 
                            font-size: 14px; /* Ukuran font default yang lebih kecil */
                        }
    
                        .header { text-align: center; margin-bottom: 40px; }
                        .header h2 { 
                            font-size: 20px; /* Ukuran font judul yang lebih kecil */
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
                            font-size: 16px; /* Ukuran font nomor yang lebih kecil */
                            margin: 5px 0; 
                        }
    
                        .content { margin-top: 20px; }
    
                        .content p { 
                            margin: 10px 0; 
                            font-size: 14px; /* Ukuran font isi konten yang lebih kecil */
                        }
    
                        .content .field { 
                            margin-bottom: 20px; 
                            display: flex; /* Align children horizontally */
                            align-items: flex-start; /* Align items to the top */
                        }
    
                        .content .field span { 
                            width: 150px; 
                            white-space: nowrap; /* Prevent label from wrapping */
                        }
    
                        .content .field ol { 
                            margin: 0;
                            padding: 0; 
                            list-style-type: lower-alpha; 
                            margin-left: 10px; /* Adjust left margin to align with text */
                        }
    
                        .content .field ol li {  
                            margin-bottom: 10px; 
                        }
    
                        .content .field .text { 
                            flex: 1; /* Take up the remaining space */
                            margin-left: 10px; /* Add space between label and content */
                            word-wrap: break-word; /* Break long words to prevent overflow */
                            max-width: calc(100% - 160px); /* Limit width based on label width */
                            overflow-wrap: break-word; /* Ensure long text wraps within the container */
                        }
    
                        .footer { 
                            margin-top: 50px; 
                            text-align: center; 
                            font-size: 12px; /* Ukuran font footer yang lebih kecil */
                        }
    
                        .footer p { 
                            margin: 5px 0; 
                        }
    
                        .signature {
                            position: absolute; /* Mengatur posisi elemen menjadi absolut */
                            bottom: 0; /* Menempatkan elemen di bagian paling bawah halaman */
                            right: 0; /* Mengatur jarak dari sisi kanan */
                            text-align: right;
                            margin-right: 40px; /* Jarak dari sisi kanan halaman */
                        }
    
                        .signature p { 
                            margin: 5px 0;
                            text-align: center;
                        }
    
                        .signature-img {
                            display: block; /* Membuat gambar menjadi elemen blok */
                            margin: 0 auto; /* Memusatkan gambar secara horizontal */
                            margin-left: 85px;
                            width: 110px;
                            height: auto;
                        }

    
                        .title { 
                            text-align: center; 
                            font-weight: bold; 
                            margin-top: 30px; 
                        }
    
                        .additional-info { 
                            margin-top: 20px; 
                            font-size: 12px; /* Ukuran font untuk informasi tambahan yang lebih kecil */
                            text-align: justify; /* Ensure text aligns well */
                        }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <h2>SURAT TUGAS</h2>
                        <div class="underline-container">
                            <div class="underline"></div>
                        </div>
                        <h3>Nomor: ${surat.nomor}</h3>
                    </div>
                    <div class="content">
                        <div class="field">
                            <span>Menimbang:</span>
                            <div class="text">
                                <ol>
                                    <li>Undang - Undang Nomor 7 Tahun 2017 tentang Pemilihan Umum (lembaran Negara Republik Indonesia Tahun 2017 Nomor 182, Tambahan Lembaran Negara Republik Indonesia Nomor 6109);</li>
                                    <li>Peraturan Komisi Pemilihan Umum Nomor 3 Tahun 2023 tentang Tugas, fungsi, Susunan Organisasi, dan Tata Kerja Sekretariat Jenderal Komisi Pemilihan Umum, Sekretariat Komisi Pemilihan Umum Provinsi, dan Sekretariat Komisi Pemilihan Umum Kabupaten/Kota</li>
                                    <li>Biaya Perjalanan Dinas ditanggung oleh APBN.</li>
                                </ol>
                            </div>
                        </div>
                        <div class="field">
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
                            <span>Kepada:</span>
                            <div class="text">
                                ${surat.kepada}
                            </div>
                        </div>
                        <div class="field">
                            <span>Untuk:</span>
                            <div class="text">
                                ${surat.untuk}
                            </div>
                        </div>
                        <div class="field">
                            <span>Hari/Tanggal:</span>
                            <div class="text">
                                ${new Date(surat.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                        <div class="field">
                            <span>Tempat:</span>
                            <div class="text">
                                ${surat.tempat}
                            </div>
                        </div>
                        <div class="additional-info">
                            <p>Demikian Surat Tugas ini dibuat untuk Dapat dilaksanakan dengan penuh tangung jawab dan melaporkannya.</p>
                        </div>
                    </div>
                    <div class="signature">
                        <p>Cimahi, ${new Date(surat.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        <p><strong>SEKRETARIS KOMISI PEMILIHAN UMUM</strong></p>
                        <p><strong>KOTA CIMAHI</strong></p>
                        <img src="${Logo}" alt="Ketua Komisi Pemilihan Umum" class="signature-img" />
                        <p><strong>CHARLYASI M. SIADARI</strong></p>
                    </div>
                    <div class="footer">
                        <p></p>
                    </div>
                </body>
            </html>
        `;

        const newWindow = window.open('', '_blank');
        newWindow.document.open();
        newWindow.document.write(printContent);
        newWindow.document.close();

        newWindow.focus();
        newWindow.print();

        // Optional: Close window after print
        newWindow.onafterprint = () => {
            newWindow.close();
        };
    };

    const handleSortByMonth = (month) => {
        if (month === "") {
            // Reset to original list if no month is selected
            setSuratList(originalSuratList);
        } else {
            const sortedByMonth = originalSuratList.filter(surat => {
                const suratMonth = new Date(surat.tanggal).getMonth() + 1; // Get month from 'tanggal' (0-based)
                return suratMonth.toString().padStart(2, '0') === month;
            });

            setSuratList(sortedByMonth);  // Update displayed suratList with filtered data
        }
    };

    const sortedAndFilteredSuratList = suratList
        .filter(surat =>
            surat.nomor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.pembuat.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.tempat.toLowerCase().includes(searchTerm.toLowerCase())
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
                    History Surat Sekretaris
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
                        <div className="relative flex items-center">
                            <FaCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
                            <select
                                className="pl-10 pr-8 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-full hover:shadow-lg transition duration-300 text-sm appearance-none cursor-pointer"
                                onChange={(e) => handleSortByMonth(e.target.value)}
                            >
                                <option value=""> Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <FaSort className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white" />
                        </div>
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
                            onClick={() => navigate('/surat-tugas-options')}
                            className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full hover:shadow-lg transition duration-300 flex items-center text-sm"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                className="w-4 h-4 mr-2"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                            Buat Surat
                        </button>
                        {/* Total Surat Button */}
                    </div>
                </div>
                <p className="text-gray-600 mt-5 mb-5 text-sm italic">
                    Catatan: Pencarian dan sortir dapat membantu Anda mengelola dokumen dengan lebih efisien. Jika Anda perlu membuat surat baru, klik tombol "Buat Surat" di atas.
                </p>
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
                                        <FaUser className="text-indigo-600 mr-2 text-sm flex-shrink-0" />
                                        <p className="truncate text-sm"><span className="font-semibold">Pembuat:</span> {surat.pembuat}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaClock className="text-indigo-600 mr-2 text-sm flex-shrink-0" />
                                        <p className="text-sm"><span className="font-semibold">Waktu:</span> {surat.jam}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaCalendar className="text-indigo-600 mr-2 text-sm flex-shrink-0" />
                                        <p className="text-sm"><span className="font-semibold">Tanggal:</span> {new Date(surat.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                                    </div>
                                    <div className="flex items-center">
                                        <FaMapMarkerAlt className="text-indigo-600 mr-2 text-sm flex-shrink-0" />
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

export default Historysuratsekre;
