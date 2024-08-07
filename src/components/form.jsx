import React, { useState } from 'react';
import { FaFileAlt, FaUser, FaBullseye, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    nomor: '',
    nama: '',
    tujuan: '',
    tanggalMulai: '',
    tanggalSelesai: '',
    tempat: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-10 bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <h2 className="text-3xl font-bold">Form Surat Tugas</h2>
        <p className="mt-2">Silakan isi detail surat tugas di bawah ini</p>
      </div>
      <div className="p-8 space-y-6">
        {/* Nomor Surat */}
        <div className="flex items-center space-x-4">
          <FaFileAlt className="text-gray-400 text-xl" />
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Surat:</label>
            <input
              type="text"
              name="nomor"
              value={formData.nomor}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              placeholder="Masukkan nomor surat"
            />
          </div>
        </div>
        {/* Nama */}
        <div className="flex items-center space-x-4">
          <FaUser className="text-gray-400 text-xl" />
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama:</label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              placeholder="Masukkan nama"
            />
          </div>
        </div>
        {/* Tujuan Tugas */}
        <div className="flex items-start space-x-4">
          <FaBullseye className="text-gray-400 text-xl mt-3" />
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tujuan Tugas:</label>
            <textarea
              name="tujuan"
              value={formData.tujuan}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              rows="3"
              placeholder="Deskripsikan tujuan tugas"
            ></textarea>
          </div>
        </div>
        {/* Tanggal Mulai dan Selesai */}
        <div className="flex space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <FaCalendarAlt className="text-gray-400 text-xl" />
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Mulai:</label>
              <input
                type="date"
                name="tanggalMulai"
                value={formData.tanggalMulai}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>
          <div className="flex items-center space-x-4 flex-1">
            <FaCalendarAlt className="text-gray-400 text-xl" />
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Selesai:</label>
              <input
                type="date"
                name="tanggalSelesai"
                value={formData.tanggalSelesai}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                required
              />
            </div>
          </div>
        </div>
        {/* Tempat */}
        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-gray-400 text-xl" />
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tempat:</label>
            <input
              type="text"
              name="tempat"
              value={formData.tempat}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
              placeholder="Masukkan tempat tugas"
            />
          </div>
        </div>
      </div>
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
        <button 
          type="submit" 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-md hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          Generate Surat Tugas
        </button>
      </div>
    </form>
  );
};

export default Form;
