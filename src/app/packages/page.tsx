'use client';
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/ChatWidget';
import { Phone } from 'lucide-react';

interface Package {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
  category: string;
  images: string[];
  features: string[];
}

const demoPackages: Package[] = [
  { _id: '1', title: 'Хүүхдийн баяр', description: 'Хамгийн тусгай хүүхдийн баярыг зохион байгуулья!', price: 450000, duration: '2 цаг', category: 'Хүүхдийн баяр', images: [], features: ['Мэргэжлийн аниматор', 'Тоглоом нааш', 'Дуу хөгжим', 'Гэрэл зураг'] },
  { _id: '2', title: 'Төрсөн өдрийн тоглолт', description: 'Хүүхдийнхээ төрсөн өдрийг мартагдашгүй болгоё!', price: 380000, duration: '2 цаг', category: 'Төрсөн өдөр', images: [], features: ['Торт таслах ёслол', 'Хүүхдийн наадгай', 'Хөгжмийн шоу', 'Бяслаг'] },
  { _id: '3', title: 'Цэцэрлэгийн төгсөлт', description: 'Хүүхдийнхээ анхны их алхамыг тэмдэглэе!', price: 650000, duration: '3 цаг', category: 'Цэцэрлэгийн төгсөлт', images: [], features: ['Дипломын ёслол', 'Концерт тоглолт', 'Гэрэл зургийн уулзалт', 'Хоол унд'] },
  { _id: '4', title: 'Сэвлэг үргээх ёслол', description: 'Монгол ёс заншлаа дагасан тусгай ёслол', price: 550000, duration: '2.5 цаг', category: 'Сэвлэг үргээх', images: [], features: ['Уламжлалт ёслол', 'Монгол хувцас', 'Хуур бүжиг', 'Найр дэлгэмж'] },
  { _id: '5', title: 'Үсэглэлийн баяр', description: 'Сурлагын эхлэлийг тэмдэглэх тусгай баяр', price: 420000, duration: '2 цаг', category: 'Үсэглэлийн баяр', images: [], features: ['Цагаан толгойн бичлэг', 'Хүүхдийн дуу', 'Тоглоом', 'Бэлэг'] },
  { _id: '6', title: '5-р ангийн төгсөлт', description: 'Анхны шат дуусан агуу мөчийг тэмдэглэе!', price: 720000, duration: '3 цаг', category: '5-р ангийн төгсөлт', images: [], features: ['Дипломын өгөх ёслол', 'Шагнал гардуулга', 'Тоглолт концерт', 'Гэрэл зураг'] },
];

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>(demoPackages);

  useEffect(() => {
    fetch('/api/packages').then(r => r.json()).then(data => {
      if (Array.isArray(data) && data.length > 0) setPackages(data);
    }).catch(() => {});
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-16" style={{ background: '#FFF9F0' }}>
        <section className="py-16 text-center px-4" style={{ background: 'linear-gradient(135deg, #FDF4FF, #F0FDFF)' }}>
          <span className="text-5xl">🎪</span>
          <h1 className="text-4xl font-black mt-3 mb-3" style={{ color: '#2D1B69' }}>Тоглолтын төрлүүд</h1>
          <p className="text-purple-500 max-w-xl mx-auto">Таны арга хэмжээнд тохирсон захиалгат хөтөлбөрийг сонгоорой</p>
        </section>

        <section className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map(pkg => (
            <div key={pkg._id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border-2 border-transparent hover:border-pink-200">
              {pkg.images?.[0] ? (
                <img src={pkg.images[0]} alt={pkg.title} className="w-full h-48 object-cover" />
              ) : (
                <div className="h-48 flex items-center justify-center text-7xl"
                  style={{ background: 'linear-gradient(135deg, #FF6B9D22, #A855F722)' }}>
                  🎉
                </div>
              )}
              <div className="p-6">
                <span className="text-xs font-bold px-3 py-1 rounded-full text-pink-600 bg-pink-50">{pkg.category}</span>
                <h2 className="text-xl font-black mt-3 mb-2" style={{ color: '#2D1B69' }}>{pkg.title}</h2>
                <p className="text-purple-500 text-sm mb-4">{pkg.description}</p>
                <ul className="space-y-1 mb-4">
                  {pkg.features?.slice(0, 4).map((f, i) => (
                    <li key={i} className="text-sm text-purple-600 flex items-center gap-2">
                      <span className="text-green-500">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-400">Үнэ</p>
                    <p className="text-2xl font-black text-pink-500">{pkg.price.toLocaleString()}₮</p>
                    <p className="text-xs text-purple-400">⏱ {pkg.duration}</p>
                  </div>
                  <a href="/#order"
                    className="px-5 py-2.5 rounded-2xl font-bold text-white text-sm hover:shadow-lg transition-all"
                    style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
                    Захиалах 🎉
                  </a>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="py-16 text-center px-4" style={{ background: 'linear-gradient(135deg, #2D1B69, #4C1D95)' }}>
          <h2 className="text-2xl font-black text-white mb-3">Танд тохирсон хөтөлбөр байхгүй юу? 🤔</h2>
          <p className="text-purple-300 mb-6">Захиалгат хөтөлбөр боловсруулна. Холбогдоно уу!</p>
          <a href="tel:99001234"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white text-lg"
            style={{ background: 'linear-gradient(135deg, #FF6B9D, #A855F7)' }}>
            <Phone size={20} /> 9900-1234
          </a>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
