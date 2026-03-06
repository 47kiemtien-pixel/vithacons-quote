import React from 'react';

const QuoteResult = ({ result }) => {
    if (!result) return null;

    const { quote } = result;
    const { package: pkg, totalArea, formattedPrice } = quote;

    return (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mt-8 border border-gray-100">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 sm:p-8 text-white text-center shadow-inner">
                <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2 text-blue-100">Báo giá ước tính</h2>
                <div className="text-3xl sm:text-5xl font-black tracking-tight mb-2 drop-shadow-md">
                    {formattedPrice}
                </div>
                <div className="text-blue-100 text-sm sm:text-base font-medium">
                    Cho tổng diện tích {totalArea} m² ({pkg.name})
                </div>
            </div>

            <div className="p-5 sm:p-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-5 sm:mb-6 flex items-center">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                    Chi tiết vật tư sử dụng
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {Object.entries(pkg.materials).map(([key, value]) => {
                        const labels = {
                            columns: 'Hệ cột',
                            walls: 'Hệ tường',
                            roof: 'Mái',
                            doors: 'Hệ cửa',
                            floor: 'Nền/Sàn',
                            sanitary: 'Thiết bị vệ sinh',
                            electrical: 'Thiết bị điện',
                            water: 'Ống nước/Bồn nước',
                            beams: 'Hệ dầm',
                            floor_slab: 'Sàn tầng',
                            ceiling: 'Trần'
                        };

                        const label = labels[key] || key;

                        return (
                            <div key={key} className="bg-gray-50 rounded-xl p-3 sm:p-4 border border-gray-100 flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                </div>
                                <div className="ml-3 sm:ml-4">
                                    <div className="text-[10px] sm:text-sm font-semibold text-gray-500 mb-0.5 sm:mb-1 uppercase tracking-wider">{label}</div>
                                    <div className="text-gray-900 text-xs sm:text-base font-semibold leading-tight">{value}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 sm:mt-8 bg-blue-50 text-blue-800 p-4 rounded-xl text-xs sm:text-sm leading-relaxed border border-blue-100 flex gap-3 sm:gap-4">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <p>Lưu ý: Báo giá mang tính chất tham khảo. Vui lòng liên hệ với chúng tôi để nhận báo giá chính xác nhất sau khi khảo sát thực tế và lên bản vẽ thiết kế chi tiết.</p>
                </div>
            </div>
        </div>
    );
};

export default QuoteResult;
