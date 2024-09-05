import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaPrint } from 'react-icons/fa';
import { toast } from 'react-toastify';

const HistorySuratVisum = () => {
    const [suratVisum, setSuratVisum] = useState([]);
    const [isEditing, setIsEditing] = useState(false); // New state for tracking edit mode
    const [currentSurat, setCurrentSurat] = useState(null); // State for the surat being edited
    const [formData, setFormData] = useState({ // State for the form data
        nama_pelaksana: '',
        hari: '',
        tanggal: ''
    });

    // Fetch surat visum data when the component mounts
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

    const handleDelete = (id) => {
        const toastId = toast.info(
            <div className="flex flex-col items-center justify-center text-center">
                <p className="text-lg font-medium text-gray-900">Are you sure you want to delete this letter?</p>
                <div className="flex justify-center mt-3">
                    <button
                        onClick={async () => {
                            try {
                                await axios.delete(`http://localhost:5000/historysuratvisum/${id}`);
                                fetchSuratVisum();
                                toast.success('Letter deleted successfully.');
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
        const printContent = `
            <html>
            <head>
                <title>Print Surat Visum</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h2 { text-align: center; margin-bottom: 20px; }
                    p { margin: 10px 0; }
                    .content { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; }
                    .content p { font-size: 14px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    table, th, td { border: 1px solid black; }
                    th, td { padding: 8px; text-align: left; vertical-align: top; }
                    .sign-section { margin-top: 40px; display: flex; justify-content: space-between; }
                    .sign-section .sign-box { text-align: center; }
                    .sign-section .sign-box img { height: 50px; margin-top: 10px; }
                    .sign-section .sign-box p { margin: 0; }
                </style>
            </head>
            <body>
                <div class="content">
                    <h2>Form Bukti Kehadiran Pelaksanaan Perjalanan Dinas Jabatan<br>Dalam Kota sampai dengan 8 (delapan) jam</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Pelaksana SPD</th>
                                <th>Hari</th>
                                <th>Tanggal</th>
                                <th>Pejabat/Petugas yang Mengesahkan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>${surat.nama_pelaksana.split(',').join('<br>')}</td>
                                <td>${surat.hari}</td>
                                <td>${new Date(surat.tanggal).toLocaleDateString()}</td>
                                <td>
                                    <div class="sign-section">
                                        <div class="sign-box">
                                            <p>Nama:</p>
                                            <p>Nama Pejabat</p>
                                        </div>
                                        <div class="sign-box">
                                            <p>Jabatan:</p>
                                            <p>Jabatan Pejabat</p>
                                        </div>
                                        <div class="sign-box">
                                            <p>Tanda Tangan:</p>
                                            <img src="path/to/tanda_tangan.png" alt="Tanda Tangan" />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
    
    const handleEdit = (surat) => {
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

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">History Surat Visum</h2>
                <div className="space-y-6">
                    {isEditing ? (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Nama Pelaksana</label>
                                <input
                                    type="text"
                                    name="nama_pelaksana"
                                    value={formData.nama_pelaksana}
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
                        <ul>
                            {suratVisum.length > 0 ? (
                                suratVisum.map((surat) => (
                                    <li key={surat.id} className="p-4 mb-2 bg-gray-100 rounded-md">
                                        <p><strong>Nama Pelaksana:</strong> {surat.nama_pelaksana}</p>
                                        <p><strong>Hari:</strong> {surat.hari}</p>
                                        <p><strong>Tanggal:</strong> {new Date(surat.tanggal).toLocaleDateString()}</p>
                                        <div className="flex space-x-4 mt-2">
                                            <button
                                                onClick={() => handleEdit(surat)}
                                                className="px-4 py-2 bg-yellow-500 text-white rounded-md"
                                            >
                                                <FaEdit className="inline-block mr-1" /> Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(surat.id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-md"
                                            >
                                                <FaTrash className="inline-block mr-1" /> Delete
                                            </button>
                                            <button
                                                onClick={() => handlePrint(surat)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                                            >
                                                <FaPrint className="inline-block mr-1" /> Print
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No surat visum found.</p>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistorySuratVisum;
