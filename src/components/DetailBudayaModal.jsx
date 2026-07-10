import React, { useState } from 'react';

const DetailBudayaModal = ({ budaya, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Jika tidak ada data budaya yang dilempar, kembalikan null (tidak render apa-apa)
  if (!budaya) return null;

  // Fungsi untuk membuka link YouTube di tab baru
  const handleLihatVideo = () => {
    if (budaya.youtubeLink) {
      window.open(budaya.youtubeLink, '_blank');
    }
  };

  // GAMBAR CADANGAN TERAMAN (Pakai foto Tugu Malang jika link asli mati)
  const fallbackImg = "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1920";

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm font-poppins"
    >
      
      {/* Modal Container: Efek Glassmorphism dengan transisi animasi Fullscreen */}
      <div 
        className={`relative flex flex-col md:flex-row shadow-2xl border border-[#F8F4E1]/30 bg-[#128C3E]/85 backdrop-blur-md overflow-y-auto transform transition-all duration-700 ease-in-out origin-center
        ${isFullscreen 
          ? 'w-[100vw] h-[100vh] max-w-[100vw] max-h-[100vh] rounded-none gap-8 md:gap-12 p-6 md:p-12 lg:p-16' 
          : 'w-[95vw] h-[95vh] md:w-[90vw] md:h-[85vh] max-w-[1024px] max-h-[850px] rounded-[2rem] gap-6 p-6 md:p-8'
        }`}
      >
        
        {/* Tombol Kontrol (Close & Fullscreen) */}
        <div className={`absolute transition-all duration-700 z-20 flex gap-2 ${isFullscreen ? 'top-6 right-6 md:top-10 md:right-12' : 'top-4 right-4 md:top-6 md:right-6'}`}>
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-[#128C3E]/60 text-[#F8F4E1] w-10 h-10 rounded-full font-bold hover:bg-[#128C3E] border border-[#F8F4E1]/50 flex items-center justify-center transition-colors shadow-lg"
            title={isFullscreen ? "Kembali ke Pop-up" : "Layar Penuh"}
          >
            {isFullscreen ? (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7" />
              </svg>
            ) : (
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            )}
          </button>
          
          <button 
            onClick={onClose}
            className="bg-[#128C3E]/60 text-[#F8F4E1] w-10 h-10 rounded-full font-bold text-xl hover:bg-[#128C3E] border border-[#F8F4E1]/50 flex items-center justify-center transition-colors shadow-lg"
          >
            ✕
          </button>
        </div>

        {/* KIRI: Gambar Utama Budaya */}
        <div className={`w-full flex flex-col transition-all duration-700 mt-8 md:mt-0 ${isFullscreen ? 'md:w-5/12' : 'md:w-1/2'}`}>
          <div className={`bg-[#F8F4E1] w-full rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl border-4 border-[#F8F4E1]/20 transition-all duration-700 h-full min-h-[300px]`}>
             <img 
               src={budaya.image} 
               alt={`Foto ${budaya.name}`} 
               referrerPolicy="no-referrer"
               onError={(e) => {
                 e.target.onerror = null; // Mencegah infinite loop
                 e.target.src = fallbackImg; // Ganti ke gambar cadangan Tugu Malang
               }}
               className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
             />
          </div>
        </div>

        {/* KANAN: Informasi Detail Budaya */}
        <div className={`w-full flex flex-col transition-all duration-700 overflow-y-auto pr-2 custom-scrollbar ${isFullscreen ? 'md:w-7/12 gap-6' : 'md:w-1/2 gap-5'}`}>
          
          {/* Judul & Kategori */}
          <div>
            <h2 className={`font-extrabold text-[#F8F4E1] pr-12 transition-all duration-700 leading-tight ${isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl mb-4' : 'text-3xl md:text-4xl mb-3'}`}>
              {budaya.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              <span className={`bg-[#FFDD02]/20 border border-[#FFDD02]/40 text-[#FFDD02] font-semibold px-4 py-1.5 rounded-full backdrop-blur-sm transition-all duration-700 ${isFullscreen ? 'text-sm' : 'text-xs'}`}>
                🏷️ Kategori: {budaya.category}
              </span>
            </div>
          </div>

          {/* Lokasi / Persebaran */}
          <div className={`flex items-start gap-3 bg-[#543310]/40 rounded-2xl border border-[#F8F4E1]/20 text-[#F8F4E1] shadow-inner transition-all duration-700 ${isFullscreen ? 'p-5 md:p-6 text-base' : 'p-4 text-sm'}`}>
            <span className="text-2xl leading-none">📍</span>
            <div>
              <span className="block font-bold text-[#FFDD02] mb-1">Pusat Persebaran / Lokasi</span>
              <span className="opacity-90 leading-relaxed">{budaya.location}</span>
            </div>
          </div>

          {/* Asal Usul / Sejarah */}
          <div className="text-[#F8F4E1]">
            <h4 className={`font-bold text-[#FFDD02] flex items-center gap-2 transition-all duration-700 ${isFullscreen ? 'mb-3 text-xl' : 'mb-2 text-lg'}`}>
              <span>📜</span> Asal Usul & Sejarah
            </h4>
            <p className={`bg-[#128C3E]/40 border border-[#128C3E]/50 rounded-2xl p-4 md:p-5 opacity-95 leading-relaxed text-justify shadow-md transition-all duration-700 ${isFullscreen ? 'text-base md:text-lg' : 'text-sm'}`}>
              {budaya.history}
            </p>
          </div>

          {/* Penjelasan Detail */}
          <div className="text-[#F8F4E1]">
            <h4 className={`font-bold text-[#FFDD02] flex items-center gap-2 transition-all duration-700 ${isFullscreen ? 'mb-3 text-xl' : 'mb-2 text-lg'}`}>
              <span>✨</span> Makna & Penjelasan
            </h4>
            <p className={`bg-[#128C3E]/40 border border-[#128C3E]/50 rounded-2xl p-4 md:p-5 opacity-95 leading-relaxed text-justify shadow-md transition-all duration-700 ${isFullscreen ? 'text-base md:text-lg' : 'text-sm'}`}>
              {budaya.desc}
            </p>
          </div>

          {/* Box Bawah: Estimasi Biaya & Tombol Video */}
          <div className={`mt-auto rounded-3xl shadow-xl border border-[#F8F4E1]/20 bg-[#543310] flex flex-col transition-all duration-700 ${isFullscreen ? 'p-6 md:p-8 mt-8' : 'p-5 mt-6'}`}>
            
            <div className={`border-b border-[#F8F4E1]/10 flex flex-col text-[#F8F4E1] transition-all duration-700 ${isFullscreen ? 'pb-5 mb-5 gap-2' : 'pb-4 mb-4 gap-1'}`}>
              <span className="font-bold text-[#FFDD02] uppercase tracking-wider text-xs md:text-sm">Estimasi Biaya / Tiket</span>
              <span className={`font-medium opacity-90 ${isFullscreen ? 'text-lg' : 'text-base'}`}>{budaya.price}</span>
            </div>

            {/* Tombol Lihat Video Youtube */}
            <button 
              onClick={handleLihatVideo}
              className={`w-full font-bold rounded-2xl transition-all duration-500 tracking-wider shadow-[0_0_20px_rgba(255,221,2,0.15)] flex items-center justify-center gap-3 group
                bg-[#F8F4E1] hover:bg-[#FFDD02] text-[#543310] hover:text-[#543310]
                ${isFullscreen ? 'py-4 md:py-5 text-lg' : 'py-3 md:py-4 text-base'}`
              }
            >
              {/* Ikon Play YouTube */}
              <svg 
                className="w-6 h-6 md:w-8 md:h-8 text-red-600 group-hover:scale-110 transition-transform duration-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              LIHAT VIDEO BUDAYA
            </button>

          </div>
        </div>

      </div>

      {/* Tambahan CSS Global untuk Custom Scrollbar khusus di Modal ini agar lebih estetik */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(248, 244, 225, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(248, 244, 225, 0.4); }
      `}</style>
      
    </div>
  );
};

export default DetailBudayaModal;