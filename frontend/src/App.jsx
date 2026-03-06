import { useState, useEffect, useRef } from 'react';
import PackageCard from './components/PackageCard';
import QuoteResult from './components/QuoteResult';
import './index.css';

function App() {
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [area, setArea] = useState('');
  const [floors, setFloors] = useState(1);
  const [quoteResult, setQuoteResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const resultRef = useRef(null);
  const areaSectionRef = useRef(null);
  const packageSectionRef = useRef(null);
  const floorSectionRef = useRef(null);

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setFieldErrors(prev => ({ ...prev, package: null }));
    if (pkg.is_multi_story && (!floors || floors < 2)) {
      setFloors(2);
    }
  };

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    fetch(`${apiUrl}/api/packages`)
      .then(res => res.json())
      .then(data => setPackages(data))
      .catch(err => console.error("Error fetching packages:", err));
  }, []);

  const handleCalculate = async (e) => {
    e.preventDefault();
    setFieldErrors({});
    setError('');

    if (!area || isNaN(area) || area <= 0) {
      setFieldErrors({ area: 'Vui lòng nhập diện tích hợp lệ' });
      setTimeout(() => areaSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      return;
    }
    if (!selectedPackage) {
      setFieldErrors({ package: 'Vui lòng chọn một gói xây dựng' });
      setTimeout(() => packageSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      return;
    }
    if (selectedPackage.is_multi_story && (!floors || isNaN(floors) || floors < 2)) {
      setFieldErrors({ floors: 'Vui lòng nhập số tầng (ít nhất là 2 tầng)' });
      setTimeout(() => floorSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 50);
      return;
    }

    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/quote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area,
          packageId: selectedPackage.id,
          floors: selectedPackage.is_multi_story ? floors : 1
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setQuoteResult(data);
        // Scroll to the result
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        setError(data.error || 'Có lỗi xảy ra khi tính báo giá');
      }
    } catch (err) {
      setError('Lỗi kết nối đến máy chủ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-32">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg">VH</div>
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Vithacon<span className="text-blue-600">Quote</span></h1>
          </div>
          <p className="hidden md:block text-gray-500 font-medium text-sm">Báo Giá Nhà Lắp Ghép Thép Tiền Chế</p>
          <div className="flex gap-2 sm:hidden">
            <a href="https://www.facebook.com/VITHACONS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
            </a>
            <a href="tel:0972524799" className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight">Dự toán chi phí xây dựng nhanh chóng</h2>
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed px-4">Nhập diện tích và chọn gói vật tư để nhận báo giá tức thì.</p>
        </div>

        <form onSubmit={handleCalculate} className="space-y-10 sm:space-y-12">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 flex items-center text-sm font-bold mx-2 shadow-sm animate-fade-in-up">
              <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
              {error}
            </div>
          )}

          {/* Section 1: Inputs */}
          <section ref={areaSectionRef} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 scroll-mt-24 sm:scroll-mt-28">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-gray-800">
              <span className="bg-blue-100 text-blue-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm mr-3">1</span>
              Thông tin công trình
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Diện tích xây dựng (m²)</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    inputMode="numeric"
                    value={area}
                    onChange={(e) => {
                      setArea(e.target.value);
                      if (fieldErrors.area) setFieldErrors(prev => ({ ...prev, area: null }));
                    }}
                    placeholder="Nhập diện tích"
                    className={`w-full pl-4 pr-16 py-4 rounded-xl border-2 outline-none transition-all text-lg font-bold ${fieldErrors.area ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500'}`}
                  />
                  <div className="absolute right-4 text-gray-400 font-bold pointer-events-none">m²</div>
                </div>
                {fieldErrors.area && <p className="mt-2 text-sm text-red-600 font-bold animate-fade-in-up">{fieldErrors.area}</p>}
              </div>

              {selectedPackage?.is_multi_story && (
                <div className="animate-fade-in-up scroll-mt-24 sm:scroll-mt-28" ref={floorSectionRef}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Số tầng</label>
                  <div className="relative flex items-center">
                    <input
                      type="number"
                      inputMode="numeric"
                      min="2"
                      value={floors}
                      onChange={(e) => {
                        setFloors(e.target.value);
                        if (fieldErrors.floors) setFieldErrors(prev => ({ ...prev, floors: null }));
                      }}
                      className={`w-full pl-4 pr-16 py-4 rounded-xl border-2 outline-none transition-all text-lg font-bold ${fieldErrors.floors ? 'border-red-400 bg-red-50 focus:border-red-500' : 'border-gray-100 bg-gray-50 focus:bg-white focus:border-blue-500'}`}
                    />
                    <div className="absolute right-4 text-gray-400 font-bold pointer-events-none">tầng</div>
                  </div>
                  {fieldErrors.floors && <p className="mt-2 text-sm text-red-600 font-bold animate-fade-in-up">{fieldErrors.floors}</p>}
                </div>
              )}
            </div>
          </section>

          {/* Section 2: Packages */}
          <section ref={packageSectionRef} className="scroll-mt-24 sm:scroll-mt-28">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 flex items-center text-gray-800 px-2">
              <span className="bg-blue-100 text-blue-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm mr-3">2</span>
              Chọn gói xây dựng
            </h3>

            {fieldErrors.package && (
              <div className="mb-6 bg-red-50 text-red-600 p-3 rounded-xl border border-red-200 flex items-center text-sm font-bold mx-2 animate-fade-in-up">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                {fieldErrors.package}
              </div>
            )}

            {packages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Đang tải các gói báo giá...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
                {packages.map(pkg => (
                  <PackageCard
                    key={pkg.id}
                    pkg={pkg}
                    isSelected={selectedPackage?.id === pkg.id}
                    onSelect={handleSelectPackage}
                  />
                ))}
              </div>
            )}
          </section>

          <div className="text-center pt-4 sm:pt-8 bg-gray-50 sticky bottom-20 z-40 sm:static pb-4 shadow-top sm:shadow-none">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 sm:py-5 px-10 sm:px-14 rounded-2xl sm:rounded-full shadow-xl hover:shadow-2xl transition-all transform active:scale-95 text-lg sm:text-xl flex items-center justify-center mx-auto w-[90%] sm:w-auto"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Đang tính toán...
                </>
              ) : (
                'Nhận báo giá ngay'
              )}
            </button>
          </div>
        </form>

        {quoteResult && (
          <div className="mt-8 sm:mt-12 animate-fade-in-up pb-10 scroll-mt-24 sm:scroll-mt-28" ref={resultRef}>
            <QuoteResult result={quoteResult} />
          </div>
        )}
      </main>

      {/* Sticky Mobile Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 px-6 flex items-center justify-between z-50 shadow-2xl-top sm:hidden">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Tư vấn ngay</span>
          <span className="text-blue-600 font-black text-lg">097.252.4799</span>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <a href="https://www.facebook.com/VITHACONS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
          <a href="https://zalo.me/0972524799" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm4.5 13.5h-9a.5.5 0 01-.5-.5v-6a.5.5 0 01.5-.5h9a.5.5 0 01.5.5v6a.5.5 0 01-.5.5zM12 9a1 1 0 100 2 1 1 0 000-2zm0 4a1 1 0 100 2 1 1 0 000-2z"></path></svg>
          </a>
          <a href="tel:0972524799" className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-200">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
