import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Createsuratketua = () => {
    const [formData, setFormData] = useState({
        pembuat: '',
        nomor: '',
        kepada: '', // Default value for dropdown
        untuk: '',
        tanggal: '',
        tempat: '',
        jam: '', // Field for time
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Predefined list of "Kepada" options
    const kepadaOptions = [
        "Yosi Sundansyah, S.T., S.Pd.i",
        "Djayadi Rachmat",
        "Emsidelva Okasti, S.ST.",
        "Charlyasi M. Siadari, S.Pd, M.Si",
        "Wina Winiarti, SH",
        "Vivid Firmawan, SH",
        "Yusti Rahayu, SH",
        "Sri Rahayu Sundayani, S.Sos",
        "Devi Yuni Astuti, S.IP",
        "Devina Napitupulu",
        "Iyus Rusyana",
        "Taufik Mulyana",
        "Risad Bachtiar, A.Md",
        "Aulia Rahman",
        "Rian Gustian",
        "Ani Suhaeni, S.Sos",
        "Winda Winiarni, SH",
        "Dhea Sulasti Putri",
        "Fidalina, SE",
        "Nurul Eka Suka, SE",
        "Indrayana, A.Md",
        "Gita Sonia, Amd.Kom",
        "Tria Kahaerunisa",
        "Rukimini",
        "Yayan Taryana",
        "Ahmad Sumadi",
        "Ahmad Solihin"
    ];

    // Function to get current time in "HH:MM" format
    const getCurrentTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // Set current time when component loads
    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            jam: getCurrentTime(),
        }));
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear error when user starts typing
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form
        const newErrors = {};
        if (!formData.pembuat) newErrors.pembuat = 'Pembuat Surat is required';
        if (!formData.nomor) newErrors.nomor = 'Nomor Surat is required';
        if (!formData.kepada) newErrors.kepada = 'Kepada is required';
        if (!formData.untuk) newErrors.untuk = 'Untuk is required';
        if (!formData.tanggal) newErrors.tanggal = 'Hari/Tanggal is required';
        if (!formData.tempat) newErrors.tempat = 'Tempat is required';
        if (!formData.jam) newErrors.jam = 'Jam is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Submitting data:', formData);

        axios.post('http://localhost:5000/createsuratketua', formData)
            .then((response) => {
                console.log(response.data);
                // Redirect to the history page
                navigate('/historysuratketua');
            })
            .catch((error) => {
                console.error('There was an error saving the surat!', error);
            });
    };

    const handleBackClick = () => {
        navigate('/surat-tugas-options');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">Buat Surat Tugas Ketua</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="pembuat" className="block text-sm font-medium text-gray-700">Pembuat Surat</label>
                            <input
                                type="text"
                                name="pembuat"
                                id="pembuat"
                                value={formData.pembuat}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.pembuat ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Nama Pembuat Surat"
                            />
                            {errors.pembuat && <p className="text-red-500 text-sm">{errors.pembuat}</p>}
                        </div>
                        <div>
                            <label htmlFor="nomor" className="block text-sm font-medium text-gray-700">Nomor Surat</label>
                            <input
                                type="text"
                                name="nomor"
                                id="nomor"
                                value={formData.nomor}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.nomor ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="176/PL.02.1-ST/3277/2024"
                            />
                            {errors.nomor && <p className="text-red-500 text-sm">{errors.nomor}</p>}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="kepada" className="block text-sm font-medium text-gray-700">Kepada</label>
                        <select
                            name="kepada"
                            id="kepada"
                            value={formData.kepada}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${errors.kepada ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                        >
                            <option value="">Pilih Nama</option>
                            {kepadaOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {errors.kepada && <p className="text-red-500 text-sm">{errors.kepada}</p>}
                    </div>
                    <div>
                        <label htmlFor="untuk" className="block text-sm font-medium text-gray-700">Untuk</label>
                        <textarea
                            name="untuk"
                            id="untuk"
                            rows="3"
                            value={formData.untuk}
                            onChange={handleChange}
                            className={`mt-1 block w-full border ${errors.untuk ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                            placeholder="Masukkan tujuan surat"
                        ></textarea>
                        {errors.untuk && <p className="text-red-500 text-sm">{errors.untuk}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="tanggal" className="block text-sm font-medium text-gray-700">Hari/Tanggal</label>
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
                        <div>
                            <label htmlFor="tempat" className="block text-sm font-medium text-gray-700">Tempat</label>
                            <input
                                type="text"
                                name="tempat"
                                id="tempat"
                                value={formData.tempat}
                                onChange={handleChange}
                                className={`mt-1 block w-full border ${errors.tempat ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                placeholder="Wilayah/Tujuan"
                            />
                            {errors.tempat && <p className="text-red-500 text-sm">{errors.tempat}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="jam" className="block text-sm font-medium text-gray-700">Waktu Pembuatan Surat</label>
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
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleBackClick}
                            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Kembali
                        </button>
                        <button
                            type="submit"
                            className="py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Createsuratketua;
