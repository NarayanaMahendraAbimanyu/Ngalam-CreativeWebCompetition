import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "ngalam_chat_history";
const WELCOME_MESSAGE = {
  text: "Halo! Saya Ngalam Chat, Tour Guide AI pribadi Anda. Ada destinasi wisata atau budaya yang ingin Anda jelajahi di Malang hari ini?",
  isBot: true,
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

    const resolvedKey = import.meta.env.VITE_API_KEY;

    if (!resolvedKey) {
      updateLastMessage("API Key belum terkonfigurasi. Silakan periksa file .env Anda.");
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=' + resolvedKey;

      const systemPrompt = `Anda adalah Tour Guide Virtual Kota Malang yang sangat sopan, ramah, dan asyik. Jawablah pertanyaan dengan jelas, padat, dan informatif. ATURAN MUTLAK: SANGAT DILARANG KERAS menggunakan format Markdown seperti tanda bintang (*), cetak tebal, hashtag, atau bullet points. Gunakan paragraf biasa.`;

      const historyContents = chatMessages
        .filter(msg => !msg.isLoading && msg.text && msg.text.trim().length > 0)
        .map(msg => ({
          role: msg.isBot ? 'model' : 'user',
          parts: [{ text: msg.text }]
        }));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [
            ...historyContents,
            { role: 'user', parts: [{ text: userMessage }] }
          ]
        })
      });

      if (!response.ok) {
        let errorDetail = "";
        try {
          const errorData = await response.json();
          errorDetail = errorData.error?.message || JSON.stringify(errorData);
        } catch (jsonError) {
          errorDetail = response.statusText;
        }
        throw new Error("API error: " + response.status + " " + errorDetail);
      }

      const data = await response.json();
      const botReply = data.candidates[0].content.parts[0].text;
      updateLastMessage(botReply);

    } catch (error) {
      console.error("DEBUG_API_ERROR:", error);
      updateLastMessage("Maaf, layanan AI sedang mengalami gangguan. Silakan coba beberapa saat lagi. Detail: " + error.message, true);
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
          <>
            {chatMessages.map((msg, index) => (
              <div key={index} className={`max-w-[85%] p-3 text-sm shadow-sm whitespace-pre-wrap ${msg.isBot ? 'bg-[#eef1e6] border border-emerald-100 text-[#14532d] rounded-2xl rounded-tl-none self-start' : 'bg-[#14532d] text-white rounded-2xl rounded-tr-none self-end'} ${msg.isLoading ? 'animate-pulse text-2xl tracking-widest pt-0 pb-1 font-black' : ''}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </>
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isLoading}
            placeholder="Tanya destinasi wisata..."
            className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#14532d] disabled:bg-gray-200"
          />
          <button type="submit" disabled={isLoading || !chatInput.trim()} className="bg-[#14532d] text-white p-2.5 rounded-full hover:bg-emerald-800 transition-colors disabled:bg-gray-400">
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
