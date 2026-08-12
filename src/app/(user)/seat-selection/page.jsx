import Link from "next/link";

export default function SeatSelection() {
  const rows = Array.from({ length: 10 }, (_, i) => i + 1);
  const selectedSeats = ['1A', '2A'];
  // สมมติว่ามีที่นั่งถูกจองแล้วตามโค้ดเดิม เพื่อให้แสดงผลตาม Legend
  const bookedSeats = ['3A', '5B', '7C', '8D', '10C', '10D'];

  const seatClass = (seatId) => {
    if (selectedSeats.includes(seatId)) return 'bg-[#ed8936] text-white border-[#ed8936]'; // สีส้ม (เลือกแล้ว)
    if (bookedSeats.includes(seatId)) return 'bg-[#006b5e] text-white border-[#006b5e]'; // สีเขียว (ไม่ว่าง)
    return 'border-gray-400 bg-white text-gray-700'; // สีขาวขอบเทา (ว่าง)
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans relative pb-28">
      
      {/* Header */}
      <div className="flex items-center px-4 bg-white h-14 border-b border-gray-100 z-10 shrink-0">
        <Link href="/passenger-info" className="text-gray-700 mr-3 p-1">
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

      <div className="flex-1 px-4 py-5 overflow-y-auto">
        
        {/* Trip Summary Card */}
        <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100">
          <div className="text-[15px] font-bold text-gray-800 flex items-center gap-1.5 mb-1">
            เชียงใหม่
            <svg className="w-3.5 h-3.5 text-[#006b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            เชียงราย
          </div>
          <div className="text-[11px] text-gray-500 mb-4">วันที่ 1 ธันวาคม ค.ศ. 2026</div>
          
          <div className="mb-5 relative">
            <div className="absolute left-[39.5px] top-2 bottom-2 w-[1.5px] bg-[#006b5e] z-0"></div>
            
            <div className="flex items-start mb-2.5 relative z-10">
              <span className="text-[11px] text-gray-600 w-[30px] mt-0.5 shrink-0">09:30</span>
              <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full mt-1 mx-2 shrink-0"></span>
              <span className="text-[12px] font-medium text-gray-800">สถานีขนส่งเชียงใหม่ แห่งที่ 3</span>
            </div>
            
            <div className="flex items-start relative z-10">
              <span className="text-[11px] text-gray-600 w-[30px] mt-0.5 shrink-0">11:45</span>
              <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full mt-1 mx-2 shrink-0"></span>
              <span className="text-[12px] font-medium text-gray-800">สถานีขนส่งเชียงราย แห่งที่ 1</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-6 border border-gray-100 bg-gray-50 rounded flex items-center justify-center shrink-0">
               <span className="text-[6px] font-black italic text-green-600 tracking-tighter">กรีนบัส</span>
            </div>
            <div className="text-[12px] font-bold text-[#006b5e]">
              กรีนบัส <span className="text-[11px] font-normal text-gray-600 ml-1">V-Class (มาตรฐาน ม.1 ก)</span>
            </div>
          </div>
        </div>

        <h3 className="text-[15px] font-bold text-[#006b5e] mb-4">เลือกที่นั่ง</h3>

        {/* Selected Passengers List */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex justify-between items-center bg-[#fbfcfd] border border-[#006b5e] rounded-xl px-4 py-3 shadow-sm">
            <span className="text-[13px] font-medium text-gray-800">1. มีนา สุขสันต์</span>
            <span className="text-[14px] font-bold text-[#006b5e]">1A</span>
          </div>
          <div className="flex justify-between items-center bg-[#fbfcfd] border border-[#006b5e] rounded-xl px-4 py-3 shadow-sm">
            <span className="text-[13px] font-medium text-gray-800">2. เมษา สุขสันต์</span>
            <span className="text-[14px] font-bold text-[#006b5e]">2A</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-10 mb-8">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded border border-gray-400 bg-white"></div>
            <span className="text-[11px] text-[#006b5e] font-semibold">ว่าง</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-[#006b5e] border border-[#006b5e]"></div>
            <span className="text-[11px] text-[#006b5e] font-semibold">ไม่ว่าง</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-[#ed8936] border border-[#ed8936]"></div>
            <span className="text-[11px] text-[#006b5e] font-semibold">เลือกแล้ว</span>
          </div>
        </div>

        {/* Bus Layout */}
        <div className="border border-gray-300 rounded-[24px] p-5 mx-auto max-w-[280px] bg-white shadow-sm">
          <div className="flex justify-between items-center mb-6 px-1">
            {/* Door Icon */}
            <div className="w-8 h-8 flex items-center justify-center border border-gray-400 rounded">
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            {/* Steering Wheel Icon */}
            <div className="w-8 h-8 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            {rows.map((row) => (
              <div key={row} className="flex justify-between">
                {/* Left Side Seats (A, B) */}
                <div className="flex gap-2">
                  {['A', 'B'].map((col) => {
                    const seatId = `${row}${col}`;
                    return (
                      <div
                        key={seatId}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer ${seatClass(seatId)}`}
                      >
                        {seatId}
                      </div>
                    );
                  })}
                </div>
                
                {/* Aisle Spacer */}
                <div className="w-4"></div>
                
                {/* Right Side Seats (C, D) */}
                <div className="flex gap-2">
                  {['C', 'D'].map((col) => {
                    const seatId = `${row}${col}`;
                    return (
                      <div
                        key={seatId}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg text-[13px] font-medium transition-all duration-200 cursor-pointer ${seatClass(seatId)}`}
                      >
                        {seatId}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa] to-transparent flex justify-center pb-8 z-20 pointer-events-none">
        <Link 
          href="/payment" 
          className="bg-[#006b5e] hover:bg-[#005a4e] text-white font-semibold py-3.5 px-8 rounded-full w-full max-w-[280px] text-center shadow-[0_4px_12px_rgba(0,107,94,0.3)] transition-all pointer-events-auto text-[15px]"
        >
          ยืนยันที่นั่ง
        </Link>
      </div>
      
    </div>
  );
}