import { useEffect, useMemo, useRef, useState } from "react";

const STORAGE_KEY = "ngalam_chat_history";
const WELCOME_MESSAGE = {
  text: "Halo! Saya Ngalam Chat, Tour Guide AI pribadi Anda. Ada destinasi wisata atau budaya yang ingin Anda jelajahi di Malang hari ini?",
  isBot: true,
};

const GEMINI_MODEL = "gemini-2.0-flash";
const OPENAI_MODEL = "gpt-4o-mini";

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

  const hasMessages = useMemo(() => chatMessages.length > 0, [chatMessages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = chatInput;

    // Instantly append user message and the animated pulse placeholder
    setChatMessages(prev => [
      ...prev,
      { text: userMessage, isBot: false },
      { text: "...", isBot: true, isLoading: true }
    ]);
    setChatInput("");

    try {
    // 1. Ultra-safe check for environment variables across Vite and CRA
    const apiKey = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.VITE_OPENAI_API_KEY)) || (typeof process !== 'undefined' && process.env && process.env.REACT_APP_API_KEY);

    // 2. Failsafe for GitHub Collaborators
    if (!apiKey) {
      setChatMessages(prev => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].isLoading) {
          updated[updated.length - 1] = {
            text: "⚠️ Peringatan Developer: API Key tidak ditemukan. Karena file .env otomatis diabaikan oleh GitHub (gitignore), Anda harus meminta isi file .env kepada developer utama dan meletakkannya di folder root komputer Anda agar chatbot ini berfungsi.",
            isBot: true,
            isLoading: false
          };
        }
        return updated;
      });
      return; // Stop execution to prevent fetch crash
    }

    const systemPrompt = "Anda adalah Ngalam Chat, Asisten AI Cerdas dan Pemandu Wisata resmi Kota Malang. Pengetahuan Anda mencakup lokasi geografi, pariwisata, sejarah, budaya, kuliner, dan prestasi Kota Malang. ATURAN WAJIB FORMAT & GAYA BAHASA: 1. Jawab SELALU dengan Bahasa Indonesia baku yang sangat sopan, ramah, dan profesional. 2. DILARANG menggunakan bahasa gaul/kasar. 3. FORMAT TEKS: Berikan jawaban yang ringkas dan mudah dibaca. Gunakan paragraf pendek. SELALU berikan jarak/enter ganda antar poin atau paragraf. JANGAN menggunakan simbol markdown berlebihan seperti asterisk ganda untuk bold, gunakan penomoran biasa (1, 2, 3) yang rapi. 4. Jangan menolak pertanyaan dasar.";

      let aiResponse = "";

      // 🚨 AGENT: IMPLEMENT THE CORRECT FETCH BLOCK BASED ON .env 🚨

      // --- OPTION B: IF USING GOOGLE GEMINI ---
      // const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.REACT_APP_GEMINI_API_KEY;
      // if (!apiKey) {
      //   throw new Error("VITE_GEMINI_API_KEY is not defined in the environment.");
      // }

      // Try multiple models in order of preference to guarantee a response (bulletproof)
      const models = ["gemini-2.5-flash-lite", "gemini-2.5-flash", GEMINI_MODEL, "gemini-2.0-flash-lite"];
      let lastFetchError = null;

      for (const model of models) {
        try {
          console.log(`Attempting to fetch using model: ${model}`);
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${systemPrompt}\n\nPertanyaan Pengguna: ${userMessage}` }] }]
            })
          });

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
          }

          const data = await response.json();
          const textResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textResponse) {
            aiResponse = textResponse;
            console.log(`Successfully retrieved response using model: ${model}`);
            break;
          } else {
            throw new Error("Response was received but text content was empty/null.");
          }
        } catch (err) {
          lastFetchError = err;
          console.error(`Gemini fetch failed for model ${model}:`, err);
        }
      }

      if (!aiResponse) {
        throw lastFetchError || new Error("Failed to generate response from all attempted Gemini models.");
      }

      if (!aiResponse) aiResponse = "Mohon maaf, saya belum menemukan data yang spesifik mengenai hal tersebut. Bisa tolong ceritakan lebih detail?";

      // Replace "..." with the real response
      setChatMessages(prev => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].isLoading) {
          updated[updated.length - 1] = { text: aiResponse, isBot: true, isLoading: false };
        }
        return updated;
      });

      } catch (error) {
    console.error("Chatbot Error:", error);
    setChatMessages(prev => {
      const updated = [...prev];
      if (updated.length > 0 && updated[updated.length - 1].isLoading) {

        // Custom Developer Error for missing GitHub .env
        if (error.message === "MISSING_ENV_KEY") {
          updated[updated.length - 1] = {
            text: "⚠️ SISTEM DEV: API Key tidak ditemukan. Jika Anda baru melakukan PULL dari GitHub, minta file `.env` ke developer utama dan letakkan di folder root project Anda.",
            isBot: true,
            isLoading: false
          };
        } else {
          // Standard Network Error
          updated[updated.length - 1] = {
            text: "Mohon maaf, koneksi jaringan saya ke server pusat sedang mengalami gangguan singkat. Sila kirim ulang pertanyaan Anda ya, Sam. 🙏",
            isBot: true,
            isLoading: false
          };
        }
      }
      return updated;
    });
  }};

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
          {chatMessages.map((msg, index) => (
            <div key={index} className={`max-w-[85%] p-3 text-sm shadow-sm whitespace-pre-wrap ${msg.isBot ? 'bg-[#eef1e6] border border-emerald-100 text-[#14532d] rounded-2xl rounded-tl-none self-start' : 'bg-[#14532d] text-white rounded-2xl rounded-tr-none self-end'} ${msg.isLoading ? 'animate-pulse text-2xl tracking-widest pt-0 pb-1 font-black' : ''}`}>
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
          {!hasMessages ? null : null}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
          <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Tanya destinasi wisata..." className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#14532d]" />
          <button type="submit" className="bg-[#14532d] text-white p-2.5 rounded-full hover:bg-emerald-800 transition-colors">
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
