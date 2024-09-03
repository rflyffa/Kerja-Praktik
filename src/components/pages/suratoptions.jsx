import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileSignature, FaUserTie } from 'react-icons/fa';

const Suratoptions = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-16 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 mb-10 max-w-4xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    Pilihan Surat Tugas
                </h2>
                <p className="text-xl text-center text-gray-700 mb-12">
                    Silakan pilih jenis surat tugas yang ingin Anda buat
                </p>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <SuratTugasCard
                        to="/createsuratketua"
                        icon={<FaUserTie className="w-16 h-16 text-indigo-600" />}
                        title="Surat Tugas Ketua KPU"
                        description="Buat surat tugas resmi untuk Ketua KPU dengan template yang telah disediakan."
                    />
                    <SuratTugasCard
                        to="/createsuratsekre"
                        icon={<FaFileSignature className="w-16 h-16 text-green-600" />}
                        title="Surat Tugas Sekretaris"
                        description="Generasi surat tugas untuk Sekretaris dengan cepat dan mudah menggunakan form yang tersedia."
                    />
                </div>
            </div>
        </div>
    );
};

const SuratTugasCard = ({ to, icon, title, description }) => {
    return (
        <Link 
            to={to} 
            className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col"
        >
            <div className="p-8 flex-grow">
                <div className="flex justify-center mb-6">
                    {icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">{title}</h3>
                <p className="text-gray-600 text-center">{description}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50">
                <button className="w-full bg-gradient-to-r from-black via-gray-800 to-black text-white py-3 px-4 rounded-md hover:from-black hover:via-gray-700 hover:to-black transition duration-300 font-semibold text-lg">
                    Buat Surat
                </button>
            </div>
        </Link>
    );
};

export default Suratoptions;