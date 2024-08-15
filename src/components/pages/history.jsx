import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

const History = () => {
    const [letters, setLetters] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch letters from your API or database
        fetch('/api/letters')  // Update this URL with your actual API endpoint
            .then(response => response.json())
            .then(data => {
                setLetters(data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error fetching letters.');
                setLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredLetters = letters.filter(letter =>
        letter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        letter.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="mt-40 max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
                    Log Surat
                </h2>
                <div className="mb-8 flex justify-center">
                    <div className="relative w-full sm:w-1/2 md:w-1/3">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Cari surat..."
                            className="w-full p-3 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <AiOutlineSearch className="absolute left-3 top-3 text-gray-500" />
                    </div>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center text-lg">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredLetters.length > 0 ? (
                            filteredLetters.map(letter => (
                                <div key={letter.id} className="bg-white p-6 shadow-lg rounded-lg transition-transform transform hover:scale-105 hover:shadow-xl">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{letter.title}</h3>
                                    <p className="text-gray-600">{letter.content}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center">Tidak ada surat ditemukan.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default History;
