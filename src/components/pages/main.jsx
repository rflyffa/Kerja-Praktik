import React from 'react';
import { Link } from 'react-router-dom';
import Background from '../../assets/background.png';

const Main = () => {
  return (
    <section
      className="relative bg-center bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply overflow-hidden"
      style={{
        backgroundImage: `url(${Background})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"></div>
      <div className="relative px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mt-20 text-3xl font-bold tracking-tight leading-none text-white md:text-4xl lg:text-5xl animate-slide-down">
          SELAMAT DATANG DI APLIKASI PEMBUATAN SURAT TUGAS DINAS DAN SURAT VISUM KOMISI PEMILIHAN UMUM KOTA CIMAHI
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48 animate-slide-up">
          Jl.Pesantren-TTUC NO. 108, KOTA CIMAHI
        </p>
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
          <Link
            to="/login"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 animate-bounce-in"
          >
            Sign In
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180 animate-pulse"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          <a href="#" className="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400 animate-bounce-in delay-150 hover:animate-wiggle">
            Learn more
          </a>
        </div>
      </div>
    </section>
  );
};

export default Main;