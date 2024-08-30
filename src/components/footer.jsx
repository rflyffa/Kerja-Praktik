import React from 'react';
import Logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-custom-red to-red-700 text-white">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <img src={Logo} className="h-12 mr-4" alt="KPU Kota Cimahi Logo" />
            <div>
              <span className="text-2xl font-bold whitespace-nowrap">KPU Kota Cimahi</span>
              <p className="mt-2 text-sm italic max-w-md">
                "Komitmen untuk pelayanan publik yang transparan dan efisien di Kota Cimahi."
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Sumber Daya</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="/informasi" className="hover:underline hover:text-yellow-300 transition-colors">Informasi Pemilu</a>
                </li>
                <li>
                  <a href="/publikasi" className="hover:underline hover:text-yellow-300 transition-colors">Publikasi</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold uppercase">Hukum</h2>
              <ul className="font-medium">
                <li className="mb-4">
                  <a href="/kebijakan-privasi" className="hover:underline hover:text-yellow-300 transition-colors">Kebijakan Privasi</a>
                </li>
                <li>
                  <a href="/syarat-ketentuan" className="hover:underline hover:text-yellow-300 transition-colors">Syarat & Ketentuan</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm sm:text-center">
            © 2023 <a href="/" className="hover:underline">KPU Kota Cimahi™</a>. Hak Cipta Dilindungi.
          </span>
          <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
            <a href="https://www.facebook.com/jdih.kpucimahi" className="hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="https://www.twitter.com/jdihkpu_cimahi" className="hover:text-blue-400 transition-colors">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
                <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="https://www.instagram.com/jdihkpu_cimahi" className="hover:text-pink-400 transition-colors">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.322 3.608 1.297.975.975 1.235 2.242 1.297 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.322 2.633-1.297 3.608-.975.975-2.242 1.235-3.608 1.297-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.322-3.608-1.297-.975-.975-1.235-2.242-1.297-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.322-2.633 1.297-3.608.975-.975 2.242-1.235 3.608-1.297 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.012-4.947.071-1.676.077-3.164.688-4.341 1.866-1.178 1.178-1.789 2.666-1.866 4.341-.059 1.281-.071 1.689-.071 4.947s.012 3.667.071 4.947c.077 1.676.688 3.164 1.866 4.341 1.178 1.178 2.666 1.789 4.341 1.866 1.281.059 1.689.071 4.947.071s3.667-.012 4.947-.071c1.676-.077 3.164-.688 4.341-1.866 1.178-1.178 1.789-2.666 1.866-4.341.059-1.281.071-1.689.071-4.947s-.012-3.667-.071-4.947c-.077-1.676-.688-3.164-1.866-4.341-1.178-1.178-2.666-1.789-4.341-1.866-1.281-.059-1.689-.071-4.947-.071zm0 5.838c-3.407 0-6.162 2.755-6.162 6.162s2.755 6.162 6.162 6.162 6.162-2.755 6.162-6.162-2.755-6.162-6.162-6.162zm0 10.124c-2.183 0-3.962-1.779-3.962-3.962s1.779-3.962 3.962-3.962 3.962 1.779 3.962 3.962-1.779 3.962-3.962 3.962zm6.406-11.845c0 .796-.646 1.442-1.442 1.442s-1.442-.646-1.442-1.442.646-1.442 1.442-1.442 1.442.646 1.442 1.442z"/>
              </svg>
              <span className="sr-only">Instagram account</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
