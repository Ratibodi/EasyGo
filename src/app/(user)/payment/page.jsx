import Link from "next/link";

export default function Payment() {
  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      
      {/* Header (System Status / Title) */}
      <div className="flex items-center px-4 bg-white h-14 border-b border-gray-100 z-10 shrink-0">
        <Link href="/seat-selection" className="text-gray-700 mr-3 p-1">
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

      {/* App Bar (Logo & Menu) */}
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
        <h2 className="text-[16px] font-bold text-[#006b5e] mb-4">ชำระเงิน</h2>

        {/* QR Code & Price Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 shadow-sm">
          <div className="flex justify-center mb-6 mt-2">
            <div className="border border-gray-100 rounded-2xl p-4 shadow-sm w-48 h-48 bg-white relative">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                alt="QR Code"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-green-100/50 blur-sm rounded-full"></div>
            </div>
          </div>

          <div className="mb-1">
            <span className="text-sm text-gray-500">ราคาตั๋ว (2 × 300 บาท)</span>
          </div>
          <div className="flex justify-between items-end border-b-[1.5px] border-dotted border-gray-300 pb-2">
            <span className="text-sm font-bold text-gray-800">ยอดรวมสุทธิ</span>
            <span className="text-lg font-bold text-[#006b5e]">฿ 600.00</span>
          </div>
        </div>

        {/* Booking Details Card */}
        <div className="bg-[#e9f2ee] rounded-xl p-5 mb-6">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-[11px] text-gray-500 mb-1">รหัสการจอง</div>
              <div className="text-sm font-semibold text-gray-800">#CHR-8829-TH</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-gray-500 mb-1">วันที่เดินทาง</div>
              <div className="text-sm font-semibold text-gray-800">01/12/2026</div>
            </div>
          </div>

          <div className="mb-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-[44px] top-2 bottom-6 w-[1.5px] bg-[#006b5e] z-0"></div>
            
            {/* Boarding Point */}
            <div className="flex items-start mb-5 relative z-10">
              <span className="text-[11px] font-medium text-gray-600 w-9 mt-0.5 shrink-0">09:30</span>
              <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full mt-1 mx-2 shrink-0 border-2 border-[#e9f2ee]"></span>
              <div>
                <div className="text-xs font-semibold text-gray-700">จุดขึ้นรถ</div>
                <div className="text-[11px] text-gray-500">สถานีขนส่งเชียงใหม่ แห่งที่ 3</div>
              </div>
            </div>

            {/* Drop-off Point */}
            <div className="flex items-start relative z-10">
              <span className="text-[11px] font-medium text-gray-600 w-9 mt-0.5 shrink-0">11:45</span>
              <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full mt-1 mx-2 shrink-0 border-2 border-[#e9f2ee]"></span>
              <div>
                <div className="text-xs font-semibold text-gray-700">จุดลงรถ</div>
                <div className="text-[11px] text-gray-500">สถานีขนส่งเชียงราย แห่งที่ 1</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-1">
            <div>
              <div className="text-[11px] text-gray-500 mb-1">ประเภทรถ</div>
              <div className="text-[13px] font-semibold text-[#006b5e]">
                กรีนบัส <span className="text-[11px] font-normal text-gray-600 ml-1">V-Class (มาตรฐาน ม.1 ก)</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-gray-500 mb-1">เลขที่นั่ง</div>
              <div className="text-[13px] font-semibold text-gray-800">A1, A2</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-6">
          <button className="w-full bg-white border border-[#006b5e] text-[#006b5e] font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            อัปโหลดสลิปการโอนเงิน
          </button>

          <Link href="/home" className="w-full bg-[#006b5e] hover:bg-[#005a4e] text-white font-semibold py-3 rounded-lg text-center transition-colors shadow-sm text-sm">
            ยืนยันการชำระเงิน
          </Link>
        </div>
      </div>
    </div>
  );
}