import React, { useState, useEffect } from 'react';
import { wisataData } from '../components/wisataData'; // Sesuaikan path jika perlu
import DetailWisataModal from '../components/DetailWisataModal'; // Sesuaikan path jika perlu
import FooterWisata from '../components/footer'; // Import komponen Footer Baru

// Import Leaflet untuk Peta Asli
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

const WisataPage = () => {
  // Efek ini akan berjalan sekali saat halaman pertama kali di-render
  // untuk memastikan tampilan selalu mulai dari paling atas
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedWisata, setSelectedWisata] = useState(null);
  
  // Logic "Lihat Lebih Banyak" (Load More) dan "Lihat Lebih Sedikit"
  const [visibleCount, setVisibleCount] = useState(6); // Menampilkan 6 data awal
  const itemsToLoad = 6; // Jumlah data yang ditambah saat tombol diklik

  // States untuk Pencarian dan Filter Utama
  const [searchQuery, setSearchQuery] = useState('');
  const [filterHarga, setFilterHarga] = useState('');
  const [filterKecamatan, setFilterKecamatan] = useState('');
  const [filterKategori, setFilterKategori] = useState('');
  const [filterRating, setFilterRating] = useState(''); // State untuk Rating
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State untuk Toggle Menu Filter

  // State untuk Peta Interaktif Wilayah (Default ke Klojen)
  const [selectedMapRegion, setSelectedMapRegion] = useState('Klojen');

  // Menggabungkan fungsi Load More dan Reset Less
  const handleToggleVisibleCount = () => {
    if (visibleCount >= filteredWisata.length) {
      // Jika sudah maksimal, ciptakan efek animasi menutup dengan smooth scroll kembali ke atas grid
      setVisibleCount(6);
      const gridSection = document.getElementById('main-cards-section');
      if (gridSection) {
        gridSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setVisibleCount(prevCount => prevCount + itemsToLoad);
    }
  };

  // Fungsi Scroll Otomatis ke Bagian Peta
  const scrollToMap = () => {
    const mapSection = document.getElementById('interactive-map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Proses Filter Data Utama berdasarkan input pengguna
  const filteredWisata = wisataData.filter((wisata) => {
    const matchesSearch = wisata.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          wisata.desc.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesKecamatan = filterKecamatan === '' || wisata.kecamatan === filterKecamatan;
    const matchesKategori = filterKategori === '' || wisata.kategori === filterKategori;
    const matchesRating = filterRating === '' || parseFloat(wisata.rate) >= parseFloat(filterRating);
    
    // Logika Filter Rentang Harga
    let matchesHarga = true;
    const hargaTertinggi = Math.max(wisata.priceWeekday, wisata.priceWeekend);
    if (filterHarga === 'gratis') {
      matchesHarga = hargaTertinggi === 0;
    } else if (filterHarga === 'murah') {
      matchesHarga = hargaTertinggi > 0 && hargaTertinggi <= 20000;
    } else if (filterHarga === 'sedang') {
      matchesHarga = hargaTertinggi > 20000 && hargaTertinggi <= 75000;
    } else if (filterHarga === 'premium') {
      matchesHarga = hargaTertinggi > 75000;
    }

    return matchesSearch && matchesKecamatan && matchesKategori && matchesHarga && matchesRating;
  });

  // Memotong data hasil filter sesuai jumlah muat data yang diizinkan untuk tampil
  const currentData = filteredWisata.slice(0, visibleCount);

  // Mengambil data khusus untuk ditampilkan pada list wilayah peta interaktif
  const mapRegionData = wisataData.filter(wisata => wisata.kecamatan === selectedMapRegion);

  // === DATA REGIONAL UNTUK REAL MAP ===
  const mapRegions = [
    { id: 'Klojen', name: 'Klojen (Pusat)', center: [-7.9771, 112.6340] },
    { id: 'Blimbing', name: 'Blimbing', center: [-7.9350, 112.6470] },
    { id: 'Lowokwaru', name: 'Lowokwaru', center: [-7.9400, 112.6100] },
    { id: 'Sukun', name: 'Sukun', center: [-7.9950, 112.6150] },
    { id: 'Batu', name: 'Kota Batu', center: [-7.8671, 112.5239] },
    { id: 'Kabupaten Malang', name: 'Kab. Malang', center: [-8.1320, 112.5700] },
  ];

  // Custom UI Marker Icon untuk Leaflet
  const getCustomIcon = (regionName, isSelected) => {
    const bgColor = isSelected ? '#FFDD02' : '#128C3E';
    const textColor = isSelected ? '#543310' : '#F8F4E1';
    const scale = isSelected ? 'scale(1.15) translateY(-5px)' : 'scale(1)';
    const zIndex = isSelected ? 1000 : 1;

    return L.divIcon({
      className: 'bg-transparent border-none', // Menghapus styling bawaan Leaflet
      html: `
        <div style="
          background-color: ${bgColor};
          color: ${textColor};
          padding: 8px 16px;
          border-radius: 30px;
          font-family: 'Poppins', sans-serif;
          font-weight: 800;
          font-size: 13px;
          border: 3px solid #F8F4E1;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.5);
          white-space: nowrap;
          transform: ${scale};
          transition: transform 0.3s ease, background-color 0.3s ease;
          position: relative;
          z-index: ${zIndex};
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          📍 ${regionName}
        </div>
      `,
      iconSize: [0, 0], // Otomatis menyesuaikan isi div HTML
      iconAnchor: [50, 20] // Menjangkar posisi titik kordinat tepat ke tengah
    });
  };

  return (
    <>
      {/* Import CSS Utama Leaflet langsung dari CDN agar tidak repot setup */}
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
          .font-poppins { font-family: 'Poppins', sans-serif; }
          
          /* Efek Kaca (Glassmorphism) */
          .glassmorphism {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }
          .glassmorphism-dark {
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }

          /* Kustomisasi UI Peta Asli Leaflet agar selaras dengan desain Web */
          .leaflet-container {
            font-family: 'Poppins', sans-serif;
            background-color: #E5E5E5; 
            z-index: 10;
          }
          .leaflet-control-zoom {
            border: none !important;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3) !important;
            margin-top: 20px !important;
            margin-left: 20px !important;
          }
          .leaflet-control-zoom a {
            background-color: #F8F4E1 !important;
            color: #543310 !important;
            border-bottom: 1px solid rgba(84, 51, 16, 0.2) !important;
          }
          .leaflet-control-zoom a:hover {
            background-color: #FFDD02 !important;
          }
          .leaflet-control-attribution {
            display: none; /* Menyembunyikan teks copyright map agar clean */
          }
          
          /* Custom Scrollbar untuk bagian List Daerah */
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: rgba(248,244,225,0.1); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(248,244,225,0.3); border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,221,2,0.6); }

          /* Animasi Kartu Wisata Masuk (Fade In Up) */
          @keyframes fadeInUp {
            0% {
              opacity: 0;
              transform: translateY(30px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .animate-card-view {
            animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
          }
        `}
      </style>
      
      {/* PERBAIKAN: Padding responsif p-4 untuk mobile, p-8 untuk desktop */}
      <div id="main-cards-section" className="min-h-screen bg-[#F8F4E1] p-4 md:p-8 font-poppins">
        
        {/* Header Section */}
        {/* PERBAIKAN: Margin top responsif agar tidak terlalu kosong di mobile */}
        <div className="text-center mb-8 md:mb-10 mt-16 md:mt-24">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#543310] mb-4">
            <span className="text-[#128C3E]">Wisata</span> Malang
          </h1>
          <p className="text-[#543310] max-w-2xl mx-auto opacity-80 text-sm md:text-base mb-8 px-2">
            Kota Malang merupakan kota terbesar kedua di Jawa Timur setelah Surabaya. Sebagai pusat ekonomi dan sosial di wilayah bagian selatan Jawa Timur.
          </p>

          {/* Fitur Search & Master Filter Dropdown */}
          <div className="max-w-4xl mx-auto relative z-20">
            {/* Main Bar (Search + Tombol Toggle Filter + Tombol Peta) */}
            <div className="bg-[#543310] p-2 md:p-3 rounded-3xl md:rounded-full shadow-xl flex flex-col md:flex-row items-center gap-2 md:gap-3">
              <input 
                type="text"
                placeholder="Cari destinasi wisata idamanmu di sini..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-[#F8F4E1] text-[#543310] font-medium outline-none placeholder-[#543310]/60 shadow-inner flex-1"
              />
              {/* PERBAIKAN: Memungkinkan tombol bertumpuk rapi di layar super kecil */}
              <div className="flex flex-col sm:flex-row w-full md:w-auto gap-2 mt-2 md:mt-0">
                <button 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className={`px-6 py-3 rounded-full font-bold transition-all flex items-center justify-center gap-2 w-full sm:w-auto md:flex-none ${isFilterOpen ? 'bg-[#FFDD02] text-[#543310]' : 'bg-[#F8F4E1] text-[#543310] hover:bg-white'}`}
                >
                  ⚙️ Filter
                </button>
                <button
                  onClick={scrollToMap}
                  className="bg-[#128C3E] text-[#F8F4E1] px-6 py-3 rounded-full hover:bg-green-700 shadow-md font-bold whitespace-nowrap flex items-center justify-center gap-2 w-full sm:w-auto md:flex-none transition-colors"
                >
                  🗺️ Lihat Lewat Peta
                </button>
              </div>
            </div>

            {/* PANEL MEGA DROPDOWN FILTER */}
            {isFilterOpen && (
              /* PERBAIKAN: Menggunakan top-full dan mt-4 agar filter dropdown tidak tumpang tindih dengan input search di mobile */
              <div className="absolute top-full mt-4 left-0 right-0 bg-[#F8F4E1] border-2 border-[#543310] p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl z-50 animate-in fade-in zoom-in duration-200 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  
                  {/* Kolom 1 */}
                  <div className="space-y-4">
                    <label className="text-[#543310] font-bold text-sm block border-b border-[#543310]/20 pb-1">Kategori & Wilayah</label>
                    <select 
                      value={filterKecamatan}
                      onChange={(e) => setFilterKecamatan(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#543310]/20 text-[#543310] font-semibold text-sm outline-none cursor-pointer"
                    >
                      <option value="">📍 Semua Wilayah</option>
                      <option value="Klojen">Klojen</option>
                      <option value="Blimbing">Blimbing</option>
                      <option value="Lowokwaru">Lowokwaru</option>
                      <option value="Sukun">Sukun</option>
                      <option value="Batu">Kota Batu</option>
                      <option value="Kabupaten Malang">Kabupaten Malang</option>
                    </select>

                    <select
                      value={filterKategori}
                      onChange={(e) => setFilterKategori(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#543310]/20 text-[#543310] font-semibold text-sm outline-none cursor-pointer"
                    >
                      <option value="">🏷️ Semua Kategori</option>
                      <option value="Alam">Wisata Alam</option>
                      <option value="Kuliner">Kuliner Legendaris</option>
                      <option value="Sejarah">Sejarah &amp; Museum</option>
                      <option value="Taman">Taman Kota</option>
                      <option value="Tematik">Kampung Tematik</option>
                      <option value="Hiburan">Wahana Hiburan</option>
                      <option value="Air">Wahana Air</option>
                      <option value="Budaya">Kebudayaan</option>
                      <option value="Edukasi">Edukasi</option>
                    </select>
                  </div>

                  {/* Kolom 2 */}
                  <div className="space-y-4">
                    <label className="text-[#543310] font-bold text-sm block border-b border-[#543310]/20 pb-1">Detail Opsional</label>
                    <select
                      value={filterHarga}
                      onChange={(e) => setFilterHarga(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#543310]/20 text-[#543310] font-semibold text-sm outline-none cursor-pointer"
                    >
                      <option value="">💰 Semua Harga</option>
                      <option value="gratis">Gratis / Rp 0</option>
                      <option value="murah">Murah (≤ Rp 20rb)</option>
                      <option value="sedang">Sedang (Rp 20rb - Rp 75rb)</option>
                      <option value="premium">Premium (&gt; Rp 75rb)</option>
                    </select>

                    <select
                      value={filterRating}
                      onChange={(e) => setFilterRating(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#543310]/20 text-[#543310] font-semibold text-sm outline-none cursor-pointer"
                    >
                      <option value="">⭐ Semua Rating (Min)</option>
                      <option value="4">4.0 ke atas</option>
                      <option value="4.5">4.5 ke atas</option>
                      <option value="4.8">4.8 ke atas</option>
                    </select>
                  </div>

                </div>

                <button 
                  onClick={() => setIsFilterOpen(false)}
                  className="mt-6 w-full bg-[#128C3E] text-[#F8F4E1] hover:bg-green-700 font-bold py-3 px-4 rounded-xl text-sm transition-colors shadow-md"
                >
                  Terapkan Filter
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Grid Cards Utama */}
        {currentData.length > 0 ? (
          /* PERBAIKAN: Gap direnggangkan sedikit lebih proporsional untuk tampilan mobile (gap-6) vs desktop (gap-8) */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto z-0 relative">
            {currentData.map((wisata, index) => (
              <div 
                key={`${wisata.id}-${visibleCount}`} 
                className="animate-card-view bg-[#543310] rounded-2xl overflow-hidden flex flex-col p-3 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-transparent hover:border-[#FFDD02]/30"
                style={{
                  animationDelay: `${(index % itemsToLoad) * 80}ms` // Efek staggered animation yang rapi per baris data baru
                }}
              >
                
                {/* Image Display */}
                <div className="bg-[#128C3E] w-full h-48 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group">
                   <img src={wisata.image} alt={wisata.name} className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                {/* Info Area */}
                <div className="flex justify-between items-center mb-2 px-1">
                  <h3 className="text-[#F8F4E1] font-bold text-lg leading-tight w-3/4">{wisata.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-[#FFDD02] font-bold text-lg">{wisata.rate}</span>
                    <span className="text-[#FFDD02] text-xl leading-none -mt-1">★</span>
                  </div>
                </div>
                
                {/* Tag Detail Region & Category */}
                <div className="flex gap-2 mb-3 px-1 text-[10px]">
                  <span className="bg-[#F8F4E1]/20 text-[#F8F4E1] px-2 py-0.5 rounded-md">{wisata.kecamatan}</span>
                  <span className="bg-[#FFDD02]/20 text-[#FFDD02] px-2 py-0.5 rounded-md">{wisata.kategori}</span>
                </div>

                <p className="text-[#F8F4E1] text-xs md:text-sm mb-6 px-1 line-clamp-2 opacity-80">
                  {wisata.desc}
                </p>
                
                {/* PERBAIKAN: Menambahkan relative z-10 pointer-events-auto agar button tidak terhalangi kliknya */}
                <div className="mt-auto flex justify-center pb-2 relative z-10 pointer-events-auto">
                  <button 
                    onClick={() => setSelectedWisata(wisata)}
                    className="bg-[#128C3E] hover:bg-green-700 text-[#F8F4E1] font-semibold py-2 px-6 rounded-full text-sm flex items-center gap-2 transition-colors shadow-md cursor-pointer"
                  >
                    Lihat Selengkapnya <span className="font-bold">&gt;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 max-w-xl mx-auto px-4">
            <p className="text-[#543310] font-bold text-lg opacity-70">
              Maaf, destinasi wisata yang kamu cari dengan kombinasi filter tersebut tidak dapat ditemukan. Coba ubah pencarian atau katagori filtermu.
            </p>
          </div>
        )}

        {/* Tombol Lihat Lebih Banyak / Lebih Sedikit */}
        {filteredWisata.length > 6 && (
          <div className="flex justify-center items-center mt-10 md:mt-12 mb-12 md:mb-16">
            <button 
              onClick={handleToggleVisibleCount}
              className={`text-[#F8F4E1] font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-md flex items-center gap-2 transform active:scale-95 ${
                visibleCount >= filteredWisata.length 
                  ? 'bg-[#128C3E] hover:bg-green-700 hover:shadow-emerald-900/30' 
                  : 'bg-[#543310] hover:bg-amber-900 hover:shadow-amber-950/40'
              }`}
            >
              {visibleCount >= filteredWisata.length ? (
                <>
                  <span>Tampilkan Lebih Sedikit</span>
                  <span className="text-sm">▲</span>
                </>
              ) : (
                <>
                  <span>Tampilkan Lebih Banyak</span>
                  <span className="text-sm">▼</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* =========================================
            SECTION PETA GEOGRAFIS ASLI (LEAFLET) 
            ========================================= */}
        {/* PERBAIKAN: Spasi atas yang responsif */}
        <div id="interactive-map-section" className="mt-16 md:mt-24 max-w-[1400px] mx-auto pt-10 md:pt-14 border-t-2 border-[#543310]/10">
          <div className="text-center mb-8 md:mb-10 px-2">
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#543310] mb-3">Peta Asli Interaktif Malang Raya</h2>
            <p className="text-[#543310]/80 text-sm md:text-base max-w-2xl mx-auto font-medium">
              Geser, Zoom, dan Klik titik wilayah pada peta dunia nyata di bawah ini untuk melihat koleksi wisata memukau di daerah tersebut!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start h-auto lg:h-[600px] w-full mb-10 md:mb-16">
            
            {/* CONTAINER KIRI: REAL MAP LEAFLET */}
            {/* PERBAIKAN: Penyesuaian tinggi map agar ideal saat dilihat di mobile (400px) */}
            <div className="w-full lg:w-2/3 h-[400px] md:h-[450px] lg:h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl relative border-4 border-[#543310] bg-[#E5E5E5]">
              {/* Note: Coordinate berpusat di Kota Malang */}
              <MapContainer 
                center={[-7.9666, 112.6326]} 
                zoom={11} 
                scrollWheelZoom={true} // Memungkinkan UX zooming pakai mouse
                className="w-full h-full"
              >
                {/* Memakai Base Layer Peta yang estetis dan terang (mirip warna F8F4E1) */}
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {/* Looping memunculkan Marker/Pin Wilayah Interaktif */}
                {mapRegions.map((region) => (
                  <Marker 
                    key={region.id} 
                    position={region.center}
                    icon={getCustomIcon(region.name, selectedMapRegion === region.id)}
                    eventHandlers={{
                      click: () => {
                        setSelectedMapRegion(region.id);
                      },
                    }}
                  />
                ))}
              </MapContainer>
            </div>

            {/* CONTAINER KANAN: PANEL GLASSMORPHISM LIST WISATA */}
            {/* PERBAIKAN: Penyesuaian border radius panel dan proporsi tinggi mobile */}
            <div className="w-full lg:w-1/3 bg-[#543310] p-4 md:p-6 rounded-2xl md:rounded-3xl shadow-xl h-[450px] lg:h-full flex flex-col relative overflow-hidden">
              {/* Background Dekorasi Artistik agar tidak plain */}
              <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-[#128C3E] rounded-full blur-3xl opacity-20 pointer-events-none"></div>
              <div className="absolute bottom-[-50px] left-[-50px] w-48 h-48 bg-[#FFDD02] rounded-full blur-3xl opacity-20 pointer-events-none"></div>

              <div className="mb-4 md:mb-6 border-b border-[#F8F4E1]/20 pb-4 relative z-10">
                <span className="text-[10px] md:text-xs font-bold text-[#FFDD02] tracking-widest block mb-2 uppercase">WILAYAH TERPILIH PADA PETA</span>
                <h3 className="text-xl md:text-2xl font-bold text-[#F8F4E1] flex items-center gap-2">
                  📍 {selectedMapRegion}
                </h3>
                <p className="text-xs md:text-sm text-[#F8F4E1]/80 mt-1">Ditemukan {mapRegionData.length} destinasi unggulan</p>
              </div>

              {/* Area Daftar Kartu Glassmorphism (Scrollable) */}
              <div className="flex-1 overflow-y-auto pr-2 md:pr-3 space-y-3 md:space-y-4 custom-scrollbar relative z-10 pb-4">
                {mapRegionData.map((wisata) => (
                  <div 
                    key={`map-list-${wisata.id}`}
                    onClick={() => setSelectedWisata(wisata)}
                    className="glassmorphism hover:glassmorphism-dark p-3 md:p-4 rounded-xl md:rounded-2xl cursor-pointer transition-all duration-300 flex items-center gap-3 md:gap-4 group hover:translate-x-1"
                  >
                    {/* Thumbnail Bulat dengan Gambar Asli */}
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#128C3E] flex-shrink-0 flex items-center justify-center text-[8px] text-[#F8F4E1] font-bold text-center shadow-inner group-hover:scale-105 transition-transform overflow-hidden">
                      <img src={wisata.image} alt={wisata.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Teks Informasi */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[#F8F4E1] font-bold text-xs md:text-sm truncate group-hover:text-[#FFDD02] transition-colors">{wisata.name}</h4>
                        <div className="flex items-center gap-0.5 flex-shrink-0 ml-2 bg-[#F8F4E1]/10 px-2 py-0.5 rounded-full">
                          <span className="text-[#FFDD02] font-bold text-[10px] md:text-xs">{wisata.rate}</span>
                          <span className="text-[#FFDD02] text-[10px] md:text-xs">★</span>
                        </div>
                      </div>
                      <span className="text-[9px] md:text-[10px] bg-[#128C3E]/50 text-[#F8F4E1] px-2 py-0.5 rounded-md inline-block mb-1">{wisata.kategori}</span>
                      <p className="text-[#F8F4E1]/70 text-[10px] md:text-xs line-clamp-1 italic">
                        {wisata.desc}
                      </p>
                    </div>
                  </div>
                ))}
                
                {mapRegionData.length === 0 && (
                  <div className="text-center mt-10 opacity-60">
                    <p className="text-[#F8F4E1] text-xs md:text-sm">Belum ada destinasi di sistem untuk wilayah ini.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
        {/* ========================================= */}

        {/* Pop Up Detail Wisata Modal */}
        {selectedWisata && (
          <DetailWisataModal 
            wisata={selectedWisata} 
            onClose={() => setSelectedWisata(null)} 
          />
        )}

      </div>

      {/* Footer Wisata Profesional & Modern Terpisah */}
      <FooterWisata />
    </>
  );
};

export default WisataPage;