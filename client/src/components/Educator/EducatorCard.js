import React from 'react';

const ClassCard = ({ className }) => {
  const openGoogleMeet = () => {
    // Redirect to the Google Meet website
    window.open('https://meet.google.com/', '_blank');
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{className}</h2>
        <div className="flex justify-between">
        <button
                  className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={openGoogleMeet}
                >
                  Google Meet
                </button>


        </div>
      </div>
    </div>
  );
};

export default ClassCard;