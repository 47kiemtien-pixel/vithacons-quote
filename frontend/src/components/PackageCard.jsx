import React from 'react';

const PackageCard = ({ pkg, isSelected, onSelect }) => {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <div
            onClick={() => onSelect(pkg)}
            className={`cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 border-2 flex flex-col h-full bg-white shadow-sm hover:shadow-md
        ${isSelected ? 'border-blue-600 shadow-blue-100 ring-4 ring-blue-50 transform scale-102' : 'border-gray-200 hover:border-blue-300'}
      `}
        >
            {pkg.image_url && (
                <div className="h-40 sm:h-48 w-full overflow-hidden">
                    <img
                        src={`/bao-gia${pkg.image_url}`}
                        alt={pkg.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                </div>
            )}
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-4 h-10 sm:h-12 leading-relaxed">{pkg.description}</p>

                <div className="mb-4 sm:mb-6 pb-4 border-b border-gray-100">
                    <span className="text-2xl sm:text-3xl font-black text-blue-600">{formatPrice(pkg.base_price)}</span>
                    <span className="text-gray-500 text-xs sm:text-sm"> / m²</span>
                </div>

                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <li className="flex items-start text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="leading-snug"><strong>Cột:</strong> {pkg.materials.columns}</span>
                    </li>
                    <li className="flex items-start text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="leading-snug"><strong>Tường:</strong> {pkg.materials.walls}</span>
                    </li>
                    <li className="flex items-start text-xs sm:text-sm text-gray-700">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="leading-snug"><strong>Sàn:</strong> {pkg.materials.floor}</span>
                    </li>
                </ul>
            </div>

            <div className="px-4 pb-4 mt-auto">
                <button className={`w-full py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all shadow-sm
                    ${isSelected ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}
                `}>
                    {isSelected ? 'Đã Chọn' : 'Chọn Gói Này'}
                </button>
            </div>
        </div>
    );
};

export default PackageCard;
