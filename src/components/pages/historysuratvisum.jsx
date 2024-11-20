import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaSort, FaCalendar, FaEdit, FaTrash, FaPrint, FaClock, FaTimes, FaSearch, FaCalendarDay, FaComment } from 'react-icons/fa';
import Logo from '../../assets/sekretaris.png';
import { toast } from 'react-toastify';

const Historysuratvisum = ({ userRole }) => {
    const [suratList, setSuratList] = useState([]); // For displaying filtered or sorted data
    const [originalSuratList, setOriginalSuratList] = useState([]); // For storing the unfiltered data
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
            const response = await axios.get('http://localhost:5000/historysuratvisum');
            setSuratList(response.data);
            setOriginalSuratList(response.data);  // Store the full list as the original
            setTotalSurat(response.data.length);  // Update totalSurat with the length of the data
            setIsLoading(false);
        } catch (error) {
            console.error('There was an error fetching the surat data!', error);
            setIsLoading(false);
        }
    };

    const handleCreateSuratClick = () => {
        if (userRole === 'admin') {
            toast.info('Hanya bisa diakses oleh operator.', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } else {
            navigate('/createsuratvisum');
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
                                await axios.delete(`http://localhost:5000/historysuratvisum/${id}`);
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

        const namaPelaksanaArray = surat.nama_pelaksana.split(',').map(name => name.trim());

        setEditingSurat({
            ...surat,
            namaPelaksana: namaPelaksanaArray,
            tanggal: surat.tanggal // Gunakan langsung tanpa konversi
        });
    };


    const handleUpdate = async () => {
        if (userRole === 'admin') {
            toast.error('Admin tidak diperbolehkan mengupdate surat.');
            return;
        }

        try {
            // Format the data to match the expected structure
            const payload = {
                nama: editingSurat.nama,
                namaPelaksana: editingSurat.namaPelaksana.filter(name => name.trim() !== '').join(', '),
                jam: editingSurat.jam,
                hari: editingSurat.hari,
                tanggal: editingSurat.tanggal,
                estimasi: editingSurat.estimasi
            };

            console.log('Mengirim request PUT ke server dengan data:', payload);
            const response = await axios.put(`http://localhost:5000/historysuratvisum/${editingSurat.id}`, payload);
            console.log('Response dari server:', response);

            if (response.status === 200) {
                setEditingSurat(null);
                await fetchSuratList(); // Refresh the list after successful update
                toast.success('Surat berhasil diupdate.');
            } else {
                throw new Error('Server responded with non-200 status');
            }
        } catch (error) {
            console.error('Gagal mengupdate surat:', error.response ? error.response.data : error);
            toast.error('Gagal mengupdate surat. Periksa koneksi atau coba lagi nanti.');
        }
    };

    const handleAddPelaksana = () => {
        setEditingSurat({
            ...editingSurat,
            namaPelaksana: [...editingSurat.namaPelaksana, '']
        });
    };

    const handleRemovePelaksana = (index) => {
        const newNamaPelaksana = editingSurat.namaPelaksana.filter((_, i) => i !== index);
        setEditingSurat({
            ...editingSurat,
            namaPelaksana: newNamaPelaksana
        });
    };

    const handleSort = (field) => {
        const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
        setSortField(field);
        setSortDirection(direction);
    };

    const handlePrint = (surat) => {
        // Split the names and remove any extra spaces
        const names = surat.nama_pelaksana.split(',').map(name => name.trim());

        // Create table rows for each name with appropriate numbering
        const rows = names.map((name, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${name}</td>
                ${index === 0 ? `
                    <td rowspan="${names.length}">${surat.hari}</td>
                    <td rowspan="${names.length}">${new Date(surat.tanggal).toLocaleDateString()}</td>
                ` : ''}
                <td></td>
                <td></td>
                <td></td>
            </tr>
        `).join('');

        // HTML content for printing
        const printContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Print Surat Visum</title>
                <style>
                    @page {
                            size: A4; /* Mengatur ukuran kertas menjadi A4 */
                            margin: 20mm; /* Mengatur margin sesuai kebutuhan */
                         }
                    body {
                        font-family: 'Bookman Old Style', serif;
                        margin: 0;
                        padding: 0;
                        font-size: 12px;
                    }
                    .container {
                        width: 80%;
                        margin: 0 auto;
                        padding-top: 20px;
                        position: relative;
                        min-height: 700px;
                        box-sizing: border-box;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 10px;
                        font-size: 10px;
                    }
                    .header p {
                        margin: 3px 0;
                    }
                    .center-text {
                        text-align: center;
                        margin-bottom: 15px;
                        font-size: 11px;
                        font-weight: bold;
                    }
                    .table-container {
                        width: 100%;
                        border-collapse: collapse;
                        border-spacing: 0;
                        margin-bottom: 50px;
                        font-size: 10px;
                    }
                    table, th, td {
                        border: 1px solid black;
                    }
                    th, td {
                        padding: 5px;
                        text-align: center;
                    }
                    .column-numbers td {
                        width: 20px;
                        font-size: 8px;
                        padding: 2px;
                        line-height: 1;
                    }
                    .signature {
                        position: absolute;
                        bottom: -250px;
                        right: -20px;
                        text-align: center;
                        width: 250px;
                        font-size: 10px;
                    }
                    .signature p {
                        font-size: small;
                        margin: 5px 0;
                    }
                    .signature strong {
                        font-weight: bold;
                    }
                    .signature-img {
                        width: 100px;
                        height: auto;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>LAMPIRAN I.B</h2>
                        <p>PERATURAN DIREKTUR JENDERAL PERBENDAHARAAN</p>
                        <p>NOMOR PER-22/PB/2013 TENTANG KETENTUAN LEBIH</p>
                        <p>LANJUT PELAKSANAAN PERJALANAN DINAS DALAM</p>
                        <p>NEGERI BAGI PEJABAT NEGARA PEGAWAI NEGERI DAN PEGAWAI TIDAK TETAP</p>
                    </div>
                    
                    <p class="center-text">Form Bukti Kehadiran Pelaksanaan Perjalanan Dinas Jabatan Dalam Kota sampai dengan ${surat.estimasi} jam</p>
    
                    <table class="table-container">
                        <tr>
                            <th rowspan="2">NO</th>
                            <th rowspan="2">Pelaksana SPD</th>
                            <th rowspan="2">Hari</th>
                            <th rowspan="2">Tanggal</th>
                            <th colspan="3">Pejabat/Petugas yang mengesahkan</th>
                        </tr>
                        <tr>
                            <th>Nama</th>
                            <th>Jabatan</th>
                            <th>Tanda Tangan</th>
                        </tr>
                        <tr class="column-numbers">
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                        </tr>
                        ${rows}
                    </table>
    
                    <div class="signature">
                        <p>KETUA KOMISI PEMILIHAN UMUM</p>
                        <p>KOTA CIMAHI</p>
                        <br /><br /><br />
                        <img src="${Logo}" alt="Ketua Komisi Pemilihan Umum" class="signature-img" />
                        <p><strong>Anzhar Ishal Afryand</strong></p>
                    </div>
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


        newWindow.onafterprint = () => {
            newWindow.close();
        };
    };

    const handleSortByMonth = (month) => {
        if (month === "") {

            setSuratList(originalSuratList);
        } else {
            const sortedByMonth = originalSuratList.filter(surat => {
                const suratMonth = new Date(surat.tanggal).getMonth() + 1;
                return suratMonth.toString().padStart(2, '0') === month;
            });

            setSuratList(sortedByMonth);
        }
    };


    const sortedAndFilteredSuratList = suratList
        .filter(surat =>
            surat.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.jam.toLowerCase().includes(searchTerm.toLowerCase()) ||
            surat.tanggal.toLowerCase().includes(searchTerm.toLowerCase())
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
                    History Surat Visum
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
                                className="pl-10 pr-8 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg transition duration-300 text-sm appearance-none cursor-pointer"
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
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg transition duration-300 flex items-center text-sm"
                        >
                            Date <FaSort className="ml-1" />
                        </button>
                        <button
                            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:shadow-lg transition duration-300 flex items-center text-sm"
                        >
                            Total Surat: {totalSurat}
                        </button>
                        <button
                            onClick={handleCreateSuratClick}
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
                                        <p className="truncate text-sm"><span className="font-semibold">Pembuat:</span> {surat.nama}</p>
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
                                        <FaCalendarDay className="text-indigo-600 mr-2 text-sm flex-shrink-0" />
                                        <p className="truncate text-sm"><span className="font-semibold">Hari:</span> {surat.hari}</p>
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
                        <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Edit Surat Visum</h3>
                                <button onClick={() => setEditingSurat(null)} className="text-gray-500 hover:text-gray-700">
                                    <FaTimes className="text-xl" />
                                </button>
                            </div>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="nama" className="block text-sm font-medium text-gray-700 mb-1">Nama Pembuat:</label>
                                    <select
                                        id="nama"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        value={editingSurat.nama}
                                        onChange={(e) => setEditingSurat({ ...editingSurat, nama: e.target.value })}
                                    >
                                        <option value="" disabled>Pilih Nama Pembuat</option>
                                        {[
                                            "Fidanila SE",
                                            "Nurul Eka Sukma SE",
                                            "Indrayana A.Md",
                                            "Gita Sonia Amd.Kom"
                                        ].map((name, index) => (
                                            <option key={index} value={name}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="namaPelaksana" className="block text-sm font-medium text-gray-700 mb-1">Nama Pelaksana:</label>
                                    {editingSurat.namaPelaksana.map((pelaksana, index) => (
                                        <div key={index} className="flex items-center mt-2">
                                            <span className="mr-2">{index + 1}.</span>
                                            <select
                                                value={pelaksana}
                                                onChange={(e) => {
                                                    const newNamaPelaksana = [...editingSurat.namaPelaksana];
                                                    newNamaPelaksana[index] = e.target.value;
                                                    setEditingSurat({ ...editingSurat, namaPelaksana: newNamaPelaksana });
                                                }}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            >
                                                {/* Opsi default untuk menampilkan nama yang tidak ada di daftar */}
                                                <option value={pelaksana} hidden>{pelaksana}</option>
                                                <option value="">Pilih Nama Pelaksana</option>
                                                {[
                                                    "Yosi Sundansyah S.T. S.Pd.i",
                                                    "Djayadi Rachmat",
                                                    "Emsidelva Okasti S.ST.",
                                                    "Charlyasi M. Siadari S.Pd M.Si",
                                                    "Wina Winiarti SH",
                                                    "Vivid Firmawan SH",
                                                    "Yusti Rahayu SH",
                                                    "Sri Rahayu Sundayani S.Sos",
                                                    "Devi Yuni Astuti S.IP",
                                                    "Devina Napitupulu",
                                                    "Iyus Rusyana",
                                                    "Taufik Mulyana",
                                                    "Risad Bachtiar A.Md",
                                                    "Aulia Rahman",
                                                    "Rian Gustian",
                                                    "Ani Suhaeni S.Sos",
                                                    "Winda Winiarni SH",
                                                    "Dhea Sulasti Putri",
                                                    "Fidalina SE",
                                                    "Nurul Eka Suka SE",
                                                    "Indrayana A.Md",
                                                    "Gita Sonia Amd.Kom",
                                                    "Tria Kahaerunisa",
                                                    "Rukimini",
                                                    "Yayan Taryana",
                                                    "Ahmad Sumadi",
                                                    "Ahmad Solihin",
                                                ].map((option, i) => (
                                                    <option key={i} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                            {editingSurat.namaPelaksana.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemovePelaksana(index)}
                                                    className="ml-2 text-red-600 hover:text-red-800"
                                                >
                                                    X
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={handleAddPelaksana}
                                        className="mt-2 text-blue-600 hover:text-blue-800"
                                    >
                                        + Tambah Pelaksana
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="jam" className="block text-sm font-medium text-gray-700 mb-1">Jam:</label>
                                        <input
                                            type="time"
                                            id="jam"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            value={editingSurat.jam}
                                            onChange={(e) => setEditingSurat({ ...editingSurat, jam: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="estimasi" className="block text-sm font-medium text-gray-700 mb-1">Waktu:</label>
                                        <select
                                            id="estimasi"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            value={editingSurat.estimasi}
                                            onChange={(e) => setEditingSurat({ ...editingSurat, estimasi: e.target.value })}
                                        >
                                            <option value="">Estimasi</option>
                                            {[...Array(24).keys()].map(i => (
                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="hari" className="block text-sm font-medium text-gray-700 mb-1">Hari:</label>
                                        <select
                                            id="hari"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            value={editingSurat.hari}
                                            onChange={(e) => setEditingSurat({ ...editingSurat, hari: e.target.value })}
                                        >
                                            <option value="">Pilih Hari</option>
                                            <option value="Senin">Senin</option>
                                            <option value="Selasa">Selasa</option>
                                            <option value="Rabu">Rabu</option>
                                            <option value="Kamis">Kamis</option>
                                            <option value="Jumat">Jumat</option>
                                            <option value="Sabtu">Sabtu</option>
                                            <option value="Minggu">Minggu</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700 mb-1">Tanggal:</label>
                                        <input
                                            type="date"
                                            id="tanggal"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            value={editingSurat.tanggal || ''} // Pastikan ada default nilai kosong jika undefined
                                            onChange={(e) => setEditingSurat({ ...editingSurat, tanggal: e.target.value })}
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

export default Historysuratvisum;