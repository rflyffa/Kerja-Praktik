import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaEye, FaClipboard } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8 mt-24">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
                    Selamat Datang di Dashboard
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <DashboardCard
                        to="/surat-tugas-options"
                        icon={<FaFileAlt className="w-12 h-12 text-blue-600" />}
                        title="Surat Tugas"
                        description="Buat dan kelola surat tugas dengan mudah"
                    />
                    <DashboardCard
                        to="/surat-tugas-options"
                        icon={<FaEye className="w-12 h-12 text-green-600" />}
                        title="Surat Visum"
                        description="Proses surat visum dengan cepat dan efisien"
                    />
                    <DashboardCard
                        to="/create-letter-3"
                        icon={<FaClipboard className="w-12 h-12 text-purple-600" />}
                        title="Log Surat"
                        description="Lihat dan kelola log surat yang telah dibuat"
                    />
                </div>
            </div>
        </div>
    );
};

const DashboardCard = ({ to, icon, title, description }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-full mb-4 mx-auto">
                    {icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{title}</h3>
                <p className="text-gray-600 text-center">{description}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50">
                <button 
                    onClick={handleClick}
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 mb-2"
                >
                    Masuk
                </button>
                <Link 
                    to="/history" 
                    className="block text-center text-indigo-600 hover:underline text-sm"
                >
                    View
                </Link>
            </div>
        </div>
    );
};

export default Dashboard;