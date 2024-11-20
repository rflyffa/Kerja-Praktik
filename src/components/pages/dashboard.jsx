import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaEye } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Dashboard = ({ userRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-16 px-4 sm:px-6 lg:px-8">
      <div className="mt-20 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-helvetica-extrabold text-gray-900 mb-4 animate-fade-in">
            Selamat Datang di Dashboard
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Akses dan kelola semua dokumen serta fitur penting dari sini. Pilih dari opsi di bawah untuk memulai.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-2">
            <DashboardCard
              to="/surat-tugas-options"
              icon={<FaFileAlt className="w-12 h-12 text-blue-600" />}
              title="Surat Tugas"
              description="Buat dan kelola surat tugas dengan mudah"
              userRole={userRole}
              hideViewHistory={true}
            />
            <DashboardCard
              to="/createsuratvisum"
              icon={<FaEye className="w-12 h-12 text-green-600" />}
              title="Surat Visum"
              description="Proses surat visum dengan cepat dan efisien"
              userRole={userRole}
              hideViewHistory={false}
              restrictedForAdmin={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ to, icon, title, description, userRole, hideViewHistory, restrictedForAdmin }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (restrictedForAdmin && userRole === 'admin') {
      toast.info('Hanya bisa diakses oleh operator.', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      navigate(to);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 max-w-xs mx-auto animate-card-hover">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-full mb-4 mx-auto shadow-md">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center text-base">{description}</p>
      </div>
      <div className="px-6 py-4 bg-gray-50 text-center">
        <button
          onClick={handleClick}
          className="w-full text-white py-2 px-4 rounded-lg mb-3 transition duration-300 text-base font-semibold bg-gradient-to-r from-black via-gray-800 to-black hover:from-gray-800 hover:via-black hover:to-gray-800"
        >
          Masuk
        </button>
        {!hideViewHistory && (
          <Link 
            to="/historysuratvisum"  // Navigasi ke halaman historysuratvisum.jsx
            className="block text-indigo-600 hover:text-indigo-800 text-base font-small transition-colors duration-300"
          >
            View History
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
