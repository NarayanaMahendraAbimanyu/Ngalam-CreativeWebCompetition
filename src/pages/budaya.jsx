import React, { useState, useRef } from "react";
import DetailBudayaModal from "../components/DetailBudayaModal"; // Sesuaikan path jika berbeda
import { budayaData } from "../components/budayaData"; // PENTING: Ganti ke "budayaData" jika nama filemu budayaData.js
import Footer from "../components/footer"; // Footer jika ada, sesuaikan path

const heroSlides = [
  {
    title: "Tugu Malang",
    text: "Ikon kota yang menjadi titik temu, ruang berfoto, dan penanda identitas urban Malang yang terus hidup dari pagi hingga malam.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEqrA77bZYC4J_RZ8AjwUICQ9YibIoiX_-0fZahN8q2Q&s=10",
  },
  {
    title: "Alun-Alun Kota Malang",
    text: "Ruang publik yang hangat, dikelilingi ritme kota, tempat warga berkumpul, berjalan santai, dan menikmati suasana pusat kota.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC1y1lcrnVkYRrpXmQFWZQAzyUXu2oSYqRspDBT4jLJA&s=10",
  },
  {
    title: "Jatim Park",
    text: "Destinasi keluarga modern yang mempertemukan hiburan, edukasi, dan pengalaman rekreasi dalam satu kawasan wisata populer.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920",
  },
];

const budayaLetterImages = [
  "https://static.republika.co.id/uploads/images/xlarge/028717000-1647511644-1280-856.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXXzHp-Ez-9i09-u1O3FUhByLM_7JjytyXWdi6MiU78dh8Fbst4hS6dyM&s=10",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcKJztI8a0T81GXnnvVnlWMmJlQFx_T4HtpWvfvmHZ6evNlUHreOLEdE&s=10",
  "https://asset.kompas.com/crops/z78mzlTpqX_uMmItByGMogOXaHI=/140x0:983x562/750x500/data/photo/2022/11/23/637deff4a7743.jpg",
  "https://www.tournesia.com/blog/wp-content/uploads/2026/02/Pesona-Kota-Malang-Wisata-Sejarah-Kuliner-dan-Budaya.jpg",
  "https://cdn-1.timesmedia.co.id/images/2024/04/27/Pawai-Budaya-Kota-Malang-2.jpg",
];

// GAMBAR CADANGAN TERAMAN
const fallbackImg = "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1920";

export default function Budaya() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedBudaya, setSelectedBudaya] = useState(null);

  // === FITUR FILTER & SEARCH ===
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const safeBudayaData = Array.isArray(budayaData) ? budayaData : [];

  const categories = [...new Set(safeBudayaData.map(item => item?.category).filter(Boolean))];

  const filteredCards = safeBudayaData.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    const itemName = item?.name || "";
    const itemDesc = item?.shortDesc || "";
    const itemCat = item?.category || "";

    const matchesSearch = itemName.toLowerCase().includes(searchLower) || 
                          itemDesc.toLowerCase().includes(searchLower);
    const matchesCategory = filterCategory === "" || itemCat === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // === FITUR SLIDER HORIZONTAL SMOOTH ===
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  // Logic Hero Slider
  const currentHero = heroSlides[currentSlide];
  const goToPreviousSlide = () => setCurrentSlide((c) => (c - 1 + heroSlides.length) % heroSlides.length);
  const goToNextSlide = () => setCurrentSlide((c) => (c + 1) % heroSlides.length);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      
      {/* CSS Tambahan untuk menyembunyikan scrollbar bawaan browser tapi tetap bisa di-scroll */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Tinggi diset 115vh (Lebih besar dari layar agar bisa digradasi di bawahnya) */}
      <section className="relative isolate overflow-hidden min-h-[115vh] w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1920')] bg-cover bg-center">
        
        {/* Lapis 1: Overlay hitam 50% rata */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Lapis 2: Gradasi hanya di 25% area dari dasar ke atas untuk menyatu dengan background bawahnya */}
        <div className="absolute bottom-0 left-0 w-full h-[25vh] bg-gradient-to-t from-[#F8F4E1] via-[#F8F4E1]/90 to-transparent pointer-events-none z-0" />
        
        {/* Konten Hero */}
        <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 px-8 md:px-24 pb-16 items-center">
          
          {/* PERUBAHAN: POSISI SLIDER SEKARANG DI KIRI (Atas pada mobile, Kiri pada Desktop) */}
          <div className="relative min-w-0">
            <div className="relative h-[350px] md:h-[450px] w-full overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
              <img key={currentSlide} src={currentHero.image} alt={currentHero.title} className="h-full w-full object-cover transition-opacity duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <button type="button" onClick={goToPreviousSlide} className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/80 hover:bg-emerald-500 text-white shadow-lg transition-colors">‹</button>
              <button type="button" onClick={goToNextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500/80 hover:bg-emerald-500 text-white shadow-lg transition-colors">›</button>
              <div className="absolute bottom-5 left-5 right-5 md:right-auto md:max-w-[85%] rounded-2xl border border-white/15 bg-black/40 p-5 backdrop-blur-md">
                <p className="text-2xl font-black text-white mb-1">{currentHero.title}</p>
                <p className="text-sm text-gray-300 leading-relaxed">{currentHero.text}</p>
              </div>
            </div>
          </div>

          {/* PERUBAHAN: POSISI TEKS BUDAYA SEKARANG DI KANAN */}
          <div className="min-w-0">
            {/* Ukuran teks dihitung matang agar pas di kontainernya tanpa membentur gambar sebelah */}
            <div className="flex flex-row flex-nowrap w-full justify-between font-black uppercase tracking-tighter leading-none mb-4 text-[16vw] sm:text-[6rem] lg:text-[4.5rem] xl:text-[6rem] 2xl:text-[7.5rem]">
              {['B', 'U', 'D', 'A', 'Y', 'A'].map((char, i) => (
                <span key={i} style={{ backgroundImage: `url('${budayaLetterImages[i]}')`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundSize: "cover", backgroundPosition: "center" }}>{char}</span>
              ))}
            </div>
            <p className="text-gray-200 text-lg md:text-xl max-w-2xl mt-2 mb-6 drop-shadow-md">💡 <strong className="text-emerald-400">Fun Fact:</strong> Tahukah kamu? Malang dijuluki sebagai "Parijs van Oost-Java" karena tata kotanya yang indah.</p>
          </div>

        </div>
      </section>

      <section className="w-full bg-[#F8F4E1] py-24 px-8 md:px-24 flex flex-col items-center relative z-20">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-8">Lebih dari sekadar kota. <br/><span className="text-emerald-700">Ini adalah Ngalam.</span></h2>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed">Titik temu sempurna antara warisan peradaban masa lalu, sejuknya udara pegunungan, dan inovasi pendidikan masa depan. Temukan alasan mengapa jutaan orang jatuh cinta pada kota ini.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mb-24">
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-emerald-900/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center">
            <span className="text-6xl mb-6">🏛️</span>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Abad ke-8</h3>
            <p className="text-gray-500 font-medium">Jejak sejarah panjang dari era Kerajaan Kanjuruhan hingga kolonial.</p>
          </div>
          <div className="bg-[#14532d] text-white rounded-[2rem] p-10 shadow-2xl flex flex-col justify-center items-center text-center transform md:-translate-y-6 hover:scale-105 transition-all duration-500">
            <span className="text-6xl mb-6">⛰️</span>
            <h3 className="text-5xl font-black text-emerald-400 mb-3">440<span className="text-2xl font-medium text-white"> mdpl</span></h3>
            <p className="text-emerald-50 text-lg">Ketinggian rata-rata yang menyajikan udara sejuk pegunungan sepanjang tahun.</p>
          </div>
          <div className="bg-white rounded-[2rem] p-10 shadow-sm border border-emerald-900/5 hover:shadow-xl transition-all duration-300 flex flex-col justify-center items-center text-center">
            <span className="text-6xl mb-6">🎓</span>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">80+ Kampus</h3>
            <p className="text-gray-500 font-medium">Pusat pendidikan, vokasi, dan inovasi generasi muda di Jawa Timur.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl">
          <div className="relative h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Singhasari_temple.jpg/800px-Singhasari_temple.jpg" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sejarah" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h4 className="text-3xl font-bold text-white mb-2">Pusat Peradaban</h4>
              <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">Menyimpan kekayaan candi dan peninggalan prasejarah yang megah.</p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg">
            <img src="https://images.unsplash.com/photo-1582650811985-e117498c474e?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Urban" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-10">
              <h4 className="text-3xl font-bold text-white mb-2">Harmoni Urban</h4>
              <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">Perpaduan tata kota yang dinamis dengan pelestarian budaya lokal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8F4E1] py-24 px-4 md:px-12 relative">
        <h2 className="text-4xl md:text-5xl font-bold text-[#543310] text-center mb-6">Kekayaan Budaya Kota <span className="text-[#128C3E]">Malang</span></h2>
        <p className="text-gray-600 text-center max-w-4xl mx-auto mb-10 text-lg leading-relaxed px-4">Menelusuri jejak warisan leluhur yang tak lekang oleh waktu. Dari seni pertunjukan yang memukau hingga situs sejarah yang megah, mari selami lebih dalam identitas dan pusat peradaban yang membentuk jiwa masyarakat Jawa Timur.</p>

        {/* BOX FITUR FILTER & SEARCH (GLASSMORPHISM) */}
        <div className="max-w-4xl mx-auto w-full mb-12 px-4 relative z-10">
          <div className="border-[#128C3E]/40 backdrop-blur-md border bg-[#543310] p-4 md:p-6 rounded-[2rem] shadow-xl flex flex-col md:flex-row items-center gap-4 transition-all duration-300">
            {/* Input Search */}
            <input 
              type="text"
              placeholder="🔍 Cari budaya, tradisi, atau kesenian..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:flex-1 px-6 py-3.5 rounded-full bg-white/70 text-[#543310] font-medium outline-none placeholder-[#543310]/60 shadow-inner border border-[#128C3E]/20 focus:border-[#128C3E]/50 transition-colors"
            />
            
            {/* Dropdown Filter Kategori */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full md:w-auto px-6 py-3.5 rounded-full bg-white/70 text-[#543310] font-bold outline-none shadow-inner border border-[#128C3E]/20 cursor-pointer focus:border-[#128C3E]/50 transition-colors"
            >
              <option value="">🏷️ Semua Kategori</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* CONTAINER SLIDER BUDAYA */}
        <div className="relative w-full max-w-[1400px] mx-auto group">
          
          {/* Tombol Kiri */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 md:-left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-[#128C3E] text-[#F8F4E1] rounded-full shadow-2xl flex items-center justify-center hover:bg-[#0e6e30] transition-all transform hover:scale-110 opacity-90 hover:opacity-100 border-2 border-[#F8F4E1]"
            aria-label="Geser Kiri"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Wrapper Carousel */}
          {filteredCards && filteredCards.length > 0 ? (
            <div 
              ref={sliderRef} 
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar py-8 px-4 md:px-10"
            >
              {filteredCards.map((item, index) => {
                return (
                  <article 
                    key={item?.id || index} 
                    className="w-[85vw] md:w-[350px] min-w-[280px] max-w-[350px] flex-none snap-center bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#128C3E]/10 flex flex-col overflow-hidden"
                  >
                    <div className="relative w-full h-60 overflow-hidden group/card">
                      <img 
                        src={item?.image || fallbackImg} 
                        alt={item?.name || "Foto"}
                        referrerPolicy="no-referrer" 
                        onError={(e) => {
                          e.target.onerror = null; // Mencegah infinite loop
                          e.target.src = fallbackImg; // Ganti ke gambar cadangan Tugu Malang
                        }}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                      />
                      <div className="absolute top-4 left-4 bg-[#FFDD02] text-[#543310] text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md backdrop-blur-sm bg-opacity-90">
                        {item?.category || "Umum"}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow bg-gradient-to-b from-white to-[#F8F4E1]/30">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight line-clamp-2">{item?.name || "Tanpa Judul"}</h3>
                      <p className="text-gray-600 text-sm mb-6 flex-grow line-clamp-3 leading-relaxed">{item?.shortDesc || "-"}</p>
                      <button 
                        onClick={() => setSelectedBudaya(item)} 
                        className="mt-auto bg-[#128C3E]/10 text-[#128C3E] hover:bg-[#128C3E] hover:text-[#F8F4E1] font-bold py-3 px-4 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2"
                      >
                        Pelajari Lebih Lanjut ➔
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            // Pesan jika pencarian/filter tidak menemukan hasil
            <div className="py-20 text-center w-full">
              <span className="text-6xl mb-4 block">🧐</span>
              <h3 className="text-2xl font-bold text-[#543310] mb-2">Budaya tidak ditemukan</h3>
              <p className="text-[#543310]/70">Coba ubah kata kunci pencarian atau kategori filter Anda.</p>
            </div>
          )}

          {/* Tombol Kanan */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 bg-[#128C3E] text-[#F8F4E1] rounded-full shadow-2xl flex items-center justify-center hover:bg-[#0e6e30] transition-all transform hover:scale-110 opacity-90 hover:opacity-100 border-2 border-[#F8F4E1]"
            aria-label="Geser Kanan"
          >
            <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
        </div>
      </section>

      <Footer/>

      {/* Render komponen Modal Eksternal jika ada Budaya yang dipilih */}
      <DetailBudayaModal 
        budaya={selectedBudaya} 
        onClose={() => setSelectedBudaya(null)} 
      />

    </div>
  );
}