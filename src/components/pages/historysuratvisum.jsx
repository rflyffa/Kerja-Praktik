import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUser, FaCalendar, FaEdit, FaTrash, FaPrint, FaClock, } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Logo from '../../assets/sekretaris.png';

const HistorySuratVisum = ({ userRole }) => {
    const [suratVisum, setSuratVisum] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSurat, setCurrentSurat] = useState(null);
    const [formData, setFormData] = useState({
        jam: '',
        nama: '',
        namaPelaksana: [''],
        hari: '',
        tanggal: '',
        waktu: '',
    });

    useEffect(() => {
        fetchSuratVisum();
    }, []);

    const fetchSuratVisum = () => {
        axios.get('http://localhost:5000/historysuratvisum')
            .then((response) => {
                setSuratVisum(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the surat visum data!', error);
            });
    };

    const handleEdit = (surat) => {
        if (userRole === 'admin') {
            toast.error('Admin tidak diperbolehkan mengupdate surat.');
            return;
        }
        setIsEditing(true);
        setCurrentSurat(surat);
        setFormData({
            nama_pelaksana: surat.nama_pelaksana,
            hari: surat.hari,
            tanggal: surat.tanggal
        });
    };

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/historysuratvisum/${currentSurat.id}`, formData);
            toast.success('Surat updated successfully.');
            fetchSuratVisum();
            setIsEditing(false); // Exit edit mode
        } catch (error) {
            console.error('There was an error updating the surat!', error);
            toast.error('Failed to update the surat.');
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
                                fetchSuratVisum();
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
                    
                    <p class="center-text">Form Bukti Kehadiran Pelaksanaan Perjalanan Dinas Jabatan Dalam Kota sampai dengan 8 (delapan) jam</p>
    
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

        // Optional: Close window after print
        newWindow.onafterprint = () => {
            newWindow.close();
        };
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="">
                <h2 className="text-3xl font-extrabold text-gray-900 mt-20 mb-6 text-center">History Surat Visum</h2>
                <div className="space-y-6">
                    {isEditing ? (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Pelaksana</label>
                                <input
                                    type="text"
                                    name="nama_pelaksana"
                                    value={formData.nama}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Hari</label>
                                <input
                                    type="text"
                                    name="hari"
                                    value={formData.hari}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                                <input
                                    type="date"
                                    name="tanggal"
                                    value={formData.tanggal}
                                    onChange={handleFormChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                                />
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-green-600 text-white rounded-md"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded-md"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {suratVisum.length > 0 ? (
                                    suratVisum.map((surat) => (
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
                                    ))
                                ) : (
                                    <p className="text-gray-500">No surat visum found.</p>
                                )}
                            </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistorySuratVisum;
