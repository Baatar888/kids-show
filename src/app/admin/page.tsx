'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      router.push('/admin/dashboard');
    } else {
      setError(data.error || 'Алдаа гарлаа');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #2D1B69, #4C1D95, #6D28D9)' }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🎪</div>
          <h1 className="text-3xl font-black text-white">КидШоу</h1>
          <p className="text-purple-300 mt-1">Админ хэсэг</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Нэвтрэх</h2>
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 mb-4 text-red-600 text-sm">
              ⚠️ {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-purple-700 mb-1 block">Нэвтрэх нэр</label>
              <input type="text" required value={form.username}
                onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors"
                placeholder="admin" />
            </div>
            <div>
              <label className="text-sm font-semibold text-purple-700 mb-1 block">Нууц үг</label>
              <input type="password" required value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="w-full border-2 border-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:border-pink-400 transition-colors"
                placeholder="••••••" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-4 rounded-2xl font-bold text-white text-lg mt-2 disabled:opacity-60 hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
              {loading ? '⏳ Нэвтэрч байна...' : '🔐 Нэвтрэх'}
            </button>
          </form>
          <p className="text-center text-purple-400 text-xs mt-4">
            Нэвтрэх нэр: admin / Нууц үг: admin123
          </p>
        </div>
      </div>
    </div>
  );
}
