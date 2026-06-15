'use client';
import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const packageTypes = [
  'Хүүхдийн баяр', 'Төрсөн өдөр', 'Цэцэрлэгийн төгсөлт',
  '5-р ангийн төгсөлт', 'Үсэглэлийн баяр', 'Сэвлэг үргээх ёслол', 'Бусад'
];

export default function OrderForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', packageTitle: '', eventDate: '', guestCount: 20, message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, source: 'form' })
    });
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-12 px-6">
        <div className="text-6xl mb-4">🎉</div>
        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-purple-800 mb-2">Захиалга илгээгдлээ!</h3>
        <p className="text-purple-600">Бид тантай удахгүй холбогдох болно. Баярлалаа! 🌟</p>
        <button onClick={() => setSubmitted(false)} className="mt-6 px-6 py-2.5 rounded-full text-white font-semibold"
          style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
          Дахин захиалах
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-purple-700 mb-1 block">Нэр *</label>
          <input name="name" required value={form.name} onChange={handleChange}
            className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition-colors"
            placeholder="Таны нэр" />
        </div>
        <div>
          <label className="text-sm font-semibold text-purple-700 mb-1 block">Утас *</label>
          <input name="phone" required value={form.phone} onChange={handleChange} type="tel"
            className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 transition-colors"
            placeholder="9900-0000" />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-purple-700 mb-1 block">Тоглолтын төрөл *</label>
        <select name="packageTitle" required value={form.packageTitle} onChange={handleChange}
          className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 bg-white">
          <option value="">-- Сонгоно уу --</option>
          {packageTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-purple-700 mb-1 block">Арга хэмжээний огноо *</label>
          <input name="eventDate" required value={form.eventDate} onChange={handleChange} type="date"
            className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400" />
        </div>
        <div>
          <label className="text-sm font-semibold text-purple-700 mb-1 block">Хүний тоо</label>
          <input name="guestCount" value={form.guestCount} onChange={handleChange} type="number" min={5} max={500}
            className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400" />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-purple-700 mb-1 block">Нэмэлт мэдээлэл</label>
        <textarea name="message" value={form.message} onChange={handleChange} rows={3}
          className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink-400 resize-none"
          placeholder="Тоглолтын газар, хүслийн жагсаалт эсвэл асуулт..." />
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-4 rounded-2xl font-bold text-white text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
        {loading ? '⏳ Илгээж байна...' : '🎉 Захиалга илгээх'}
      </button>
    </form>
  );
}
