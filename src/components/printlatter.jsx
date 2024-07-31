import React, { useEffect, useState } from 'react';

const PrintableLetter = () => {
  const [letterData, setLetterData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem('letterData'));
    setLetterData(data);
  }, []);

  const printLetter = () => {
    window.print();
  };

  if (!letterData) return <p>Loading...</p>;

  return (
    <div className="p-8 bg-white rounded-lg shadow max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Letter</h1>
      <p className="mb-4"><strong>Recipient:</strong> {letterData.recipient}</p>
      <p className="mb-4"><strong>Subject:</strong> {letterData.subject}</p>
      <p className="mb-4"><strong>Body:</strong></p>
      <p>{letterData.body}</p>
      <button
        onClick={printLetter}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Print Letter
      </button>
    </div>
  );
};

export default PrintableLetter;
