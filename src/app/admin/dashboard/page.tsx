'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Plus, Trash2, Edit, Upload, MessageSquare, Package, ShoppingBag, Image, Video, X, Check, Menu, ChevronLeft } from 'lucide-react';

type Tab = 'packages' | 'orders' | 'gallery' | 'chat';
const STATUS_MAP: Record<string, string> = { new: '🆕 Шинэ', contacted: '📞 Холбогдсон', confirmed: '✅ Баталгаажсан', done: '🎉 Дууссан', cancelled: '❌ Цуцлагдсан' };
const STATUS_COLORS: Record<string, string> = { new: 'bg-blue-100 text-blue-700', contacted: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-green-100 text-green-700', done: 'bg-purple-100 text-purple-700', cancelled: 'bg-red-100 text-red-700' };

interface PkgForm { _id?: string; title: string; description: string; price: number; duration: string; category: string; images: string[]; video: string; features: string; isActive: boolean; }
const emptyPkg: PkgForm = { title: '', description: '', price: 0, duration: '2 цаг', category: 'Хүүхдийн баяр', images: [], video: '', features: '', isActive: true };

const CATEGORIES = ['Хүүхдийн баяр', 'Төрсөн өдөр', 'Цэцэрлэгийн төгсөлт', '5-р ангийн төгсөлт', 'Үсэглэлийн баяр', 'Сэвлэг үргээх ёслол'];

export default function Dashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('orders');
  const [packages, setPackages] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [chats, setChats] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<any>(null);
  const [chatMsg, setChatMsg] = useState('');
  const [pkgForm, setPkgForm] = useState<PkgForm>(emptyPkg);
  const [editingPkg, setEditingPkg] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [toast, setToast] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const chatBottom = useRef<HTMLDivElement>(null);

  useEffect(() => { loadAll(); const iv = setInterval(loadChats, 5000); return () => clearInterval(iv); }, []);
  useEffect(() => { chatBottom.current?.scrollIntoView({ behavior: 'smooth' }); }, [activeChat]);

  async function loadAll() { loadPackages(); loadOrders(); loadChats(); }
  async function loadPackages() {
    const r = await fetch('/api/admin/packages');
    if (r.status === 401) { router.push('/admin'); return; }
    const d = await r.json(); setPackages(Array.isArray(d) ? d : []);
  }
  async function loadOrders() { const r = await fetch('/api/orders'); if (r.ok) { const d = await r.json(); setOrders(Array.isArray(d) ? d : []); } }
  async function loadChats() { const r = await fetch('/api/admin/chat'); if (r.ok) { const d = await r.json(); setChats(Array.isArray(d) ? d : []); if (activeChat) { const found = d.find((c: any) => c.sessionId === activeChat.sessionId); if (found) setActiveChat(found); } } }

  async function logout() { await fetch('/api/auth', { method: 'DELETE' }); router.push('/admin'); }

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(''), 3000); }

  async function uploadFile(file: File) {
    setUploading(true);
    const fd = new FormData(); fd.append('file', file);
    const r = await fetch('/api/upload', { method: 'POST', body: fd });
    const d = await r.json();
    setUploading(false);
    return d.url;
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const urls: string[] = [];
    for (const f of files) { const url = await uploadFile(f); if (url) urls.push(url); }
    setPkgForm(f => ({ ...f, images: [...f.images, ...urls] }));
    showToast('✅ Зураг амжилттай хуулагдлаа!');
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const url = await uploadFile(file);
    if (url) { setPkgForm(f => ({ ...f, video: url })); showToast('✅ Бичлэг амжилттай хуулагдлаа!'); }
  }

  // 🔧 FIX: savePkg uses /api/admin/packages for both POST and PUT
  async function savePkg() {
    const method = pkgForm._id ? 'PUT' : 'POST';
    const body = { ...pkgForm, features: pkgForm.features.split('\n').filter(Boolean) };
    const r = await fetch('/api/admin/packages', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    if (!r.ok) { showToast('❌ Хадгалахад алдаа гарлаа'); return; }
    setEditingPkg(false); setPkgForm(emptyPkg); loadPackages(); showToast('✅ Тоглолт хадгалагдлаа!');
  }

  async function deletePkg(id: string) {
    if (!confirm('Устгах уу?')) return;
    await fetch(`/api/admin/packages?id=${id}`, { method: 'DELETE' }); loadPackages(); showToast('🗑️ Устгагдлаа');
  }

  async function updateOrderStatus(id: string, status: string) {
    await fetch('/api/orders', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ _id: id, status }) });
    loadOrders();
  }

  async function sendChatReply() {
    if (!chatMsg.trim() || !activeChat) return;
    await fetch('/api/admin/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sessionId: activeChat.sessionId, role: 'admin', text: chatMsg }) });
    setChatMsg(''); loadChats();
  }

  function switchTab(t: Tab) { setTab(t); setSidebarOpen(false); }

  const newOrderCount = orders.filter(o => o.status === 'new').length;
  const unreadChatCount = chats.filter((c: any) => !c.isRead).length;

  return (
    <div className="min-h-screen" style={{ background: '#F5F0FF' }}>
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl font-semibold text-sm animate-bounce whitespace-nowrap">
          {toast}
        </div>
      )}

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed lg:relative inset-y-0 left-0 z-40
          w-64 flex-shrink-0 text-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `} style={{ background: 'linear-gradient(180deg, #2D1B69, #4C1D95)' }}>
          <div className="p-5 border-b border-purple-700 flex items-center justify-between">
            <div>
              <div className="text-2xl mb-0.5">🎪</div>
              <p className="font-black text-base"><span className="text-pink-400">Кид</span><span className="text-yellow-300">Шоу</span></p>
              <p className="text-purple-300 text-xs">Админ хэсэг</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 text-purple-300 hover:text-white">
              <ChevronLeft size={20} />
            </button>
          </div>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {([
              ['orders', <ShoppingBag size={18}/>, 'Захиалгууд', newOrderCount],
              ['packages', <Package size={18}/>, 'Тоглолтууд', 0],
              ['gallery', <Image size={18}/>, 'Зураг/Бичлэг', 0],
              ['chat', <MessageSquare size={18}/>, 'Чат', unreadChatCount],
            ] as [Tab, React.ReactNode, string, number][]).map(([key, icon, label, count]) => (
              <button key={key} onClick={() => switchTab(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${tab === key ? 'bg-white/20 text-white' : 'text-purple-300 hover:text-white hover:bg-white/10'}`}>
                {icon} {label}
                {count > 0 && <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full">{count}</span>}
              </button>
            ))}
          </nav>
          <div className="p-3 border-t border-purple-700">
            <button onClick={logout} className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-purple-300 hover:text-white hover:bg-white/10 text-sm font-semibold transition-all">
              <LogOut size={16} /> Гарах
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile top bar */}
          <div className="lg:hidden flex items-center gap-3 px-4 py-3 text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg, #2D1B69, #4C1D95)' }}>
            <button onClick={() => setSidebarOpen(true)} className="p-1.5 rounded-lg bg-white/10">
              <Menu size={20} />
            </button>
            <span className="font-black text-sm">
              <span className="text-pink-400">Кид</span><span className="text-yellow-300">Шоу</span>
              <span className="text-purple-300 font-normal ml-2 text-xs">
                {tab === 'orders' ? 'Захиалгууд' : tab === 'packages' ? 'Тоглолтууд' : tab === 'gallery' ? 'Зураг/Бичлэг' : 'Чат'}
              </span>
            </span>
            {(newOrderCount + unreadChatCount) > 0 && (
              <span className="ml-auto bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                {newOrderCount + unreadChatCount}
              </span>
            )}
          </div>

          <div className="flex-1 overflow-auto p-3 lg:p-6">

          {/* ORDERS */}
          {tab === 'orders' && (
            <div>
              <h2 className="text-xl lg:text-2xl font-black text-purple-800 mb-4">📋 Захиалгууд</h2>
              <div className="space-y-3">
                {orders.length === 0 && <p className="text-purple-400 text-center py-12">Одоогоор захиалга байхгүй байна</p>}
                {orders.map(order => (
                  <div key={order._id} className="bg-white rounded-2xl p-4 shadow-md border-l-4" style={{ borderColor: order.status === 'new' ? '#FF6B9D' : order.status === 'confirmed' ? '#10B981' : '#A855F7' }}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-purple-800 text-sm">{order.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${STATUS_COLORS[order.status]}`}>{STATUS_MAP[order.status]}</span>
                      </div>
                    </div>
                    <p className="text-xs text-purple-500 mb-0.5">📞 {order.phone} {order.email && `• ${order.email}`}</p>
                    <p className="text-xs text-purple-500 mb-0.5">🎪 {order.packageTitle} • 📅 {order.eventDate} • 👥 {order.guestCount} хүн</p>
                    {order.message && <p className="text-xs text-purple-400 italic mb-1">"{order.message}"</p>}
                    <p className="text-xs text-purple-300 mb-3">{new Date(order.createdAt).toLocaleString('mn-MN')}</p>
                    {/* Status buttons - scrollable row on mobile */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1">
                      {(['contacted', 'confirmed', 'done', 'cancelled'] as const).map(s => (
                        <button key={s} onClick={() => updateOrderStatus(order._id, s)}
                          disabled={order.status === s}
                          className={`text-xs px-2.5 py-1.5 rounded-lg font-semibold disabled:opacity-30 transition-all whitespace-nowrap flex-shrink-0 ${STATUS_COLORS[s]} hover:opacity-80`}>
                          {STATUS_MAP[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PACKAGES */}
          {tab === 'packages' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl lg:text-2xl font-black text-purple-800">🎪 Тоглолтууд</h2>
                <button onClick={() => { setPkgForm(emptyPkg); setEditingPkg(true); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-white font-semibold text-sm"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                  <Plus size={16} /> Нэмэх
                </button>
              </div>

              {editingPkg && (
                <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-xl mb-4 border-2 border-pink-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-purple-800 text-sm">{pkgForm._id ? 'Засах' : 'Шинэ тоглолт нэмэх'}</h3>
                    <button onClick={() => setEditingPkg(false)}><X size={20} className="text-gray-400" /></button>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <input placeholder="Гарчиг" value={pkgForm.title} onChange={e => setPkgForm(f => ({ ...f, title: e.target.value }))}
                      className="border-2 border-purple-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 w-full" />
                    <select value={pkgForm.category} onChange={e => setPkgForm(f => ({ ...f, category: e.target.value }))}
                      className="border-2 border-purple-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 bg-white w-full">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="Үнэ (₮)" type="number" value={pkgForm.price} onChange={e => setPkgForm(f => ({ ...f, price: Number(e.target.value) }))}
                        className="border-2 border-purple-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400" />
                      <input placeholder="Хугацаа" value={pkgForm.duration} onChange={e => setPkgForm(f => ({ ...f, duration: e.target.value }))}
                        className="border-2 border-purple-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400" />
                    </div>
                    <textarea placeholder="Тайлбар" value={pkgForm.description} onChange={e => setPkgForm(f => ({ ...f, description: e.target.value }))}
                      rows={3} className="border-2 border-purple-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 resize-none w-full" />
                    <textarea placeholder="Онцлогууд (мөр тус бүрд нэг)" value={pkgForm.features} onChange={e => setPkgForm(f => ({ ...f, features: e.target.value }))}
                      rows={3} className="border-2 border-purple-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400 resize-none w-full" />
                  </div>

                  {/* Image upload */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-purple-700 mb-2">Зургууд</p>
                    <div className="flex flex-wrap gap-2">
                      {pkgForm.images.map((img, i) => (
                        <div key={i} className="relative">
                          <img src={img} alt="" className="w-20 h-20 object-cover rounded-xl" />
                          <button onClick={() => setPkgForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">×</button>
                        </div>
                      ))}
                      <label className="w-20 h-20 border-2 border-dashed border-purple-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 transition-colors">
                        {uploading ? <span className="text-xs text-purple-400">...</span> : <><Upload size={18} className="text-purple-400" /><span className="text-xs text-purple-400 mt-1">Нэмэх</span></>}
                        <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>

                  {/* Video upload */}
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-purple-700 mb-2">Бичлэг</p>
                    {pkgForm.video ? (
                      <div className="flex items-center gap-3">
                        <video src={pkgForm.video} className="w-32 h-20 object-cover rounded-xl" controls />
                        <button onClick={() => setPkgForm(f => ({ ...f, video: '' }))} className="text-red-500 hover:text-red-700"><Trash2 size={16} /></button>
                      </div>
                    ) : (
                      <label className="inline-flex items-center gap-2 px-4 py-2 border-2 border-dashed border-purple-300 rounded-xl cursor-pointer hover:border-pink-400 text-sm text-purple-500 transition-colors">
                        <Video size={16} /> {uploading ? 'Хуулж байна...' : 'Бичлэг оруулах'}
                        <input type="file" accept="video/*" className="hidden" onChange={handleVideoUpload} />
                      </label>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
                    <label className="flex items-center gap-2 text-sm font-semibold text-purple-700 cursor-pointer">
                      <input type="checkbox" checked={pkgForm.isActive} onChange={e => setPkgForm(f => ({ ...f, isActive: e.target.checked }))} className="w-4 h-4" />
                      Идэвхтэй
                    </label>
                    <div className="flex gap-2">
                      <button onClick={() => setEditingPkg(false)} className="px-4 py-2 rounded-xl border-2 border-gray-200 text-gray-500 text-sm font-semibold">Цуцлах</button>
                      <button onClick={savePkg} className="px-5 py-2 rounded-xl text-white font-semibold text-sm flex items-center gap-2"
                        style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                        <Check size={16} /> Хадгалах
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-3">
                {packages.map(pkg => (
                  <div key={pkg._id} className={`bg-white rounded-2xl p-4 shadow-md border-2 ${pkg.isActive ? 'border-green-100' : 'border-gray-100 opacity-60'}`}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-purple-800 text-sm truncate">{pkg.title}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${pkg.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                            {pkg.isActive ? 'Идэвхтэй' : 'Нуугдсан'}
                          </span>
                        </div>
                        <p className="text-purple-500 text-xs">{pkg.category} • {pkg.duration}</p>
                        <p className="text-pink-600 font-bold text-sm">{pkg.price?.toLocaleString()}₮</p>
                        {pkg.images?.length > 0 && <p className="text-xs text-purple-400">🖼 {pkg.images.length} зураг</p>}
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => { setPkgForm({ ...pkg, features: (pkg.features || []).join('\n') }); setEditingPkg(true); }}
                          className="p-2 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100"><Edit size={16} /></button>
                        <button onClick={() => deletePkg(pkg._id)} className="p-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* GALLERY */}
          {tab === 'gallery' && (
            <div>
              <h2 className="text-xl lg:text-2xl font-black text-purple-800 mb-4">🖼️ Зураг & Бичлэг</h2>
              <div className="bg-white rounded-2xl p-8 text-center border-2 border-dashed border-purple-200">
                <div className="text-5xl mb-4">📸</div>
                <p className="text-purple-600 font-semibold mb-2 text-sm">Зураг болон бичлэгийг тоглолт дотроос оруулна уу</p>
                <p className="text-purple-400 text-xs mb-4">Тоглолтуудыг засах үед зураг оруулах боломжтой</p>
                <button onClick={() => switchTab('packages')} className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                  Тоглолтууд руу очих
                </button>
              </div>
            </div>
          )}

          {/* CHAT */}
          {tab === 'chat' && (
            <div className="flex gap-3 h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
              {/* Chat list - hidden when chat is active on mobile */}
              <div className={`${activeChat ? 'hidden lg:flex' : 'flex'} w-full lg:w-72 flex-shrink-0 bg-white rounded-2xl shadow-md overflow-hidden flex-col`}>
                <div className="p-3 border-b-2 border-purple-50">
                  <h3 className="font-bold text-purple-800 text-sm">💬 Хэрэглэгчийн чатууд</h3>
                </div>
                <div className="flex-1 overflow-y-auto">
                  {chats.length === 0 && <p className="text-center text-purple-400 text-sm p-6">Чат байхгүй байна</p>}
                  {chats.map((chat: any) => (
                    <button key={chat._id} onClick={() => setActiveChat(chat)}
                      className={`w-full p-3 text-left border-b border-purple-50 hover:bg-purple-50 transition-colors ${activeChat?.sessionId === chat.sessionId ? 'bg-purple-50' : ''}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-purple-800">{chat.senderName || 'Зочин'}</span>
                        {!chat.isRead && <span className="w-2.5 h-2.5 bg-pink-500 rounded-full flex-shrink-0"></span>}
                      </div>
                      <p className="text-xs text-purple-500 truncate">{chat.phone}</p>
                      <p className="text-xs text-purple-400 mt-0.5 truncate">{chat.messages?.[chat.messages.length - 1]?.text || '...'}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat window */}
              {activeChat ? (
                <div className="flex-1 bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
                  <div className="p-3 border-b-2 border-purple-50 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #FF6B9D11, #A855F711)' }}>
                    <button onClick={() => setActiveChat(null)} className="lg:hidden p-1.5 rounded-lg bg-purple-100 text-purple-600">
                      <ChevronLeft size={18} />
                    </button>
                    <span className="text-xl">👤</span>
                    <div>
                      <p className="font-bold text-purple-800 text-sm">{activeChat.senderName}</p>
                      <p className="text-xs text-purple-500">{activeChat.phone}</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-3 space-y-2">
                    {activeChat.messages?.map((msg: any, i: number) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${msg.role === 'user' ? 'bg-purple-50 text-purple-800 rounded-tl-none' : 'text-white rounded-tr-none'}`}
                          style={msg.role === 'admin' ? { background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' } : {}}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    <div ref={chatBottom} />
                  </div>
                  <div className="p-3 border-t-2 border-purple-50 flex gap-2">
                    <input value={chatMsg} onChange={e => setChatMsg(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChatReply()}
                      placeholder="Хариулт бичих..." className="flex-1 border-2 border-purple-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-pink-400" />
                    <button onClick={sendChatReply} className="px-4 py-2.5 rounded-xl text-white font-semibold text-sm flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>Илгээх</button>
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex flex-1 bg-white rounded-2xl shadow-md items-center justify-center text-center">
                  <div>
                    <div className="text-5xl mb-4">💬</div>
                    <p className="text-purple-500 font-semibold text-sm">Чат сонгоно уу</p>
                  </div>
                </div>
              )}
            </div>
          )}

          </div>
        </main>
      </div>
    </div>
  );
}
