'use client';
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Phone } from 'lucide-react';

interface Message {
  role: 'user' | 'admin';
  text: string;
  time: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState<'intro' | 'chat'>('intro');
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).slice(2)}`);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && step === 'chat') {
      fetchMessages();
      const interval = setInterval(fetchMessages, 4000);
      return () => clearInterval(interval);
    }
  }, [open, step]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function fetchMessages() {
    const res = await fetch(`/api/admin/chat?sessionId=${sessionId}`);
    const data = await res.json();
    if (data.messages) setMessages(data.messages);
  }

  async function startChat() {
    if (!name.trim() || !phone.trim()) return;
    await fetch('/api/admin/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId, senderName: name, phone,
        role: 'user',
        text: `Сайн байна уу! Би ${name}. Утас: ${phone}. Танай үйлчилгээний талаар лавлахаар холбогдлоо.`
      })
    });
    setMessages([{ role: 'user', text: `Сайн байна уу! Би ${name}. Утас: ${phone}. Танай үйлчилгээний талаар лавлахаар холбогдлоо.`, time: new Date().toISOString() }]);
    setStep('chat');
  }

  async function sendMessage() {
    if (!text.trim() || sending) return;
    setSending(true);
    const msg = text.trim();
    setText('');
    await fetch('/api/admin/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, senderName: name, phone, role: 'user', text: msg })
    });
    setSending(false);
    await fetchMessages();
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-4 md:right-8 w-80 md:w-96 rounded-3xl shadow-2xl overflow-hidden z-50 border-4 border-yellow-300"
          style={{ background: '#FFF9F0' }}>
          {/* Header */}
          <div className="p-4 flex items-center justify-between text-white"
            style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎪</span>
              <div>
                <p className="font-bold">КидШоу</p>
                <p className="text-xs opacity-80 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-300 rounded-full inline-block"></span>
                  Онлайн байна
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a href="tel:99001234" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <Phone size={16} />
              </a>
              <button onClick={() => setOpen(false)} className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          {step === 'intro' ? (
            <div className="p-5">
              <div className="bg-purple-50 rounded-2xl p-4 mb-4">
                <p className="text-purple-700 text-sm font-medium">👋 Сайн байна уу!</p>
                <p className="text-purple-600 text-sm mt-1">Захиалга хийх, лавлах зүйл байвал бичнэ үү. Та мэдээллээ оруулаарай.</p>
              </div>
              <input
                className="w-full border-2 border-purple-200 rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:border-pink-400"
                placeholder="Таны нэр" value={name} onChange={e => setName(e.target.value)} />
              <input
                className="w-full border-2 border-purple-200 rounded-xl px-4 py-2.5 text-sm mb-4 focus:outline-none focus:border-pink-400"
                placeholder="Утасны дугаар" value={phone} onChange={e => setPhone(e.target.value)} type="tel" />
              <button onClick={startChat}
                disabled={!name.trim() || !phone.trim()}
                className="w-full py-3 rounded-xl font-bold text-white disabled:opacity-50 transition-all hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                💬 Чат эхлэх
              </button>
              <div className="mt-3 text-center text-xs text-purple-400">эсвэл шууд залгах</div>
              <a href="tel:99001234"
                className="mt-2 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border-2 border-purple-200 text-purple-700 font-semibold text-sm hover:border-purple-400 transition-colors">
                <Phone size={14} /> 9900-1234
              </a>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                <div className="chat-bubble-admin p-3 text-sm shadow-sm max-w-xs">
                  🎉 Сайн байна уу! Захиалга болон лавлах зүйлтэй холбоотой асуудалд туслахад бэлэн байна!
                </div>
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 text-sm max-w-xs shadow-sm ${msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-admin'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t-2 border-yellow-200 flex gap-2">
                <input
                  className="flex-1 border-2 border-purple-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-pink-400"
                  placeholder="Мессеж бичих..." value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()} />
                <button onClick={sendMessage} disabled={sending || !text.trim()}
                  className="p-2.5 rounded-xl text-white disabled:opacity-50 transition-all"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                  <Send size={16} />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-4 md:right-8 w-16 h-16 rounded-full shadow-2xl text-white flex items-center justify-center text-2xl z-50 hover:scale-110 transition-transform"
        style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
        {open ? <X size={24} /> : '💬'}
      </button>
    </>
  );
}
