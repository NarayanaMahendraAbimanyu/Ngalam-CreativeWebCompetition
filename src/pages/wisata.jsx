import React, { useState } from 'react';
import { wisataData } from '../components/wisataData'; // Sesuaikan path ini jika perlu
import DetailWisataModal from '../components/DetailWisataModal'; // Sesuaikan path ini jika perlu

const WisataPage = () => {
  const [selectedWisata, setSelectedWisata] = useState(null);
  
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(wisataData.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // Logic indikator titik (Maksimal 5 titik)
  const maxDots = 5;
  const dotGroupIndex = Math.floor(currentPage / maxDots);
  const startDot = dotGroupIndex * maxDots;
  
  const visibleDots = Array.from({ length: maxDots }, (_, i) => startDot + i).filter(dot => dot < totalPages);
  const currentData = wisataData.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
        `}
      </style>
      <div className="min-h-screen bg-[#F8F4E1] p-8 font-poppins">
        
        {/* Header */}
        <div className="text-center mb-10 mt-24">
          <h1 className="text-4xl font-extrabold text-[#543310] mb-4">
            <span className="text-[#128C3E]">Wisata</span> Malang
          </h1>
          <p className="text-[#543310] max-w-2xl mx-auto opacity-80 text-sm md:text-base">
            Kota Malang merupakan kota terbesar kedua di Jawa Timur setelah Surabaya. Sebagai pusat ekonomi dan sosial di wilayah bagian selatan Jawa Timur.
          </p>
        </div>

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {currentData.map((wisata) => (
            <div key={wisata.id} className="bg-[#543310] rounded-2xl overflow-hidden flex flex-col p-3 shadow-lg transition-transform hover:-translate-y-1">
              
              {/* Image Placeholder */}
              <div className="bg-[#128C3E] w-full h-48 rounded-xl mb-4 flex items-center justify-center">
                 <span className="text-[#F8F4E1] font-bold opacity-70 text-center px-4">{wisata.name} Image</span>
              </div>
              
              {/* Info Area */}
              <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="text-[#F8F4E1] font-bold text-lg leading-tight w-3/4">{wisata.name}</h3>
                <div className="flex items-center gap-1">
                  <span className="text-[#FFDD02] font-bold text-lg">{wisata.rate}</span>
                  <span className="text-[#FFDD02] text-xl leading-none -mt-1">★</span>
                </div>
              </div>
              
              <p className="text-[#F8F4E1] text-xs md:text-sm mb-6 px-1 line-clamp-2 opacity-80">
                {wisata.desc}
              </p>
              
              <div className="mt-auto flex justify-center pb-2">
                <button 
                  onClick={() => setSelectedWisata(wisata)}
                  className="bg-[#128C3E] hover:bg-green-700 text-[#F8F4E1] font-semibold py-2 px-6 rounded-full text-sm flex items-center gap-2 transition-colors"
                >
                  Lihat Selengkapnya <span className="font-bold">&gt;</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls & Dots */}
        <div className="flex justify-center items-center mt-12 gap-6">
          <button 
            onClick={handlePrev}
            disabled={currentPage === 0}
            className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-colors ${currentPage === 0 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-[#543310] text-[#F8F4E1] hover:bg-yellow-900'}`}
          >
            &lt;
          </button>
          
          <div className="flex gap-2">
            {visibleDots.map(dotIndex => (
              <button 
                key={dotIndex}
                onClick={() => setCurrentPage(dotIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentPage === dotIndex ? 'bg-[#543310] scale-125' : 'bg-gray-400 hover:bg-gray-500'}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-colors ${currentPage === totalPages - 1 ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-[#543310] text-[#F8F4E1] hover:bg-yellow-900'}`}
          >
            &gt;
          </button>
        </div>

        {/* Pop Up Detail Wisata */}
        {selectedWisata && (
          <DetailWisataModal 
            wisata={selectedWisata} 
            onClose={() => setSelectedWisata(null)} 
          />
        )}

      </div>
    </>
  );
};

export default WisataPage;