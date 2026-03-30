import React from 'react';
import Header from '../components/layout/Header';

// 1. Dữ liệu 6 anh em - Sếp nhớ thay link ảnh thật vào đây
const teamMembers = [
    { 
        name: "Từ Quốc Tuấn", 
        role: "Full Stack", 
        image: "https://i.pinimg.com/originals/e5/f1/c8/e5f1c84e647f45cbe8a974264e8c8c0b.gif" 
    },
    { 
        name: "Trần Thiên Tuệ", 
        role: "Full Stack", 
        image: "https://i.pinimg.com/originals/4f/ed/a4/4feda427244b7da20b85c0f173b9a13b.gif"
    },
    { 
        name: "Hồ Phú Quý", 
        role: "Full Stack", 
        image: "https://i.pinimg.com/1200x/77/79/10/777910b3cd008ff96bd252402f74e3a7.jpg"
    },
    { 
        name: "Nguyễn Đăng Khoa", 
        role: "Full Stack", 
        image: "https://i.pinimg.com/originals/65/c8/90/65c890782049f23f6548f4e948c0b87a.gif"
    },
    { 
        name: "Lê Thanh Huy", 
        role: "Full Stack", 
        image: "https://i.pinimg.com/originals/94/3c/ca/943cca2bfa2586c4c83871121aacb5da.gif"
    },
    { 
        name: "Đỗ Thanh Phong", 
        role: "Full Stack", 
        image: "https://i.pinimg.com/originals/be/12/3c/be123c3a5dcaca96202ea511cb43c8e8.gif"
    },
];

export const AboutUsPage = () => {
    return (
        
        <div className="bg-[#0e0e0e] text-[#e8e2d9] pt-[100px] pb-32 px-6 md:px-12 lg:px-24 min-h-screen">
             <Header />
            {/* PHẦN 1: HERO SECTION - TIÊU ĐỀ TRANG */}
            <div className="max-w-5xl mx-auto text-center mb-24 animate-[fadeUp_0.7s_ease_both]">
                <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-7xl mb-6 italic text-[#c9a84c] drop-shadow-[0_2px_10px_rgba(201,168,76,0.2)]">
                    Về Chúng Tôi
                </h1>
                <p className="text-[11px] uppercase tracking-[0.4em] text-[#444] mb-12">
                    Một lời thề, sáu con người và hành trình tạc nên di sản
                </p>
                <div className="w-24 h-[1px] bg-[#c9a84c]/50 mx-auto"></div>
            </div>

            {/* PHẦN 2: STORY SECTION - CÂU CHUYỆN MỒ HÔI NƯỚC MẮT */}
            <div className="max-w-4xl mx-auto space-y-10 py-16 px-8 border-l border-[#c9a84c]/20 bg-[#111]/30 mb-32 animate-[fadeUp_1s_ease_both] delay-200">
                <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl italic text-[#c9a84c] font-light">
                    Hành Trình Của Mồ Hôi và Màn Đêm
                </h2>
                
                <div className="space-y-6 text-[#e8e2d9]/90 leading-relaxed font-light text-sm md:text-base">
                    <p>
                        “Con trai mẹ đã khổ nhiều rồi...” - Câu nói ấy như một nhịp đập lặng lẽ sau mỗi dòng code, 
                        sau mỗi đêm trắng mà sáu anh em chúng tôi đã cùng nhau đi qua. Không có con đường nào trải đầy hoa hồng, 
                        và để chạm đến cái gọi là <span className="text-[#c9a84c]">"hay nhất trần đời"</span>, cái giá phải trả chưa bao giờ là rẻ.
                    </p>
                    
                    <p className="italic bg-[#1a1a1a] p-5 border-l-2 border-[#c9a84c] text-base md:text-lg">
                        Chúng tôi đã đánh đổi những giấc ngủ yên để đổi lấy sự mượt mà trong từng lần lật trang của bạn.
                    </p>
                    
                    <p>
                        Đó là những đêm trắng, khi cả thành phố đã chìm vào giấc nồng, chỉ còn tiếng lạch cạch của bàn phím và 
                        ánh sáng xanh từ màn hình máy tính phản chiếu lên những gương mặt hốc hác. 
                        Mồ hôi đã đổ trên dòng code, nước mắt đã rơi khi hệ thống lỗi, và từng hơi thở gấp gáp để kịp tiến độ.
                    </p>
                    
                    <p>
                        Web truyện này không chỉ được xây bằng ngôn ngữ lập trình, nó được xây bằng tâm huyết và khát khao của sáu người đàn ông 
                        đã thực sự trưởng thành từ gian khó. Chúng tôi không chỉ làm web. Chúng tôi tạc nên một thánh đường cho những tâm hồn yêu chữ.
                    </p>
                </div>

                <div className="flex justify-start items-center gap-4 pt-10">
                    <div className="w-12 h-[1px] bg-[#c9a84c]"></div>
                    <span className="text-[10px] tracking-[0.5em] uppercase text-[#c9a84c] font-bold">Six Brothers | One Dream</span>
                </div>
            </div>

            {/* PHẦN 3: TEAM SECTION - 6 ANH EM */}
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="font-['Cormorant_Garamond'] text-4xl md:text-5xl italic text-[#e8e2d9] mb-4">
                        Con Người Đứng Sau
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-[#555]">
                        Dàn "hào kiệt" đã đánh đổi màn đêm yên giấc
                    </p>
                </div>

                {/* Grid 6 anh em (1 cột trên mobile, 2 cột trên tablet, 3 cột trên laptop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {teamMembers.map((member, index) => (
                        <div 
                            key={index} 
                            className="group flex flex-col items-center animate-[fadeUp_1s_ease_both]"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            {/* Khung ảnh aspect 3:4 */}
                            <div className="w-full aspect-[3/4] bg-[#1a1a1a] mb-6 overflow-hidden border border-[#1a1a1a] group-hover:border-[#c9a84c]/50 transition-all duration-700 relative shadow-[0_5px_15px_rgba(0,0,0,0.5)] group-hover:shadow-[0_10px_30px_rgba(201,168,76,0.15)]">
                                
                                {/* Lớp overlay màu tối */}
                                <div className="absolute inset-0 bg-[#0e0e0e]/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                                
                                {/* Thẻ img - Tự động để đen trắng, hover hiện màu */}
                                <img 
                                    src={member.image} 
                                    alt={member.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 z-0"
                                />
                                
                                {/* Gradient dưới chân ảnh */}
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0e0e0e] to-transparent z-20"></div>
                            </div>

                            {/* Thông tin tên và chức vụ */}
                            <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#e8e2d9] group-hover:text-[#c9a84c] transition-colors duration-300">
                                {member.name}
                            </h3>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-[#c9a84c]/70 mt-2.5 font-bold italic">
                                {member.role}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* PHẦN 4: FOOTER SECTION - CÂU QUOTE KẾT */}
            <div className="mt-40 text-center max-w-2xl mx-auto border-t border-[#1a1a1a] pt-16 animate-[fadeUp_1s_ease_both] delay-500">
                <p className="font-serif italic text-xl text-[#e8e2d9]/60 leading-relaxed">
                    "Chúng tôi không chỉ xây dựng một trang web. Chúng tôi xây dựng một di sản, nơi mỗi câu chuyện được kể bằng sự tôn trọng tuyệt đối."
                </p>
                <p className="text-[10px] uppercase tracking-[0.5em] text-[#444] mt-8">
                    - The Brotherhood -
                </p>
            </div>
        </div>
    );
};
export default AboutUsPage;