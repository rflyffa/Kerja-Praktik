import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Createsurat = () => {
    const [formData, setFormData] = useState({
        nomor: '',
        kepada: '',
        untuk: '',
        tanggal: '',
        tempat: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simpan data ke database atau state global
        console.log(formData);
        // Redirect ke halaman daftar surat tugas
        navigate('/daftar-surat-tugas');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 max-w-3xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Buat Surat Tugas</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="nomor" className="block text-sm font-medium text-gray-700">Nomor Surat</label>
                        <input
                            type="text"
                            name="nomor"
                            id="nomor"
                            value={formData.nomor}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="kepada" className="block text-sm font-medium text-gray-700">Kepada</label>
                        <input
                            type="text"
                            name="kepada"
                            id="kepada"
                            value={formData.kepada}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="untuk" className="block text-sm font-medium text-gray-700">Untuk</label>
                        <textarea
                            name="untuk"
                            id="untuk"
                            rows="3"
                            value={formData.untuk}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Tanggal</label>
                        <input
                            type="date"
                            name="tanggal"
                            id="tanggal"
                            value={formData.tanggal}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="tempat" className="block text-sm font-medium text-gray-700">Tempat</label>
                        <input
                            type="text"
                            name="tempat"
                            id="tempat"
                            value={formData.tempat}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Simpan
                        </button>
                        <button
                            type="button"
                            onClick={() => window.print()}
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Cetak
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Createsurat;