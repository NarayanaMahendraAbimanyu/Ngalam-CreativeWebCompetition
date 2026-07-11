import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "ngalam_chat_history";
const API_KEY_STORAGE = "ngalam_api_key";
const WELCOME_MESSAGE = {
  text: "Halo! Saya Ngalam Chat, Tour Guide AI pribadi Anda. Ada destinasi wisata atau budaya yang ingin Anda jelajahi di Malang hari ini?",
  isBot: true,
};

const getLocalResponse = (query) => {
  const q = query.toLowerCase();

  // Priority 1: Identity & Greetings (anda siapa, kamu siapa, halo)
  if (q.includes("siapa") || q.includes("nama") || q.includes("bot") || q.includes("ai")) {
    return "Halo! Perkenalkan, saya adalah Asisten Virtual Tour Guide Ngalam. Saya dirancang khusus untuk memandu Anda menjelajahi keindahan destinasi wisata, kelezatan kuliner, dan kekayaan budaya di Kota Malang dan sekitarnya. Apa yang bisa saya bantu hari ini?";
  }
  else if (q.match(/\b(halo|hai|pagi|siang|sore|malam|hi)\b/)) {
    return "Halo! Selamat datang di layanan Ngalam Chat. Saya adalah Asisten Virtual Pariwisata Anda. Ada informasi mengenai wisata, kuliner, atau kebudayaan Kota Malang yang ingin Anda eksplorasi hari ini?";
  }

  // Priority 2: Top Recommendations (paling, rekomendasi, terbaik, hits)
  else if (q.includes("paling") || q.includes("rekomendasi") || q.includes("terbaik") || q.includes("hits") || q.includes("wajib")) {
    return "Untuk rekomendasi wisata terbaik di Malang, Anda wajib mengunjungi kawasan Gunung Bromo untuk pemandangan alam yang spektakuler, Jatim Park Group di Batu untuk wisata edukasi dan keluarga, serta Kampung Warna-warni Jodipan untuk spot foto yang sangat ikonis. Apakah Anda lebih menyukai wisata alam atau wisata taman hiburan?";
  }

  // Priority 3: Culinary & Food (kuliner, makan, enak, lapar, kafe)
  else if (q.includes("kuliner") || q.includes("makan") || q.includes("enak") || q.includes("lapar") || q.includes("minum") || q.includes("bakso")) {
    return "Tentu, Kota Malang adalah surga bagi para pencinta kuliner! Hidangan legendaris yang sangat saya rekomendasikan adalah Bakso President yang otentik, Rawon Brintik dengan kuah rempah pekat, serta Cwie Mie Malang. Jangan lupa juga mencicipi sejuknya udara Malang sambil menikmati kopi di berbagai kafe estetis di daerah Sudimoro atau Suhat.";
  }

  // Priority 4: Nature & Beaches (alam, pantai, gunung, air terjun)
  else if (q.includes("pantai") || q.includes("gunung") || q.includes("alam") || q.includes("air terjun") || q.includes("coban")) {
    return "Kekayaan alam Malang sangat luar biasa. Di wilayah Malang Selatan, Anda bisa menemukan deretan pantai eksotis seperti Pantai Balekambang dan Pantai Goa Cina. Untuk wisata pegunungan dan air terjun, kawasan Batu dan Pujon menawarkan Air Terjun Coban Rondo yang memukau serta paralayang di Gunung Banyak.";
  }

  // Priority 5: History, Culture, and Education (sejarah, budaya, candi, museum)
  else if (q.includes("sejarah") || q.includes("budaya") || q.includes("candi") || q.includes("museum")) {
    return "Malang memiliki nilai sejarah yang sangat dalam. Anda dapat menelusuri masa kejayaan kerajaan masa lampau di Candi Singosari, Candi Badut, atau mempelajari sejarah militer di Museum Brawijaya. Malang juga sangat terkenal dengan peninggalan arsitektur kolonial Belanda yang masih terawat dengan baik di sepanjang Jalan Ijen.";
  }

  // Priority 6: Generic Malang Catch-all
  else if (q.includes("malang") || q.includes("kota")) {
    return "Kota Malang merupakan kota terbesar kedua di Jawa Timur yang terkenal dengan udaranya yang sejuk dan lingkungannya yang asri. Dikenal sebagai Kota Pendidikan dan Kota Pariwisata, Malang selalu menawarkan kenangan indah bagi siapa saja yang berkunjung. Ada hal spesifik yang ingin Anda ketahui?";
  }

  // Default Fallback - Polite and professional guiding
  else {
    return "Mohon maaf, pertanyaan Anda mungkin terlalu spesifik dan belum ada dalam catatan saya. Namun, sebagai Tour Guide Anda, saya siap memberikan informasi seputar tempat wisata hits, rekomendasi kuliner legendaris, dan panduan budaya di Kota Malang. Boleh saya bantu dengan merekomendasikan destinasi wisata populer untuk Anda?";
  }
};

