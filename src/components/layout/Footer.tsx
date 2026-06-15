import Link from 'next/link';
import { Phone, MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-white pt-16 pb-8" style={{ background: 'linear-gradient(135deg, #2D1B69, #4C1D95)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-purple-700">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🎪</span>
              <div>
                <span className="text-2xl font-black text-pink-400">Кид</span>
                <span className="text-2xl font-black text-yellow-300">Шоу</span>
              </div>
            </div>
            <p className="text-purple-200 text-sm leading-relaxed">
              Таны хүүхдийн баяр, төрсөн өдөр болон тусгай үйл явдлыг мартагдашгүй дурсамж болгоно. Аз жаргалыг хамтдаа бүтээе! 🌟
            </p>
            <div className="flex gap-3 mt-5">
              <a href="https://instagram.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-transform text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                IG
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center hover:scale-110 transition-transform text-sm font-bold">
                FB
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-yellow-300 mb-4 text-lg">Тоглолтууд</h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              {['Хүүхдийн баяр', 'Төрсөн өдөр', 'Цэцэрлэгийн төгсөлт', '5-р ангийн төгсөлт', 'Үсэглэлийн баяр', 'Сэвлэг үргээх ёслол'].map(item => (
                <li key={item}>
                  <Link href="/packages" className="hover:text-pink-300 transition-colors flex items-center gap-1">
                    <span>✨</span> {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-yellow-300 mb-4 text-lg">Холбогдох</h3>
            <ul className="space-y-3 text-purple-200 text-sm">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:99001234" className="hover:text-white block font-bold">9900-1234</a>
                  <a href="tel:88001234" className="hover:text-white block">8800-1234</a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@kidshow.mn" className="hover:text-white">info@kidshow.mn</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <span>Улаанбаатар хот, Сүхбаатар дүүрэг</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 text-center text-purple-400 text-sm">
          <p>© 2024 КидШоу. Бүх эрх хуулиар хамгаалагдсан. 🎈</p>
        </div>
      </div>
    </footer>
  );
}
