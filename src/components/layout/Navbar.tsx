'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Star } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Нүүр' },
  { href: '/packages', label: 'Тоглолтууд' },
  { href: '#about', label: 'Бидний тухай' },
  { href: '#contact', label: 'Холбогдох' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b-4 border-yellow-300 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-3xl wiggle inline-block">🎪</div>
            <div>
              <span className="text-xl font-black" style={{ color: '#FF6B9D' }}>Кид</span>
              <span className="text-xl font-black" style={{ color: '#A855F7' }}>Шоу</span>
            </div>
            <Star size={14} className="text-yellow-400 fill-yellow-400 star-spin" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="font-semibold text-sm hover:text-pink-500 transition-colors relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-400 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a href="tel:99001234" className="flex items-center gap-2 text-sm font-bold text-purple-700 hover:text-pink-600 transition-colors">
              <Phone size={16} />
              9900-1234
            </a>
            <a href="#order"
              className="px-4 py-2 rounded-full text-sm font-bold text-white shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
              🎉 Захиалах
            </a>
          </div>

          {/* Mobile menu btn */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-purple-700">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t-2 border-yellow-200 px-4 pb-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)}
              className="block py-3 font-semibold text-purple-800 border-b border-purple-50 hover:text-pink-500">
              {link.label}
            </Link>
          ))}
          <a href="tel:99001234" className="flex items-center gap-2 mt-3 font-bold text-pink-600">
            <Phone size={16} /> 9900-1234
          </a>
          <a href="#order" onClick={() => setOpen(false)}
            className="mt-3 block text-center px-4 py-3 rounded-full font-bold text-white"
            style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
            🎉 Захиалах
          </a>
        </div>
      )}
    </nav>
  );
}
