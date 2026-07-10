import React, { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NgalamChat from '../components/NgalamChat';

// 1. MASSIVE CULINARY DATA (HARDCODED - DO NOT REDUCE THIS LIST)
const kulinerData = [
  { id: 1, name: "Bakso President", category: "Kuliner yang lagi viral!", region: "Klojen", price: "Rp 20.000 - 50.000", rating: "4.8/5", image: "[https://images.unsplash.com/photo-1555126634-aca20917711f?w=800&q=80](https://images.unsplash.com/photo-1555126634-aca20917711f?w=800&q=80)" },
  { id: 2, name: "Rawon Tessy", category: "Makanan Berat", region: "Klojen", price: "Rp 25.000", rating: "4.7/5", image: "[https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80](https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80)" },
  { id: 3, name: "Pos Ketan Legenda", category: "Kuliner yang lagi viral!", region: "Batu", price: "Rp 15.000 - 25.000", rating: "4.9/5", image: "[https://images.unsplash.com/photo-1528669826296-dbd6f6412b11?w=800&q=80](https://images.unsplash.com/photo-1528669826296-dbd6f6412b11?w=800&q=80)" },
  { id: 4, name: "Cwie Mie Gloria", category: "Makanan Basah", region: "Blimbing", price: "Rp 18.000", rating: "4.6/5", image: "[https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80](https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80)" },
  { id: 5, name: "Putu Lanang Celaket", category: "Cemilan", region: "Lowokwaru", price: "Rp 15.000", rating: "4.8/5", image: "[https://images.unsplash.com/photo-1541529086526-db283c524316?w=800&q=80](https://images.unsplash.com/photo-1541529086526-db283c524316?w=800&q=80)" },
  { id: 6, name: "Pecel Kawi", category: "Makanan Berat", region: "Klojen", price: "Rp 15.000", rating: "4.7/5", image: "[https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=800&q=80](https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=800&q=80)" },
  { id: 7, name: "Sego Resek Kasin", category: "Kuliner yang lagi viral!", region: "Klojen", price: "Rp 12.000 - 20.000", rating: "4.8/5", image: "[https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80](https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80)" },
  { id: 8, name: "Bakso Bakar Pahlawan Trip", category: "Makanan Basah", region: "Klojen", price: "Rp 25.000", rating: "4.7/5", image: "[https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=800&q=80](https://images.unsplash.com/photo-1564834724105-918b73d1b9e0?w=800&q=80)" },
  { id: 9, name: "Toko Oen Ice Cream", category: "Cemilan", region: "Klojen", price: "Rp 35.000", rating: "4.6/5", image: "[https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80](https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=800&q=80)" },
  { id: 10, name: "Sate Kelinci Batu", category: "Makanan daerah", region: "Batu", price: "Rp 30.000", rating: "4.5/5", image: "[https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80](https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80)" },
  { id: 11, name: "Orem-Orem Arema", category: "Makanan daerah", region: "Lowokwaru", price: "Rp 10.000", rating: "4.7/5", image: "[https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80](https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80)" },
  { id: 12, name: "Angsle & Ronde Titoni", category: "Cemilan", region: "Klojen", price: "Rp 12.000", rating: "4.8/5", image: "[https://images.unsplash.com/photo-1541529086526-db283c524316?w=800&q=80](https://images.unsplash.com/photo-1541529086526-db283c524316?w=800&q=80)" },
  { id: 13, name: "Warung Sate Gebug", category: "Makanan Berat", region: "Klojen", price: "Rp 35.000", rating: "4.8/5", image: "[https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=800&q=80](https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=800&q=80)" },
  { id: 14, name: "Bakso Cak Man", category: "Kuliner yang lagi viral!", region: "Blimbing", price: "Rp 25.000 - 40.000", rating: "4.6/5", image: "[https://images.unsplash.com/photo-1555126634-aca20917711f?w=800&q=80](https://images.unsplash.com/photo-1555126634-aca20917711f?w=800&q=80)" },
  { id: 15, name: "Depot Hok Lay", category: "Cemilan", region: "Klojen", price: "Rp 20.000", rating: "4.7/5", image: "[https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80](https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80)" },
  { id: 16, name: "Pecel Pitik Kemangi", category: "Makanan daerah", region: "Dau", price: "Rp 18.000", rating: "4.6/5", image: "[https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80](https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800&q=80)" },
  { id: 17, name: "Mie Gajah Mada", category: "Makanan Basah", region: "Klojen", price: "Rp 22.000", rating: "4.7/5", image: "[https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80](https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80)" },
  { id: 18, name: "Warung Tangkilsari", category: "Makanan Berat", region: "Kepanjen", price: "Rp 25.000", rating: "4.5/5", image: "[https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=800&q=80](https://images.unsplash.com/photo-1548943487-a2e4e43b4850?w=800&q=80)" }
];

const categories = ["Kuliner yang lagi viral!", "Makanan Basah", "Makanan Berat", "Cemilan", "Makanan daerah"];

const regionGroups = {
  "Kota Malang": ["Klojen", "Blimbing", "Lowokwaru", "Sukun", "Kedungkandang"],
  "Kota Batu": ["Batu", "Bumiaji", "Junrejo"],
  "Kab. Malang": ["Kepanjen", "Singosari", "Lawang", "Dau"]
};

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
    <div className="min-h-screen bg-[#fafaf9] font-sans flex flex-col text-gray-900">
      <Navbar/>

      {/* MAIN LAYOUT: PORSCHE AESTHETIC */}
      <main className="flex-grow max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-16">

        {/* LEFT SIDEBAR */}
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-32 h-fit space-y-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Menu overview</h1>
            <p className="text-lg text-gray-500 mb-8 font-light">Configure your dream culinary</p>

            <h3 className="font-bold text-xl mb-4 border-b border-gray-200 pb-2">Kategori Kuliner</h3>
            <ul className="space-y-4">
              {categories.map(cat => {
                const isViral = cat === "Kuliner yang lagi viral!";
                const isSelected = selectedCategory === cat;
                return (
                  <li key={cat} className="flex items-center">
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-4 w-full text-left transition-all ${isViral ? "font-black" : "font-medium"}`}
                    >
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected ? 'border-[#14532d]' : 'border-gray-300'}`}>
                        {isSelected && <div className="w-3 h-3 bg-[#14532d] rounded-full"></div>}
                      </div>
                      <span className={`${isSelected ? 'text-gray-900' : 'text-gray-500'} ${isViral && isSelected ? 'text-[#14532d] text-lg' : ''}`}>
                        {cat} {isViral && "🔥"}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-xl mb-6 border-b border-gray-200 pb-2">Filter Wilayah</h3>
            <div className="space-y-8">
              {Object.entries(regionGroups).map(([groupName, regions]) => (
                <div key={groupName}>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">{groupName}</h4>
                  <ul className="space-y-3">
                    {regions.map(region => (
                      <li key={region} className="flex items-center gap-4 hover:bg-gray-50 p-1 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          id={region}
                          checked={selectedRegions.includes(region)}
                          onChange={() => handleRegionToggle(region)}
                          className="w-5 h-5 accent-[#14532d] rounded border-gray-300 cursor-pointer transition-all"
                        />
                        <label htmlFor={region} className={`cursor-pointer w-full text-base ${selectedRegions.includes(region) ? 'text-gray-900 font-bold' : 'text-gray-600 font-medium'}`}>
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

        {/* RIGHT CONTENT */}
        <section className="w-full lg:w-3/4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-4">
            {selectedCategory}
          </h2>

          {filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <span className="text-6xl mb-4">🍽️</span>
              <p className="text-gray-500 text-xl font-medium">Belum ada data kuliner di wilayah ini.</p>
              <button onClick={() => setSelectedRegions([])} className="mt-4 text-[#14532d] font-bold underline hover:text-emerald-700">Reset Filter Wilayah</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {filteredData.map(item => (
                <div key={item.id} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col group">

                  {/* Image Container with Fallback */}
                  <div className="h-64 sm:h-72 overflow-hidden relative bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {e.target.src = "[https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80](https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80)"}}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                    {item.category === "Kuliner yang lagi viral!" && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                        VIRAL
                      </span>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">{item.name}</h3>

                    <div className="flex justify-between items-center border-t border-b border-gray-100 py-4 mb-8">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Rating</p>
                        <p className="font-black text-xl text-gray-900">{item.rating}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Harga</p>
                        <p className="font-black text-xl text-[#14532d]">{item.price}</p>
                      </div>
                    </div>

                    {/* SUPER FUNCTIONAL ACTION BUTTONS */}
                    <div className="mt-auto flex flex-col sm:flex-row gap-3">
                      <a
                        href={`https://gofood.co.id/id/malang/restaurants?search=${encodeURIComponent(item.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-[#14532d] text-white py-3.5 rounded-xl font-bold hover:bg-emerald-900 transition-colors shadow-md active:scale-95 text-center flex items-center justify-center"
                      >
                        Pesan Sekarang
                      </a>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.name + ' Malang')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-transparent text-gray-900 border-2 border-gray-200 py-3.5 rounded-xl font-bold hover:border-gray-900 hover:bg-gray-50 transition-all active:scale-95 text-center flex items-center justify-center"
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
