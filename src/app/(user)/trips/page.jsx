import Link from "next/link";

export default function Trips() {
  const trips = [
    { time: '09:30', arr: '11.45', dur: '2 ชั่วโมง 15 นาที', price: '300', cls: 'V-Class (มาตรฐาน ม.1 ก)', brand: 'กรีนบัส', dest: 'สถานีขนส่งเชียงราย แห่งที่ 1', logoColor: 'text-green-600' },
    { time: '09:30', arr: '11.45', dur: '2 ชั่วโมง 15 นาที', price: '400', cls: 'VX-Class (มาตรฐานผสม ม.1 กข)', brand: 'กรีนบัส', dest: 'สถานีขนส่งเชียงราย แห่งที่ 1', logoColor: 'text-green-600' },
    { time: '09:30', arr: '11.45', dur: '2 ชั่วโมง 15 นาที', price: '300', cls: 'Gold Class', brand: 'นครชัยแอร์', dest: 'สถานีขนส่งเชียงราย แห่งที่ 2', logoColor: 'text-blue-700' },
    { time: '09:30', arr: '11.45', dur: '2 ชั่วโมง 15 นาที', price: '300', cls: 'Supreme Class (ม1ก)', brand: 'สมบัติทัวร์', dest: 'สถานีขนส่งเชียงราย แห่งที่ 2', logoColor: 'text-blue-500' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      
      {/* Header */}
      <div className="flex items-center px-4 bg-white h-14 border-b border-gray-100 z-10 shrink-0">
        <Link href="/home" className="text-gray-700 mr-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-[14px] font-bold text-gray-900 leading-tight">Title 2 Line Left</h1>
          <span className="text-[11px] text-gray-500 leading-tight">Subtitle</span>
        </div>
        <button className="text-gray-700 ml-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* App Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm shrink-0">
        <div className="flex items-center text-[#006b5e]">
          <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16C4 16.55 4.45 17 5 17H6V19C6 19.55 6.45 20 7 20C7.55 20 8 19.55 8 19V17H16V19C16 19.55 16.45 20 17 20C17.55 20 18 19.55 18 19V17H19C19.55 17 20 16.55 20 16V6C20 2.5 16.42 2 12 2C7.58 2 4 2.5 4 6V16ZM7.5 14C6.67 14 6 13.33 6 12.5C6 11.67 6.67 11 7.5 11C8.33 11 9 11.67 9 12.5C9 13.33 8.33 14 7.5 14ZM16.5 14C15.67 14 15 13.33 15 12.5C15 11.67 15.67 11 16.5 11C17.33 11 18 11.67 18 12.5C18 13.33 17.33 14 16.5 14ZM18 9H6V6C6 5.1 7.46 4 12 4C16.54 4 18 5.1 18 6V9Z" />
          </svg>
          <span className="text-[18px] font-bold tracking-tight">EasyGo</span>
        </div>
        <button className="text-[#006b5e] p-1">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        
        {/* Search Summary Card */}
        <div className="bg-white px-5 py-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center mb-4">
          <div>
            <h2 className="text-[15px] font-bold text-gray-800 flex items-center gap-1.5 mb-1">
              เชียงใหม่ 
              <svg className="w-4 h-4 text-[#006b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              เชียงราย
            </h2>
            <div className="text-[12px] text-gray-500 flex items-center gap-2">
              01 ธันวาคม 2026 
              <svg className="w-3.5 h-3.5 text-[#006b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              2 ท่าน
            </div>
          </div>
          <button className="bg-[#e9f2ee] w-10 h-10 rounded-full flex items-center justify-center text-[#006b5e] shrink-0 hover:bg-[#d8ebe1] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
        </div>

        {/* Date Selector */}
        <div className="flex gap-2 mb-5">
          <div className="flex-1 bg-[#e2e8f0] text-gray-500 flex justify-center items-center py-2 rounded-full text-[13px] font-medium">
            30 พ.ย.
          </div>
          <div className="flex-[1.5] bg-white border border-[#006b5e] text-[#006b5e] px-3 py-2 rounded-full text-[13px] font-bold flex justify-between items-center shadow-sm">
            <span>&lt;</span>
            <span>01 ธ.ค. 2026</span>
            <span>&gt;</span>
          </div>
          <div className="flex-1 bg-[#e2e8f0] text-gray-500 flex justify-center items-center py-2 rounded-full text-[13px] font-medium">
            02 ธ.ค.
          </div>
        </div>

        {/* Filter and Sort */}
        <div className="flex justify-around text-[13px] font-bold text-[#006b5e] mb-4">
          <button className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-8m-4 8l-4-8" />
            </svg>
            เรียงข้อมูล
          </button>
          <button className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            ตัวกรองข้อมูล
          </button>
        </div>

        {/* Trip List */}
        <div className="flex flex-col gap-3 pb-6">
          {trips.map((trip, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border border-[#006b5e] shadow-[0_2px_8px_rgba(0,107,94,0.08)]">
              
              {/* Header: Time and Price */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[17px] font-bold text-gray-900">{trip.time}</span>
                  <svg className="w-3.5 h-3.5 text-[#006b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="text-[17px] font-bold text-gray-900">{trip.arr}</span>
                  <span className="text-[10px] text-gray-500 font-medium ml-1">({trip.dur})</span>
                </div>
                <div className="text-[17px] font-bold text-[#006b5e]">฿ {trip.price}</div>
              </div>

              {/* Timeline Route */}
              <div className="relative pl-1 mb-4">
                <div className="absolute left-[7.5px] top-2 bottom-2 w-[1.5px] bg-[#006b5e]"></div>
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full shrink-0"></span>
                  <span className="text-[12px] font-medium text-gray-800">สถานีขนส่งเชียงใหม่ แห่งที่ 3</span>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full shrink-0"></span>
                  <span className="text-[12px] font-medium text-gray-800">{trip.dest}</span>
                </div>
              </div>

              {/* Footer: Brand, Class and Action */}
              <div className="flex justify-between items-end border-t border-gray-100 pt-3">
                <div className="flex items-center gap-3">
                  {/* Brand Logo Placeholder */}
                  <div className="w-11 h-8 border border-gray-100 bg-gray-50 rounded flex items-center justify-center shrink-0">
                    <span className={`text-[8px] font-black italic tracking-tighter ${trip.logoColor}`}>
                      {trip.brand.substring(0, 3)}
                    </span>
                  </div>
                  <div className="flex flex-col border-l-[1.5px] border-gray-200 pl-2">
                    <span className="text-[12px] font-bold text-[#006b5e] leading-tight">{trip.brand}</span>
                    <span className="text-[11px] text-gray-500 leading-tight mt-0.5">{trip.cls}</span>
                  </div>
                </div>
                
                <Link href="/passenger-info" className="bg-[#006b5e] hover:bg-[#005a4e] text-white px-5 py-1.5 rounded-lg text-[13px] font-medium shrink-0 transition-colors shadow-sm">
                  จองเลย
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}