import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Createsuratvisum = () => {
    const [formData, setFormData] = useState({
        jam: '',
        namaPelaksana: [''],  // Array to store multiple names
        hari: '',
        tanggal: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e, index) => {
        if (e.target.name === 'namaPelaksana') {
            const newNamaPelaksana = [...formData.namaPelaksana];
            newNamaPelaksana[index] = e.target.value;
            setFormData({ ...formData, namaPelaksana: newNamaPelaksana });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleAddPelaksana = () => {
        setFormData({ ...formData, namaPelaksana: [...formData.namaPelaksana, ''] });
    };

    const handleRemovePelaksana = (index) => {
        const newNamaPelaksana = formData.namaPelaksana.filter((_, i) => i !== index);
        setFormData({ ...formData, namaPelaksana: newNamaPelaksana });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (!formData.jam) newErrors.jam = 'Jam is required';
        if (formData.namaPelaksana.some((name) => !name)) newErrors.namaPelaksana = 'All Pelaksana names are required';
        if (!formData.hari) newErrors.hari = 'Hari is required';
        if (!formData.tanggal) newErrors.tanggal = 'Tanggal is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // Prepare data to send
            const payload = {
                jam: formData.jam,
                namaPelaksana: formData.namaPelaksana.join(', '), // Join array of names into a single string
                hari: formData.hari,
                tanggal: formData.tanggal
            };

            await axios.post('http://localhost:5000/createsuratvisum', payload);
            navigate('/historysuratvisum');
        } catch (error) {
            console.error('There was an error saving the data!', error);
        }
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
                            {formData.namaPelaksana.map((pelaksana, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <span className="mr-2">{index + 1}.</span>
                                    <input
                                        type="text"
                                        name="namaPelaksana"
                                        value={pelaksana}
                                        onChange={(e) => handleChange(e, index)}
                                        className={`block w-full border ${errors.namaPelaksana ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                        placeholder="Masukkan Nama Pelaksana"
                                    />
                                    {formData.namaPelaksana.length > 1 && (
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
                            {errors.namaPelaksana && <p className="text-red-500 text-sm">{errors.namaPelaksana}</p>}
                            <button
                                type="button"
                                onClick={handleAddPelaksana}
                                className="mt-2 text-blue-600 hover:text-blue-800"
                            >
                                + Tambah Pelaksana
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="hari" className="block text-sm font-medium text-gray-700">Hari</label>
                            <select
                                name="hari"
                                id="hari"
                                value={formData.hari}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.hari ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
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
