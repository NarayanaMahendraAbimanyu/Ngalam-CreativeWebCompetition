import React, { useState } from 'react';

const FooterWisata = () => {
  const [saran, setSaran] = useState('');

  const handleKirimSaran = (e) => {
    e.preventDefault();
    if (!saran.trim()) {
      alert('Tulis dulu dong sarannya, jangan dikosongin ya! ');
      return;
    }

    const nomorWA = '6289512477330';
    const pesanTeks = encodeURIComponent(
      `Halo Tim Developer Wisata Malang,\n\nBerikut adalah masukan/saran segar dari pengguna untuk pengembangan web:\n\n"${saran}"\n\nSalam Hangat!`
    );

    // Memicu pembukaan tab baru secara otomatis direct ke WhatsApp
    window.open(`https://wa.me/${nomorWA}?text=${pesanTeks}`, '_blank');
    
    // Reset form field setelah mengirim
    setSaran('');
  };

  return (
    <footer className="relative bg-[#543310] text-[#F8F4E1] font-poppins pt-16 pb-8 px-6 overflow-hidden border-t-4 border-[#128C3E]">
      {/* Background Ornamen Estetik Bulat Blur khas Glassmorphism modern */}
      <div className="absolute top-[-40px] left-[10%] w-72 h-72 bg-[#128C3E] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-[-20px] right-[5%] w-60 h-60 bg-[#FFDD02] rounded-full blur-[100px] opacity-15 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        
        {/* Kolom 1: Tentang / Branding */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight">
            <span className="text-[#FFDD02]">Wisata</span>
            <span className="text-[#128C3E]"> Ngalam</span>
          </h2>
          <p className="text-sm opacity-80 leading-relaxed text-justify">
            Platform eksplorasi digital Malang Raya. Kami berkomitmen menyajikan informasi destinasi terbaik, rincian harga, hingga pemetaan interaktif real-time untuk mempermudah petualangan liburanmu.
          </p>
          <div className="flex gap-3 pt-2">
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFDD02] hover:text-[#543310] transition-colors cursor-pointer text-sm">🌐</span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFDD02] hover:text-[#543310] transition-colors cursor-pointer text-sm">📸</span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#FFDD02] hover:text-[#543310] transition-colors cursor-pointer text-sm">✈️</span>
          </div>
        </div>

        {/* Kolom 2: Navigasi Cepat */}
        <div className="space-y-4 md:pl-8">
          <h3 className="text-lg font-bold border-b-2 border-[#128C3E] pb-2 inline-block">Jelajahi</h3>
          <ul className="space-y-2.5 text-sm font-medium">
            <li>
              <a href="/wisata" className="opacity-80 hover:opacity-100 hover:text-[#FFDD02] transition-colors flex items-center gap-2">
                <span>🔍</span> Cari Destinasi
              </a>
            </li>
            <li>
              <a href="/budaya" className="opacity-80 hover:opacity-100 hover:text-[#FFDD02] transition-colors flex items-center gap-2">
                <span>🏷️</span> Jelajah Budaya
              </a>
            </li>
            <li>
              <a href="/wisata#interactive-map-section" className="opacity-80 hover:opacity-100 hover:text-[#FFDD02] transition-colors flex items-center gap-2">
                <span>🗺️</span> Peta Geografis Interaktif
              </a>
            </li>
            <li>
              <a href="/kuliner" className="opacity-80 hover:opacity-100 hover:text-[#FFDD02] transition-colors flex items-center gap-2">
                <span>🍽️</span> Ragam Kuliner
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Formulir Masukan Interaktif (Gokil/Asik) */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b-2 border-[#FFDD02] pb-2 inline-block">Kotak Aspirasi</h3>
          <p className="text-xs text-[#FFDD02] font-semibold tracking-wider uppercase">
            Ada kritik pedas atau ide gokil biar web ini makin keren? 🔥
          </p>
          
          <form onSubmit={handleKirimSaran} className="space-y-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded-2xl shadow-inner">
              <textarea
                value={saran}
                onChange={(e) => setSaran(e.target.value)}
                placeholder="Tumpahin semua isi pikiranmu di sini, jangan ragu ya cuy... 🚀"
                rows="3"
                className="w-full bg-transparent border-none outline-none text-sm text-[#F8F4E1] placeholder-[#F8F4E1]/50 resize-none px-2 py-1 font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#128C3E] hover:bg-green-700 text-[#F8F4E1] font-bold py-2.5 px-4 rounded-xl text-xs transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-2 tracking-wide"
            >
              <span>Kirim Umpan Balik</span> 🚀
            </button>
          </form>
        </div>

      </div>

      {/* Hak Cipta Bawah */}
      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs opacity-60">
        <p>&copy; {new Date().getFullYear()} Wisata Malang Raya. Built By Team Bawa Nara Pasti Menang.</p>
      </div>
    </footer>
  );
};

export default FooterWisata;