import React, { useState } from 'react';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-100 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-5 sm:py-6 flex items-center justify-between text-left focus:outline-none group transition-all"
            >
                <span className={`text-base sm:text-lg font-bold pr-4 transition-colors ${isOpen ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-500'}`}>
                    {question}
                </span>
                <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="text-gray-600 text-sm sm:text-base leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100/50 whitespace-pre-line">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    const faqData = [
        {
            question: "Việt Thành Construction có bao nhiêu năm kinh nghiệm?",
            answer: "Chúng tôi tự hào có trên 10 năm kinh nghiệm chuyên sâu trong lĩnh vực thi công kết cấu thép và xây dựng dân dụng. Công ty được cấp phép ĐKKD từ năm 2017, đảm bảo uy tín và tính pháp lý cao cho mọi công trình."
        },
        {
            question: "Công ty cung cấp những dịch vụ xây dựng nào?",
            answer: "Việt Thành chuyên cung cấp các giải pháp toàn diện bao gồm:\n- Nhà Thép Tiền Chế (Kho xưởng, showroom, nhà hàng...)\n- Xây Dựng Dân Dụng (Thiết kế & thi công nhà phố, biệt thự)\n- Thiết Kế & Lắp Đặt Thang Máy hiện đại\n- Bảo Dưỡng Cầu Trục định kỳ."
        },
        {
            question: "Quy trình làm việc của Việt Thành như thế nào?",
            answer: "Chúng tôi áp dụng quy trình 6 bước chuyên nghiệp:\n1. Tiếp nhận nhu cầu.\n2. Khảo sát & tư vấn miễn phí.\n3. Báo giá chi tiết, minh bạch.\n4. Ký kết hợp đồng.\n5. Thi công chuyên nghiệp (giám sát 24/24).\n6. Nghiệm thu & bảo hành dài hạn."
        },
        {
            question: "Tại sao nên chọn Việt Thành thay vì các đơn vị khác?",
            answer: "Khách hàng tin chọn Việt Thành vì:\n- Khảo sát tận nơi hoàn toàn miễn phí.\n- Giám sát thi công trực tiếp 24/24 đảm bảo đúng tiến độ.\n- Cam kết tuyệt đối không phát sinh chi phí ngoài hợp đồng.\n- Đội ngũ kỹ sư giàu kinh nghiệm, tận tâm."
        },
        {
            question: "Việt Thành nhận thi công ở những khu vực nào?",
            answer: "Chúng tôi nhận mọi dự án tại:\n- Đắk Lắk (TP. Buôn Ma Thuột và tất cả các huyện).\n- Gia Lai, Lâm Đồng.\n- Khu vực Miền Nam: TP. Hồ Chí Minh, Bình Dương, Đồng Nai.\nĐối với các tỉnh xa, chúng tôi ưu tiên các dự án quy mô lớn như nhà xưởng, showroom để đảm bảo hiệu quả vận hành tối ưu cho khách hàng."
        },
        {
            question: "Tôi có được tư vấn và khảo sát miễn phí không?",
            answer: "Chắc chắn rồi! Ngay khi tiếp nhận thông tin, Việt Thành sẽ cử kỹ sư đến khảo sát thực tế và tư vấn giải pháp tối ưu nhất cho bạn mà không thu bất kỳ khoản phí nào."
        }
    ];

    return (
        <section className="mt-16 sm:mt-24 mb-16 animate-fade-in-up">
            <div className="text-center mb-10 sm:mb-12">
                <h2 className="text-2xl sm:text-4xl font-black text-gray-900 mb-4">Câu Hỏi Thường Gặp</h2>
                <div className="h-1.5 w-20 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 sm:p-10">
                <div className="divide-y divide-gray-100">
                    {faqData.map((item, index) => (
                        <FAQItem key={index} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