const getInitialMessages = () => {
  if (typeof window === "undefined") return [WELCOME_MESSAGE];

  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return [WELCOME_MESSAGE];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length ? parsed : [WELCOME_MESSAGE];
  } catch {
    return [WELCOME_MESSAGE];
  }
};

export default function NgalamChat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState(() => getInitialMessages());
  const [apiKey, setApiKey] = useState(
    () => (typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_KEY : '') || localStorage.getItem(API_KEY_STORAGE) || ''
  );
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(chatMessages));
    } catch {
      // Ignore storage quota / privacy mode issues.
    }
  }, [chatMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isChatOpen]);

  const handleSaveKey = (e) => {
    e.preventDefault();
    const inputKey = e.target.keyInput.value.trim();
    if (inputKey) {
      localStorage.setItem(API_KEY_STORAGE, inputKey);
      setApiKey(inputKey);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = chatInput.trim();
    if (!userMessage) return;

    setChatMessages(prev => [...prev, { text: userMessage, isBot: false }, { text: "...", isBot: true, isLoading: true }]);
    setChatInput('');
    setIsLoading(true);

    const updateLastMessage = (reply, isError = false) => {
      setChatMessages(prev => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].isLoading) {
          updated[updated.length - 1] = { text: reply, isBot: true, isLoading: false, isError };
        } else {
          updated.push({ text: reply, isBot: true, isError });
        }
        return updated;
      });
    };

    const resolvedKey = import.meta.env.VITE_API_KEY || localStorage.getItem(API_KEY_STORAGE);

    if (!resolvedKey) {
      updateLastMessage("API Key belum terkonfigurasi. Silakan periksa file .env Anda.");
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': resolvedKey },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Anda adalah Tour Guide Virtual Kota Malang yang sangat sopan, ramah, dan asyik. Jawablah pertanyaan dengan jelas, padat, dan informatif. ATURAN MUTLAK: SANGAT DILARANG KERAS menggunakan format Markdown seperti tanda bintang (*), cetak tebal, hashtag, atau bullet points. Gunakan paragraf biasa.\n\nPertanyaan User: ${userMessage}`
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error("API error");
      }

      const data = await response.json();
      const botReply = data.candidates[0].content.parts[0].text;
      updateLastMessage(botReply);

    } catch (error) {
      console.error("DEBUG_API_ERROR:", error);
      const localReply = getLocalResponse(userMessage);
      updateLastMessage(localReply);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Chat Window */}
      <div className={`absolute bottom-20 right-0 w-[350px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="bg-[#14532d] p-4 flex justify-between items-center text-white">
          <div className="flex flex-col">
            <span className="font-bold text-lg flex items-center gap-2">Ngalam Chat</span>
            <span className="text-xs text-emerald-200 flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Online Tour Guide AI</span>
          </div>
          <button onClick={() => setIsChatOpen(false)} className="hover:text-gray-300 transition-colors font-bold text-xl">✕</button>
        </div>

        {/* Chat Body */}
        <div className="h-80 bg-gray-50 p-4 overflow-y-auto flex flex-col gap-4">
          {!apiKey ? (
            <div className="bg-[#F8F4E1] border-l-4 border-[#128C3E] p-4 rounded shadow-sm text-sm">
              <h3 className="font-bold text-[#543310] mb-2">🔐 Autentikasi Diperlukan</h3>
              <p className="text-[#543310]/80 mb-4">
                Sistem mendeteksi Anda menggunakan versi lokal. Silakan masukkan API Key Gemini Anda untuk mengaktifkan AI.
              </p>
              <form onSubmit={handleSaveKey} className="flex flex-col gap-2">
                <input
                  name="keyInput"
                  type="password"
                  placeholder="Paste API Key di sini..."
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#128C3E]"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#128C3E] text-white font-bold py-2 rounded hover:bg-[#0e6b2f] transition-colors"
                >
                  Simpan & Aktifkan AI
                </button>
              </form>
            </div>
          ) : (
            <>
              {chatMessages.map((msg, index) => (
                <div key={index} className={`max-w-[85%] p-3 text-sm shadow-sm whitespace-pre-wrap ${msg.isBot ? 'bg-[#eef1e6] border border-emerald-100 text-[#14532d] rounded-2xl rounded-tl-none self-start' : 'bg-[#14532d] text-white rounded-2xl rounded-tr-none self-end'} ${msg.isLoading ? 'animate-pulse text-2xl tracking-widest pt-0 pb-1 font-black' : ''}`}>
                  {msg.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={!apiKey || isLoading}
            placeholder={!apiKey ? "Menunggu API Key..." : "Tanya destinasi wisata..."}
            className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#14532d] disabled:bg-gray-200"
          />
          <button type="submit" disabled={!apiKey || !chatInput.trim() || isLoading} className="bg-[#14532d] text-white p-2.5 rounded-full hover:bg-emerald-800 transition-colors disabled:bg-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>

      {/* Main Floating Action Button */}
      <button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-[#14532d] hover:bg-emerald-800 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-900/50 transition-all duration-300 hover:-translate-y-1">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      </button>
    </div>
  );
}
