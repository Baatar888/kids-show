import Link from 'next/link';
import { Phone, Star, Heart, Users, Award, Calendar } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/ChatWidget';
import OrderForm from '@/components/ui/OrderForm';

const categories = [
  { emoji: '🎂', title: 'Төрсөн өдөр', desc: 'Хамгийн тусгай өдрийг алдартгаяа', color: '#FF6B9D' },
  { emoji: '🎓', title: 'Цэцэрлэгийн төгсөлт', desc: 'Эхний алхмыг тэмдэглэе', color: '#4ECDC4' },
  { emoji: '🌟', title: 'Хүүхдийн баяр', desc: 'Хамтдаа жаргалтай байцгаая', color: '#A855F7' },
  { emoji: '✂️', title: 'Сэвлэг үргээх ёслол', desc: 'Монгол ёс заншлаа хүндэтгэе', color: '#FFE66D' },
  { emoji: '📚', title: 'Үсэглэлийн баяр', desc: 'Сурлагын эхлэлийг тэмдэглэе', color: '#FF6B9D' },
  { emoji: '🏆', title: '5-р ангийн төгсөлт', desc: 'Амжилтыг нь шагнаяа', color: '#4ECDC4' },
];

const stats = [
  { icon: '🎪', value: '500+', label: 'Тоглолт хийгдсэн' },
  { icon: '😊', value: '2000+', label: 'Хүүхэд баярлуулсан' },
  { icon: '⭐', value: '5/5', label: 'Үнэлгээ' },
  { icon: '📅', value: '5+', label: 'Жилийн туршлага' },
];

