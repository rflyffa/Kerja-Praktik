import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFileSignature, FaUserTie } from 'react-icons/fa';
import { toast } from 'react-toastify'; // Import toast for alerts

const Suratoptions = ({ userRole }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-16 px-4 sm:px-6 lg:px-8">
            <div className="mt-20 mb-10 max-w-4xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    Pilihan Surat Tugas Dinas
                </h2>
                <p className="text-xl text-center text-gray-700 mb-12">
                    Silakan pilih jenis surat tugas yang ingin Anda buat
                </p>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                    <SuratTugasCard
                        to="/createsuratketua"
                        icon={<FaUserTie className="w-16 h-16 text-indigo-600" />}
                        title="Surat Tugas Ketua KPU"
                        description="Buat surat tugas resmi yang di tanda tangani oleh Ketua KPU dengan template yang telah disediakan."
                        historyLink="/historysuratketua" // Update link
                        userRole={userRole} // Pass userRole here
                    />
                    <SuratTugasCard
                        to="/createsuratsekre"
                        icon={<FaFileSignature className="w-16 h-16 text-green-600" />}
                        title="Surat Tugas Sekretaris"
                        description="Buat surat tugas yang di tanda tangani oleh Sekretaris dengan cepat dan mudah menggunakan form yang tersedia."
                        historyLink="/historysuratsekre" // Update link
                        userRole={userRole} // Pass userRole here
                    />
                </div>
            </div>
        </div>
    );
};

const SuratTugasCard = ({ to, icon, title, description, historyLink, userRole }) => {
    const navigate = useNavigate();

    const handleClick = () => {
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
            navigate(to); // Navigate to the link
        }
    };

    return (
        <div className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
            <div className="p-8 flex-grow">
                <div className="flex justify-center mb-6">
                    {icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 text-center mb-4">{title}</h3>
                <p className="text-gray-600 text-center">{description}</p>
            </div>
            <div className="px-6 py-4 bg-gray-50">
                <button
                    onClick={handleClick}
                    className="w-full bg-gradient-to-r from-black via-gray-800 to-black text-white py-3 px-4 rounded-md hover:from-black hover:via-gray-700 hover:to-black transition duration-300 font-semibold text-lg mb-2 text-center"
                >
                    Buat Surat
                </button>
                <div className="flex justify-center">
                    <Link 
                        to={historyLink}
                        className="text-blue-500 hover:text-blue-700 text-lg font-semibold"
                    >
                        View History
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Suratoptions;
