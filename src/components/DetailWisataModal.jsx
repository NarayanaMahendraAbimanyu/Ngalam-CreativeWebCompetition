import React, { useState, useEffect } from 'react';

const DetailWisataModal = ({ wisata, onClose }) => {
  const [jumlah, setJumlah] = useState(5);
  const [tanggal, setTanggal] = useState('');
  const [totalHarga, setTotalHarga] = useState(0);
  const [isWeekend, setIsWeekend] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Set default date ke hari ini
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setTanggal(today);
  }, []);

  // Kalkulasi harga & cek disable gratis
  useEffect(() => {
    if (tanggal) {
      const dateObj = new Date(tanggal);
      const day = dateObj.getDay();
      const weekendCheck = day === 0 || day === 6;
      setIsWeekend(weekendCheck);

      const hargaSatuan = weekendCheck ? wisata.priceWeekend : wisata.priceWeekday;
      setTotalHarga(hargaSatuan * jumlah);
    }
  }, [jumlah, tanggal, wisata]);

  const currentPrice = isWeekend ? wisata.priceWeekend : wisata.priceWeekday;
  const isFree = currentPrice === 0;
  
  // LOGIC BARU: Cek kalau tiket mati (karena tutup ATAU gratis)
  const isBookingDisabled = isFree || !wisata.isBeroperasi;

  const handlePesanTiket = () => {
    if (isBookingDisabled) return; // Mencegah klik jika gratis atau tidak beroperasi
    
    // Langsung arahkan ke link Tiket.com wisata tersebut (Tidak ke WA lagi)
    window.open(wisata.linkTiket, '_blank');
  };

  if (!wisata) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm font-poppins"
    >
      
      {/* Modal Container: Animasi lebar, tinggi, max-width, max-height, dan border radius */}
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
            className="bg-[#128C3E]/60 text-[#F8F4E1] w-10 h-10 rounded-full font-bold hover:bg-[#128C3E] border border-[#F8F4E1]/50 flex items-center justify-center transition-colors"
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
            className="bg-[#128C3E]/60 text-[#F8F4E1] w-10 h-10 rounded-full font-bold text-xl hover:bg-[#128C3E] border border-[#F8F4E1]/50 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Kiri: Gambar/Maps/Dokumentasi */}
        <div className={`w-full flex flex-col transition-all duration-700 mt-8 md:mt-0 ${isFullscreen ? 'md:w-1/2 gap-6' : 'md:w-1/2 gap-4'}`}>
          {/* Gambar Wisata Utama */}
          <div className={`bg-[#F8F4E1] w-full rounded-2xl flex items-center justify-center overflow-hidden shadow-inner transition-all duration-700 ${isFullscreen ? 'h-[350px] lg:h-[500px]' : 'h-[250px] md:h-72'}`}>
             <img 
               src={wisata.image} 
               alt={`Foto ${wisata.name}`} 
               className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
             />
          </div>
          
          <div>
            <h3 className={`text-[#F8F4E1] font-bold transition-all duration-700 ${isFullscreen ? 'mb-4 text-xl' : 'mb-3 text-base'}`}>Dokumentasi Pengunjung</h3>
            <div className="flex gap-4">
              {/* Gambar Dokumentasi 1 */}
              <div className={`bg-[#F8F4E1]/20 border border-[#F8F4E1]/30 flex-1 rounded-xl flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-700 ${isFullscreen ? 'h-40' : 'h-32'}`}>
                <img 
                  src={wisata.dokumentasi1} 
                  alt="Dokumentasi Pengunjung 1" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              
              {/* Gambar Dokumentasi 2 */}
              <div className={`bg-[#F8F4E1]/20 border border-[#F8F4E1]/30 flex-1 rounded-xl flex items-center justify-center overflow-hidden backdrop-blur-sm transition-all duration-700 ${isFullscreen ? 'h-40' : 'h-32'}`}>
                <img 
                  src={wisata.dokumentasi2} 
                  alt="Dokumentasi Pengunjung 2" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kanan: Informasi & Checkout */}
        <div className={`w-full flex flex-col transition-all duration-700 ${isFullscreen ? 'md:w-1/2 gap-6' : 'md:w-1/2 gap-4'}`}>
          <h2 className={`font-extrabold text-[#F8F4E1] pr-20 transition-all duration-700 ${isFullscreen ? 'text-4xl md:text-5xl lg:text-6xl' : 'text-3xl md:text-4xl'}`}>
            {wisata.name}
          </h2>
          
          {/* TAG WILAYAH, KATEGORI, DAN TAMBAHAN STATUS BEROPERASI */}
          <div className="flex flex-wrap gap-2 -mt-2">
            <span className={`bg-[#F8F4E1]/20 border border-[#F8F4E1]/30 text-[#F8F4E1] px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-700 ${isFullscreen ? 'text-sm' : 'text-xs'}`}>
              📍 Wilayah {wisata.kecamatan}
            </span>
            <span className={`bg-[#FFDD02]/20 border border-[#FFDD02]/30 text-[#FFDD02] font-semibold px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-700 ${isFullscreen ? 'text-sm' : 'text-xs'}`}>
              🏷️ {wisata.kategori}
            </span>
            {/* Tag Operasional dengan Warna Merah / Hijau */}
            <span className={`font-semibold px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-700 ${isFullscreen ? 'text-sm' : 'text-xs'} ${wisata.isBeroperasi ? 'bg-green-500/20 border border-green-500/30 text-green-400' : 'bg-red-500/20 border border-red-500/30 text-red-400'}`}>
              {wisata.isBeroperasi ? '🟢 Sedang Beroperasi' : '🔴 Tidak Beroperasi'}
            </span>
          </div>

          {/* Rating - Clickable to Google */}
          <a 
            href={`https://www.google.com/search?q=${encodeURIComponent(wisata.name + " Malang")}`} 
            target="_blank" 
            rel="noreferrer"
            className={`flex items-center gap-4 bg-[#128C3E]/50 rounded-xl border border-[#128C3E]/70 hover:bg-[#128C3E] transition-all duration-700 cursor-pointer group shadow-sm ${isFullscreen ? 'p-4 mt-2' : 'p-3 mt-1'}`}
          >
            <div className={`flex items-center gap-1 text-[#FFDD02] font-bold group-hover:scale-105 transition-transform ${isFullscreen ? 'text-3xl' : 'text-2xl'}`}>
              {wisata.rate} <span className={`${isFullscreen ? 'text-3xl' : 'text-2xl'} -mt-1`}>★</span> <span className={`text-[#F8F4E1] ml-1 ${isFullscreen ? 'text-base' : 'text-sm'}`}>Google</span>
            </div>
            <div className={`text-[#F8F4E1]/90 ${isFullscreen ? 'text-sm' : 'text-xs'}`}>Berdasarkan ulasan {wisata.reviews} asli dari Google Maps</div>
          </a>

          {/* Jam Operasional */}
          <div className={`flex justify-between items-center bg-[#128C3E]/50 rounded-xl border border-[#128C3E]/70 text-[#F8F4E1] font-semibold shadow-sm transition-all duration-700 ${isFullscreen ? 'p-5 md:p-6 text-base md:text-lg' : 'p-4 text-sm md:text-base'}`}>
            <span>Jam Operasional Buka :</span>
            <span>{wisata.jamBuka}</span>
          </div>

          {/* Deskripsi */}
          <div className="text-[#F8F4E1]">
            <h4 className={`font-bold transition-all duration-700 ${isFullscreen ? 'mb-3 text-lg md:text-xl' : 'mb-2 text-base'}`}>Tentang Destinasi</h4>
            <p className={`opacity-90 leading-relaxed text-justify transition-all duration-700 ${isFullscreen ? 'text-base md:text-lg' : 'text-sm'}`}>{wisata.desc}</p>
          </div>

          {/* Harga Info */}
          <div className={`flex flex-col bg-[#128C3E]/50 rounded-xl border border-[#128C3E]/70 text-[#F8F4E1] shadow-sm font-medium transition-all duration-700 ${isFullscreen ? 'gap-3 p-5 md:p-6 text-base md:text-lg' : 'gap-2 p-4 text-sm'}`}>
            <div className="flex justify-between">
              <span>Hari Produktif (Weekday):</span>
              <span>{wisata.priceWeekday === 0 ? "Gratis" : `Rp. ${wisata.priceWeekday.toLocaleString('id-ID')}/Orang`}</span>
            </div>
            <div className="flex justify-between">
              <span>Hari Libur (Weekend):</span>
              <span>{wisata.priceWeekend === 0 ? "Gratis" : `Rp. ${wisata.priceWeekend.toLocaleString('id-ID')}/Orang`}</span>
            </div>
          </div>

          {/* Card Pesan Tiket */}
          <div className={`rounded-2xl shadow-lg border border-[#F8F4E1]/10 mt-auto transition-all duration-700 ${isFullscreen ? 'p-6 md:p-8' : 'p-5'} ${!wisata.isBeroperasi || isFree ? 'bg-[#543310]/40' : 'bg-[#543310]'}`}>
            <h3 className={`font-bold transition-all duration-700 ${isFullscreen ? 'text-2xl mb-6' : 'text-xl mb-4'} ${!wisata.isBeroperasi || isFree ? 'text-[#F8F4E1]/40' : 'text-[#F8F4E1]'}`}>Pesan Tiket</h3>
            
            <div className={`flex gap-4 transition-all duration-700 ${isFullscreen ? 'mb-6' : 'mb-5'}`}>
              
              {/* Input Jumlah Wisatawan */}
              <div className="flex-1">
                <label className={`block mb-2 transition-all duration-700 ${isFullscreen ? 'text-sm' : 'text-xs'} ${!wisata.isBeroperasi || isFree ? 'text-[#F8F4E1]/30' : 'text-[#F8F4E1] opacity-90'}`}>Jumlah Wisatawan :</label>
                <div className={`flex items-center justify-between rounded-lg px-3 font-bold transition-all duration-700 ${isFullscreen ? 'py-3' : 'py-2'} ${isBookingDisabled ? 'bg-gray-500 text-gray-700 cursor-not-allowed select-none' : 'bg-[#F8F4E1] text-[#543310]'}`}>
                  <button 
                    type="button" 
                    disabled={isBookingDisabled} 
                    onClick={() => setJumlah(Math.max(1, jumlah - 1))} 
                    className={`text-2xl px-2 hover:scale-110 transition-transform leading-none ${isBookingDisabled ? 'text-gray-600 cursor-not-allowed pointer-events-none' : 'text-[#128C3E]'}`}
                  >
                    -
                  </button>
                  <span className={`transition-all duration-700 ${isFullscreen ? 'text-xl' : 'text-lg'} ${isBookingDisabled ? 'opacity-40' : ''}`}>{jumlah}</span>
                  <button 
                    type="button" 
                    disabled={isBookingDisabled} 
                    onClick={() => setJumlah(jumlah + 1)} 
                    className={`text-2xl px-2 hover:scale-110 transition-transform leading-none ${isBookingDisabled ? 'text-gray-600 cursor-not-allowed pointer-events-none' : 'text-[#128C3E]'}`}
                  >
                    +
                  </button>
                </div>
              </div>
              
              {/* Input Tanggal Kunjungan */}
              <div className="flex-1">
                <label className={`block mb-2 transition-all duration-700 ${isFullscreen ? 'text-sm' : 'text-xs'} ${!wisata.isBeroperasi || isFree ? 'text-[#F8F4E1]/30' : 'text-[#F8F4E1] opacity-90'}`}>Tanggal Kunjungan :</label>
                <input 
                  type="date" 
                  value={tanggal}
                  disabled={isBookingDisabled}
                  onChange={(e) => setTanggal(e.target.value)}
                  className={`w-full font-bold rounded-lg px-3 outline-none text-center transition-all duration-700 ${isFullscreen ? 'h-[52px] text-base' : 'h-[44px] py-2'} ${isBookingDisabled ? 'bg-gray-500 text-gray-700 cursor-not-allowed opacity-60' : 'bg-[#F8F4E1] text-[#543310]'}`}
                />
              </div>
            </div>

            <div className={`border-t border-[#F8F4E1]/20 flex flex-col text-[#F8F4E1] transition-all duration-700 ${isFullscreen ? 'pt-5 pb-5 gap-4 text-base' : 'pt-4 pb-4 gap-3 text-sm'} ${!wisata.isBeroperasi || isFree ? 'opacity-30' : ''}`}>
              <div className="flex justify-between items-center">
                <span className="opacity-90">Tiket Masuk ({isWeekend ? 'Weekend' : 'Weekday'}):</span>
                <span className="font-semibold">{ isFree ? "Gratis" : `Rp. ${currentPrice.toLocaleString('id-ID')} / Orang` }</span>
              </div>
              <div className={`flex justify-between items-center font-bold border-t border-[#F8F4E1]/20 transition-all duration-700 ${isFullscreen ? 'pt-4 text-xl' : 'pt-3 text-lg'}`}>
                <span>Total :</span>
                <span className="text-[#FFDD02]">{isFree ? "Gratis" : `Rp. ${totalHarga.toLocaleString('id-ID')}`}</span>
              </div>
            </div>

            {/* Tombol Pemesanan (Disesuaikan berdasarkan Tutup vs Gratis vs Buka) */}
            <button 
              onClick={handlePesanTiket}
              disabled={isBookingDisabled}
              className={`w-full font-bold rounded-xl transition-all mt-2 tracking-wide shadow-md duration-700 ${isFullscreen ? 'py-4 md:py-5 text-base md:text-lg' : 'py-3 md:py-4 text-sm md:text-base'} ${
                !wisata.isBeroperasi
                ? 'bg-red-900/60 text-red-300 cursor-not-allowed border-none shadow-none opacity-80'
                : isFree 
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed border-none shadow-none opacity-50' 
                : 'bg-[#128C3E] hover:bg-[#0e6e30] text-[#F8F4E1]'
              }`}
            >
              {!wisata.isBeroperasi ? "TIKET DITUTUP (TIDAK BEROPERASI)" : isFree ? "TIKET GRATIS (TIDAK PERLU PESAN)" : "PESAN TIKET SEKARANG DI TIKET.COM"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailWisataModal;