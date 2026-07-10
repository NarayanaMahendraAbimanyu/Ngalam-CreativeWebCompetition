import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NgalamChat from '../components/NgalamChat';
// Logically separating data - adjust path based on your folder structure
import { kulinerData, categories, regionGroups } from '../../kulinerData';

export default function Kuliner() {
  const [selectedCategory, setSelectedCategory] = useState("Kuliner yang lagi viral!");
  const [selectedRegions, setSelectedRegions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRegionToggle = (region) => {
    setSelectedRegions(prev =>
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const filteredData = useMemo(() => {
    return kulinerData.filter(item => {
      const matchCategory = item.category === selectedCategory;
      const matchRegion = selectedRegions.length === 0 || selectedRegions.includes(item.region);
      return matchCategory && matchRegion;
    });
  }, [selectedCategory, selectedRegions]);

  return (
    <div className="min-h-screen bg-[#F8F4E1] font-['Poppins',sans-serif] flex flex-col text-[#543310]">
      <Navbar/>

      {/* MAIN LAYOUT: PORSCHE AESTHETIC - NGALAM SCALED */}
      <main className="flex-grow max-w-[1300px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex flex-col lg:flex-row gap-10 lg:gap-14">

        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-32 h-fit space-y-8">
          <div>
            <h1 className="text-3xl font-black text-[#543310] mb-1 tracking-tight">Menu overview</h1>
            <p className="text-base text-[#543310]/70 mb-6 font-light">Configure your dream culinary</p>

            <h3 className="font-bold text-lg mb-3 border-b border-[#543310]/10 pb-2">Kategori Kuliner</h3>
            <ul className="space-y-3">
              {categories.map(cat => {
                const isViral = cat === "Kuliner yang lagi viral!";
                const isSelected = selectedCategory === cat;
                return (
                  <li key={cat} className="flex items-center">
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-3 w-full text-left transition-all ${isViral ? "font-black" : "font-medium"}`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'border-[#128C3E]' : 'border-[#543310]/30'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 bg-[#128C3E] rounded-full"></div>}
                      </div>
                      <span className={`${isSelected ? 'text-[#543310]' : 'text-[#543310]/60'} ${isViral && isSelected ? 'text-[#128C3E] text-base' : 'text-sm'}`}>
                        {cat} {isViral && "🔥"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 border-b border-[#543310]/10 pb-2">Filter Wilayah</h3>
            <div className="space-y-6">
              {Object.entries(regionGroups).map(([groupName, regions]) => (
                <div key={groupName}>
                  <h4 className="text-xs font-bold text-[#543310]/50 uppercase tracking-widest mb-2">{groupName}</h4>
                  <ul className="space-y-2">
                    {regions.map(region => (
                      <li key={region} className="flex items-center gap-3 hover:bg-white/40 p-1 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          id={region}
                          checked={selectedRegions.includes(region)}
                          onChange={() => handleRegionToggle(region)}
                          className="w-4 h-4 accent-[#128C3E] rounded border-[#543310]/30 cursor-pointer transition-all"
                        />
                        <label htmlFor={region} className={`cursor-pointer w-full text-sm ${selectedRegions.includes(region) ? 'text-[#543310] font-bold' : 'text-[#543310]/70 font-medium'}`}>
                          {region}
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT CONTENT - SCALED DOWN CARDS */}
        <section className="w-full lg:w-3/4">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#543310] mb-6 border-b border-[#543310]/10 pb-3">
            {selectedCategory}
          </h2>

          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-[#543310]/5">
              <span className="text-5xl mb-3">🍽️</span>
              <p className="text-[#543310]/60 text-lg font-medium">Belum ada data kuliner di wilayah ini.</p>
              <button onClick={() => setSelectedRegions([])} className="mt-3 text-[#128C3E] font-bold underline hover:opacity-80">Reset Filter Wilayah</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {filteredData.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-[#543310]/5 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">

                  {/* TIGHTER IMAGE HEIGHT & REFERRER FIX */}
                  <div className="h-48 sm:h-56 overflow-hidden relative bg-gray-100 flex items-center justify-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {e.target.src = "https://placehold.co/600x400/F8F4E1/128C3E?text=Gambar+Gagal+Dimuat"}}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    {item.category === "Kuliner yang lagi viral!" && (
                      <span className="absolute top-3 left-3 bg-[#e11d48] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                        VIRAL
                      </span>
                    )}
                  </div>

                  {/* TIGHTER PADDING & SMALLER FONTS */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-xl font-black text-[#543310] mb-4 tracking-tight">{item.name}</h3>

                    <div className="flex justify-between items-center border-t border-b border-[#543310]/10 py-3 mb-5">
                      <div>
                        <p className="text-[9px] text-[#543310]/50 uppercase tracking-widest font-bold mb-0.5">Rating</p>
                        <p className="font-black text-lg text-[#543310]">{item.rating} <span className="text-[#FFDD02]">★</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] text-[#543310]/50 uppercase tracking-widest font-bold mb-0.5">Harga</p>
                        <p className="font-black text-lg text-[#128C3E]">{item.price}</p>
                      </div>
                    </div>

                    <div className="mt-auto flex flex-col sm:flex-row gap-2">
                      <a
                        href={`https://gofood.co.id/id/malang/restaurants?search=${encodeURIComponent(item.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#128C3E] text-white py-2.5 rounded-lg text-sm font-bold hover:bg-[#0e6b2f] transition-colors shadow-sm active:scale-95 text-center flex items-center justify-center"
                      >
                        Pesan Sekarang
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Malang')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-transparent text-[#543310] border border-[#543310]/20 py-2.5 rounded-lg text-sm font-bold hover:border-[#128C3E] hover:text-[#128C3E] hover:bg-[#F8F4E1] transition-all active:scale-95 text-center flex items-center justify-center"
                      >
                        Lihat di Maps
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      <NgalamChat/>
      <Footer/>
    </div>
  );
}
