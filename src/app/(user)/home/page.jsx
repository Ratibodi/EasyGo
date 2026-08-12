import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      
      {/* Header (System Status / Title) */}
      <div className="flex items-center px-4 bg-white h-14 border-b border-gray-100 z-10 shrink-0">
        <button className="text-gray-700 mr-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
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

      {/* App Bar (Logo & Menu) */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shadow-sm shrink-0">
        <div className="flex items-center text-[#006b5e]">
          {/* Logo Icon */}
          <svg className="w-6 h-6 mr-1" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16C4 16.55 4.45 17 5 17H6V19C6 19.55 6.45 20 7 20C7.55 20 8 19.55 8 19V17H16V19C16 19.55 16.45 20 17 20C17.55 20 18 19.55 18 19V17H19C19.55 17 20 16.55 20 16V6C20 2.5 16.42 2 12 2C7.58 2 4 2.5 4 6V16ZM7.5 14C6.67 14 6 13.33 6 12.5C6 11.67 6.67 11 7.5 11C8.33 11 9 11.67 9 12.5C9 13.33 8.33 14 7.5 14ZM16.5 14C15.67 14 15 13.33 15 12.5C15 11.67 15.67 11 16.5 11C17.33 11 18 11.67 18 12.5C18 13.33 17.33 14 16.5 14ZM18 9H6V6C6 5.1 7.46 4 12 4C16.54 4 18 5.1 18 6V9Z" />
          </svg>
          <span className="text-[18px] font-bold tracking-tight">EasyGo</span>
        </div>
        <button className="text-[#006b5e] p-1">
          {/* Hamburger Menu */}
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 px-4 py-5 overflow-y-auto">
        
        {/* Search Card */}
        <div className="bg-[#eef8f2] border border-[#d1e8dc] rounded-xl p-5 mb-8 shadow-sm">
          <h2 className="text-[16px] font-bold text-[#006b5e] mb-5 text-center">ค้นหาการเดินทางของคุณ</h2>

          {/* Form Fields */}
          <div className="flex flex-col gap-4">
            
            {/* Origin Input */}
            <div className="relative mt-1">
              <label className="absolute -top-2.5 left-3 bg-[#eef8f2] px-1 text-[11px] text-gray-500 font-medium z-10">ต้นทาง</label>
              <div className="flex items-center border border-[#9fc1b0] rounded-md px-3 py-2.5 bg-transparent relative">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input type="text" defaultValue="เชียงใหม่" className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium ml-2" />
              </div>
            </div>

            {/* Destination Input */}
            <div className="relative mt-1">
              <label className="absolute -top-2.5 left-3 bg-[#eef8f2] px-1 text-[11px] text-gray-500 font-medium z-10">ปลายทาง</label>
              <div className="flex items-center border border-[#9fc1b0] rounded-md px-3 py-2.5 bg-transparent relative">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <input type="text" defaultValue="เชียงราย" className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium ml-2" />
              </div>
            </div>

            {/* Date Input */}
            <div className="relative mt-1">
              <label className="absolute -top-2.5 left-3 bg-[#eef8f2] px-1 text-[11px] text-gray-500 font-medium z-10">วันที่เดินทาง</label>
              <div className="flex items-center border border-[#9fc1b0] rounded-md px-3 py-2.5 bg-transparent relative">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input type="text" defaultValue="01/12/2026" className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium ml-2" />
              </div>
            </div>

            {/* Passengers Input */}
            <div className="relative mt-1">
              <label className="absolute -top-2.5 left-3 bg-[#eef8f2] px-1 text-[11px] text-gray-500 font-medium z-10">จำนวนผู้โดยสาร</label>
              <div className="flex items-center border border-[#9fc1b0] rounded-md px-3 py-2.5 bg-transparent relative">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <input type="text" defaultValue="1 ท่าน" className="bg-transparent border-none outline-none w-full text-sm text-gray-700 font-medium ml-2" />
              </div>
            </div>

          </div>

          <Link href="/trips" className="block text-center mt-6 bg-[#006b5e] hover:bg-[#005a4e] text-white font-medium py-3 rounded-md transition-colors text-[15px]">
            ค้นหาเที่ยวรถ
          </Link>
        </div>

        {/* Popular Routes */}
        <h3 className="text-[16px] font-bold text-[#006b5e] mb-4">เส้นทางยอดนิยม</h3>

        <div className="flex flex-col gap-3 pb-6">
          
          {/* Route 1 */}
          <div className="h-[140px] rounded-xl bg-cover bg-center relative overflow-hidden shadow-sm"
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=1000&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            <div className="absolute bottom-3 w-full text-center">
              <span className="text-white font-medium text-[13px]">เชียงราย ไป เชียงใหม่</span>
            </div>
          </div>
          
          {/* Route 2 */}
          <div className="h-[140px] rounded-xl bg-cover bg-center relative overflow-hidden shadow-sm"
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1598974357801-bca280145cbe?q=80&w=1000&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            <div className="absolute bottom-3 w-full text-center">
              <span className="text-white font-medium text-[13px]">เชียงใหม่ ไป พะเยา</span>
            </div>
          </div>
          
          {/* Route 3 */}
          <div className="h-[140px] rounded-xl bg-cover bg-center relative overflow-hidden shadow-sm"
               style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558256515-5c1dc2e1dc55?q=80&w=1000&auto=format&fit=crop')" }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
            <div className="absolute bottom-3 w-full text-center">
              <span className="text-white font-medium text-[13px]">เชียงใหม่ ไป เชียงราย</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}