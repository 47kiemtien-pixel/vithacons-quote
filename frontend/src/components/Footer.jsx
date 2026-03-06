import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16 px-4 border-t border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
                {/* Brand & Mission */}
                <div className="space-y-6">
                    <div className="flex items-center">
                        <img src="images/logo.png" alt="Vithacons Logo" className="h-10 sm:h-12 w-auto brightness-0 invert" />
                    </div>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg">
                        Công Ty TNHH Cơ Khí Xây Dựng Thương Mại Việt Thành (Vithacons) tự hào là đơn vị uy tín trong lĩnh vực thiết kế, thi công nhà thép tiền chế và xây dựng dân dụng. Chúng tôi cam kết chất lượng, tiến độ và giải pháp tối ưu chi phí.
                    </p>
                    <div className="flex gap-4">
                        <a href="https://www.facebook.com/VITHACONS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </a>
                        <a href="tel:0972524799" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                        </a>
                    </div>
                </div>

                {/* Company Info */}
                <div className="space-y-6">
                    <h4 className="text-white font-bold text-lg uppercase tracking-wider">Thông tin liên hệ</h4>
                    <div className="space-y-4 text-sm sm:text-base">
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0v1m-4 0a2 2 0 014 0v1"></path></svg>
                            <p><strong>GPĐKKD:</strong> 3702556996 - Cấp ngày 25/4/2017</p>
                        </div>
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            <p><strong>Người đại diện:</strong> Lê Quang Khải</p>
                        </div>
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            <p><strong>Trụ sở:</strong> 122/118, KP. Tân Lập, P. Đông Hòa, TP. Hồ Chí Minh</p>
                        </div>
                        <div className="flex gap-3">
                            <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 10h5m-5 4h5m2-24v.01M19 9h.01M19 13h.01M19 17h.01"></path></svg>
                            <p><strong>Văn phòng:</strong> Milano ML127 KĐT Ecocity Premia, P. Tân An, Đắk Lắk</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-500">
                <p>&copy; {currentYear} Bản quyền thuộc về Công Ty TNHH Cơ Khí Xây Dựng Thương Mại Việt Thành (Vithacons).</p>
            </div>
        </footer>
    );
};

export default Footer;
