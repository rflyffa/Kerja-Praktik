import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Createsuratvisum = () => {
    const [formData, setFormData] = useState({
        jam: '',
        namaPelaksana: '',
        hari: '',
        tanggal: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (!formData.jam) newErrors.jam = 'Jam is required';
        if (!formData.namaPelaksana) newErrors.namaPelaksana = 'Nama Pelaksana is required';
        if (!formData.hari) newErrors.hari = 'Hari is required';
        if (!formData.tanggal) newErrors.tanggal = 'Tanggal is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post('http://localhost:5000/createsuratvisum', formData)
            .then((response) => {
                console.log(response.data);
                navigate('/historysuratvisum');
            })
            .catch((error) => {
                console.error('There was an error saving the data!', error);
            });
    };

    const handleBackClick = () => {
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Buat Surat Pelaksana</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="jam" className="block text-sm font-medium text-gray-700">Jam</label>
                            <input
                                type="time"
                                name="jam"
                                id="jam"
                                value={formData.jam}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.jam ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            />
                            {errors.jam && <p className="text-red-500 text-sm">{errors.jam}</p>}
                        </div>
                        <div>
                            <label htmlFor="namaPelaksana" className="block text-sm font-medium text-gray-700">Nama Pelaksana</label>
                            <input
                                type="text"
                                name="namaPelaksana"
                                id="namaPelaksana"
                                value={formData.namaPelaksana}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.namaPelaksana ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Masukkan Nama Pelaksana"
                            />
                            {errors.namaPelaksana && <p className="text-red-500 text-sm">{errors.namaPelaksana}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="hari" className="block text-sm font-medium text-gray-700">Hari</label>
                            <input
                                type="text"
                                name="hari"
                                id="hari"
                                value={formData.hari}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.hari ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Masukkan Hari"
                            />
                            {errors.hari && <p className="text-red-500 text-sm">{errors.hari}</p>}
                        </div>
                        <div>
                            <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal</label>
                            <input
                                type="date"
                                name="tanggal"
                                id="tanggal"
                                value={formData.tanggal}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.tanggal ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            />
                            {errors.tanggal && <p className="text-red-500 text-sm">{errors.tanggal}</p>}
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-6">
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            Back
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Createsuratvisum;