const gallery = [
  { emoji: '🎭', bg: '#FF6B9D' },
  { emoji: '🎪', bg: '#A855F7' },
  { emoji: '🎨', bg: '#4ECDC4' },
  { emoji: '🎡', bg: '#FFE66D' },
  { emoji: '🎠', bg: '#FF6B9D' },
  { emoji: '🎯', bg: '#4ECDC4' },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {/* HERO */}
        <section className="pt-16 min-h-screen flex items-center relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FFF9F0 0%, #FDF4FF 50%, #F0FDFF 100%)' }}>
          {/* Floating decorations */}
          <div className="absolute top-20 right-10 text-6xl bubble-float" style={{ animationDelay: '0s' }}>🎈</div>
          <div className="absolute top-40 left-8 text-4xl bubble-float" style={{ animationDelay: '0.5s' }}>⭐</div>
          <div className="absolute bottom-20 right-20 text-5xl bubble-float" style={{ animationDelay: '1s' }}>🎊</div>
          <div className="absolute bottom-40 left-12 text-4xl bubble-float" style={{ animationDelay: '1.5s' }}>🎁</div>
          <div className="absolute top-60 right-1/3 text-3xl star-spin">✨</div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-50 border-2 border-pink-200 rounded-full px-4 py-1.5 text-pink-600 text-sm font-semibold mb-6">
                <Star size={14} className="fill-pink-500 text-pink-500" />
                Монголын #1 хүүхдийн тоглолт
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6"
                style={{ color: '#2D1B69' }}>
                Таны хүүхдийн
                <span className="block" style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  баярыг мартагдашгүй
                </span>
                болгоно! 🎉
              </h1>

              <p className="text-lg text-purple-600 mb-8 leading-relaxed max-w-md">
                Мэргэжлийн тоглоомын газар, гайхалтай аниматор, ганц цэгийн үйлчилгээ. Хүүхдийнхээ нүд дэх гэрлийг бид бүтээнэ.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#order"
                  className="px-8 py-4 rounded-2xl font-bold text-white text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                  🎉 Захиалга өгөх
                </a>
                <Link href="/packages"
                  className="px-8 py-4 rounded-2xl font-bold border-2 hover:border-pink-400 transition-colors"
                  style={{ borderColor: '#A855F7', color: '#A855F7' }}>
                  Тоглолтуудыг харах →
                </Link>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {['😊', '🥰', '😄', '🤩'].map((e, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-white border-2 border-pink-200 flex items-center justify-center text-lg shadow-sm">{e}</div>
                  ))}
                </div>
                <div>
                  <p className="font-bold text-purple-800 text-sm">2000+ хүүхэд баярлуулсан</p>
                  <p className="text-purple-500 text-xs">⭐⭐⭐⭐⭐ 5.0 үнэлгээтэй</p>
                </div>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 rounded-[3rem] flex items-center justify-center text-9xl"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D33, #A855F733)', border: '4px solid #FFE66D' }}>
                  🎪
                </div>
                <div className="absolute -top-4 -right-4 text-5xl bubble-float">🎈</div>
                <div className="absolute -bottom-4 -left-4 text-4xl bubble-float" style={{ animationDelay: '1s' }}>🎊</div>
                <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white rounded-2xl px-4 py-3 shadow-xl border-2 border-yellow-200">
                  <p className="text-xs font-bold text-purple-700">⭐ Шилдэг тоглолт</p>
                  <p className="text-sm font-black text-pink-500">5.0 / 5</p>
                </div>
                <div className="absolute top-4 -right-8 bg-white rounded-2xl px-4 py-3 shadow-xl border-2 border-pink-200">
                  <p className="text-xs font-bold text-purple-700">🎂 Хамгийн их</p>
                  <p className="text-sm font-black text-purple-600">Захиалгатай</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-12" style={{ background: 'linear-gradient(135deg, #2D1B69, #4C1D95)' }}>
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <p className="text-3xl font-black text-yellow-300">{stat.value}</p>
                <p className="text-purple-200 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-20 px-4" style={{ background: '#FFF9F0' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-4xl">✨</span>
              <h2 className="text-3xl sm:text-4xl font-black mt-2" style={{ color: '#2D1B69' }}>
                Манай тоглолтын төрлүүд
              </h2>
              <p className="text-purple-500 mt-3 max-w-xl mx-auto">
                Таны тусгай үйл явдалд тохирсон захиалгат тоглолтыг бид бэлдэнэ
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, i) => (
                <Link key={i} href="/packages"
                  className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-pink-200">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {cat.emoji}
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: '#2D1B69' }}>{cat.title}</h3>
                  <p className="text-purple-500 text-sm mb-4">{cat.desc}</p>
                  <span className="text-sm font-semibold" style={{ color: cat.color }}>
                    Дэлгэрэнгүй →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #FDF4FF, #F0FDFF)' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black" style={{ color: '#2D1B69' }}>
                Яагаад КидШоу сонгох вэ? 🤔
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Award className="text-pink-500" size={32} />, title: 'Мэргэжлийн баг', desc: '5+ жилийн туршлагатай аниматор, хэн ч байсан хурдан дотносдог' },
                { icon: <Heart className="text-red-500" size={32} />, title: 'Зөвхөн хүүхэддээ', desc: 'Бүх тоглолт хүүхдийн сэтгэлд тохируулан зохиогдоно' },
                { icon: <Users className="text-purple-500" size={32} />, title: 'Аливаа хэмжээнд', desc: '10 хүнээс эхлэн 500+ хүртэл арга хэмжээ зохиодог' },
                { icon: <Calendar className="text-teal-500" size={32} />, title: 'Захиалгат хөтөлбөр', desc: 'Таны хүслийн дагуу тусгай хөтөлбөр боловсруулна' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-3xl p-6 shadow-lg text-center">
                  <div className="flex justify-center mb-4">{item.icon}</div>
                  <h3 className="font-bold text-purple-800 mb-2">{item.title}</h3>
                  <p className="text-purple-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="py-20 px-4" style={{ background: '#FFF9F0' }}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black" style={{ color: '#2D1B69' }}>Дурсамжийн зургууд 📸</h2>
              <p className="text-purple-500 mt-2">Бидний хийсэн тоглолтуудаас</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((item, i) => (
                <div key={i} className="aspect-square rounded-3xl flex items-center justify-center text-8xl hover:scale-105 transition-transform cursor-pointer shadow-lg"
                  style={{ background: `${item.bg}33`, border: `3px solid ${item.bg}66` }}>
                  {item.emoji}
                </div>
              ))}
            </div>
            <p className="text-center text-purple-400 text-sm mt-4">* Зургуудыг admin тохиргооноос оруулна</p>
          </div>
        </section>

        {/* ORDER FORM */}
        <section id="order" className="py-20 px-4" style={{ background: 'linear-gradient(135deg, #FDF4FF, #F0FDFF)' }}>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-5xl">🎉</span>
              <h2 className="text-3xl sm:text-4xl font-black mt-3" style={{ color: '#2D1B69' }}>
                Захиалга өгөх
              </h2>
              <p className="text-purple-500 mt-2">Бид 24 цагийн дотор холбогдох болно</p>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl border-2 border-yellow-200 overflow-hidden">
              {/* Quick contact bar */}
              <div className="px-6 py-4 flex items-center gap-4 border-b-2 border-yellow-100"
                style={{ background: 'linear-gradient(135deg, #FF6B9D22, #A855F722)' }}>
                <Phone size={20} className="text-pink-500" />
                <div>
                  <p className="text-xs text-purple-500">Шууд холбогдох</p>
                  <a href="tel:99001234" className="font-bold text-purple-800 hover:text-pink-500 transition-colors">9900-1234</a>
                </div>
                <div className="ml-auto text-sm text-purple-400">эсвэл хүсэлт илгээх ↓</div>
              </div>
              <OrderForm />
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 px-4" style={{ background: '#2D1B69' }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">Бидэнтэй холбогдоорой 📞</h2>
            <p className="text-purple-300 mb-8">Ямар ч асуулт байсан туслахад бэлэн байна</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:99001234"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white shadow-xl text-lg"
                style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                <Phone size={20} />
                9900-1234
              </a>
              <a href="https://instagram.com" target="_blank"
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold border-2 border-purple-500 text-purple-200 hover:border-pink-400 hover:text-pink-300 transition-colors text-lg">
                📱 Instagram
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
