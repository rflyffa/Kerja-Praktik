import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFileAlt, FaEye } from 'react-icons/fa';

const Dashboard = ({ userRole }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Selamat Datang di Dashboard
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
            <DashboardCard
              to="/surat-tugas-options"
              icon={<FaFileAlt className="w-12 h-12 text-blue-600" />}
              title="Surat Tugas"
              description="Buat dan kelola surat tugas dengan mudah"
              userRole={userRole} // Pass the userRole to DashboardCard
            />
            <DashboardCard
              to=""
              icon={<FaEye className="w-12 h-12 text-green-600" />}
              title="Surat Visum"
              description="Proses surat visum dengan cepat dan efisien"
              userRole={userRole} // Pass the userRole to DashboardCard
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ to, icon, title, description, userRole }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (userRole === 'operator') {
      navigate(to);
    }
  };

  return (
    <div className="bg-white overflow-hidden shadow-xl rounded-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 max-w-sm mx-auto">
      <div className="p-6">
        <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-100 to-indigo-200 rounded-full mb-4 mx-auto">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">{title}</h3>
        <p className="text-gray-600 text-center">{description}</p>
      </div>
      <div className="px-6 py-4 bg-gray-50 text-center">
        <button 
          onClick={handleClick}
          disabled={userRole !== 'operator'}
          className={`w-full text-white py-2 px-4 rounded-md mb-2 transition duration-300 ${
            userRole === 'operator'
              ? 'bg-gradient-to-r from-black via-gray-800 to-black hover:from-gray-800 hover:via-black hover:to-gray-800'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Masuk
        </button>
        {userRole !== 'operator' && (
          <div className="text-red-500 text-sm mb-2">
            Button ini hanya bisa diakses oleh operator
          </div>
        )}
        <Link 
          to="/history" 
          className="block text-indigo-600 hover:underline text-sm"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
