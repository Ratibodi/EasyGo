"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function TripsContent() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'เชียงใหม่';
  const to = searchParams.get('to') || 'เชียงราย';
  const date = searchParams.get('date') || '01/12/2026';
  const pax = searchParams.get('pax') || '1 ท่าน';

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter and Sort State
  const [sortOption, setSortOption] = useState('time-asc');
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/trips?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`);
        const data = await res.json();
        if (data.success) {
          setTrips(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrips();
  }, [from, to, date]);

  // Extract unique companies for filter
  const companiesList = [...new Set(trips.map(t => t.company?.name || 'บริษัทเดินรถ'))];

  // Process trips based on filters and sorting
  const processedTrips = trips
    .filter(trip => {
      if (selectedCompanies.length === 0) return true;
      const compName = trip.company?.name || 'บริษัทเดินรถ';
      return selectedCompanies.includes(compName);
    })
    .sort((a, b) => {
      if (sortOption === 'time-asc') {
        return new Date(a.departureTime) - new Date(b.departureTime);
      } else if (sortOption === 'price-asc') {
        return a.price - b.price;
      } else if (sortOption === 'price-desc') {
        return b.price - a.price;
      }
      return 0;
    });

  const toggleCompanyFilter = (companyName) => {
    setSelectedCompanies(prev => 
      prev.includes(companyName) 
        ? prev.filter(c => c !== companyName)
        : [...prev, companyName]
    );
  };

  // Helper to format time
  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  };

  // Helper to calculate duration
  const getDuration = (depStr, arrStr) => {
    const dep = new Date(depStr);
    const arr = new Date(arrStr);
    const diffMs = arr - dep;
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHrs} ชั่วโมง ${diffMins} นาที`;
  };

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
          <h1 className="text-[14px] font-bold text-gray-900 leading-tight">เลือกเที่ยวรถ</h1>
          <span className="text-[11px] text-gray-500 leading-tight">EasyGo</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 overflow-y-auto">
        
        {/* Search Summary Card */}
        <div className="bg-white px-5 py-4 rounded-xl border border-gray-200 shadow-sm flex justify-between items-center mb-4">
          <div>
            <h2 className="text-[15px] font-bold text-gray-800 flex items-center gap-1.5 mb-1">
              {from} 
              <svg className="w-4 h-4 text-[#006b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              {to}
            </h2>
            <div className="text-[12px] text-gray-500 flex items-center gap-2">
              {date}
              <svg className="w-3.5 h-3.5 text-[#006b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              {pax}
            </div>
          </div>
          <Link href="/home" className="bg-[#e9f2ee] w-10 h-10 rounded-full flex items-center justify-center text-[#006b5e] shrink-0 hover:bg-[#d8ebe1] transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </Link>
        </div>

        {/* Filter and Sort */}
        <div className="flex justify-around text-[13px] font-bold text-[#006b5e] mb-4">
          <button onClick={() => setShowSortModal(true)} className="flex items-center gap-1.5 hover:opacity-70 transition-opacity">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-8m-4 8l-4-8" />
            </svg>
            เรียงข้อมูล
          </button>
          <button onClick={() => setShowFilterModal(true)} className="flex items-center gap-1.5 hover:opacity-70 transition-opacity relative">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            ตัวกรองข้อมูล
            {selectedCompanies.length > 0 && (
              <span className="absolute -top-1.5 -right-3.5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-black shadow-sm">
                {selectedCompanies.length}
              </span>
            )}
          </button>
        </div>

        {/* Trip List */}
        <div className="flex flex-col gap-3 pb-6">
          {loading ? (
            <div className="text-center py-10 text-gray-500">กำลังค้นหาเที่ยวรถ...</div>
          ) : processedTrips.length === 0 ? (
            <div className="text-center py-10 text-gray-500">ไม่พบเที่ยวรถที่ตรงกับตัวกรอง</div>
          ) : processedTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-xl p-4 border border-[#006b5e] shadow-[0_2px_8px_rgba(0,107,94,0.08)]">
              
              {/* Header: Time and Price */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[17px] font-bold text-gray-900">{formatTime(trip.departureTime)}</span>
                  <svg className="w-3.5 h-3.5 text-[#006b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span className="text-[17px] font-bold text-gray-900">{formatTime(trip.arrivalTime)}</span>
                  <span className="text-[10px] text-gray-500 font-medium ml-1">({getDuration(trip.departureTime, trip.arrivalTime)})</span>
                </div>
                <div className="text-[17px] font-bold text-[#006b5e]">฿ {trip.price}</div>
              </div>

              {/* Timeline Route */}
              <div className="relative pl-1 mb-4">
                <div className="absolute left-[7.5px] top-2 bottom-2 w-[1.5px] bg-[#006b5e]"></div>
                <div className="flex items-center gap-3 mb-2 relative z-10">
                  <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full shrink-0"></span>
                  <span className="text-[12px] font-medium text-gray-800">{trip.origin}</span>
                </div>
                <div className="flex items-center gap-3 relative z-10">
                  <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full shrink-0"></span>
                  <span className="text-[12px] font-medium text-gray-800">{trip.destination}</span>
                </div>
              </div>

              {/* Footer: Brand, Class and Action */}
              <div className="flex justify-between items-end border-t border-gray-100 pt-3">
                <div className="flex items-center gap-3">
                  {trip.company?.logoUrl ? (
                    <img src={trip.company.logoUrl} alt={trip.company.name} className="w-11 h-8 object-contain" />
                  ) : (
                    <div className="w-11 h-8 border border-gray-100 bg-gray-50 rounded flex items-center justify-center shrink-0">
                      <span className="text-[8px] font-black italic tracking-tighter text-gray-600">
                        {trip.company?.name ? trip.company.name.substring(0, 3) : 'BUS'}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-col border-l-[1.5px] border-gray-200 pl-2">
                    <span className="text-[12px] font-bold text-[#006b5e] leading-tight">{trip.company?.name || 'บริษัทเดินรถ'}</span>
                    <span className="text-[11px] text-gray-500 leading-tight mt-0.5">{trip.busType}</span>
                  </div>
                </div>
                
                <Link href={`/passenger-info?tripId=${trip.id}&pax=${encodeURIComponent(pax)}`} className="bg-[#006b5e] hover:bg-[#005a4e] text-white px-5 py-1.5 rounded-lg text-[13px] font-medium shrink-0 transition-colors shadow-sm">
                  จองเลย
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Modal (Bottom Sheet) */}
      {showSortModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={() => setShowSortModal(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-xl transform transition-transform translate-y-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[18px] font-bold text-gray-900">เรียงข้อมูลตาม</h3>
              <button onClick={() => setShowSortModal(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { id: 'time-asc', label: 'เวลาออกเดินทาง (เร็วสุด-ช้าสุด)' },
                { id: 'price-asc', label: 'ราคา (ถูกไปแพง)' },
                { id: 'price-desc', label: 'ราคา (แพงไปถูก)' }
              ].map(opt => (
                <label key={opt.id} className={`flex items-center justify-between p-4 rounded-xl border ${sortOption === opt.id ? 'border-[#006b5e] bg-[#f0f8f5]' : 'border-gray-200 hover:bg-gray-50'} cursor-pointer transition-colors`}>
                  <span className={`text-[15px] font-medium ${sortOption === opt.id ? 'text-[#006b5e]' : 'text-gray-700'}`}>{opt.label}</span>
                  <input type="radio" name="sort" value={opt.id} checked={sortOption === opt.id} onChange={() => { setSortOption(opt.id); setTimeout(() => setShowSortModal(false), 200); }} className="w-5 h-5 text-[#006b5e] focus:ring-[#006b5e] border-gray-300" />
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal (Bottom Sheet) */}
      {showFilterModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-[2px] transition-opacity" onClick={() => setShowFilterModal(false)}>
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-xl transform transition-transform translate-y-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[18px] font-bold text-gray-900">ตัวกรองข้อมูล</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="mb-6 max-h-[40vh] overflow-y-auto pr-2">
              <h4 className="text-[14px] font-bold text-gray-500 mb-3">เลือกบริษัทเดินรถ</h4>
              <div className="flex flex-col gap-3">
                {companiesList.map(comp => (
                  <label key={comp} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" checked={selectedCompanies.includes(comp)} onChange={() => toggleCompanyFilter(comp)} className="w-5 h-5 rounded text-[#006b5e] focus:ring-[#006b5e] border-gray-300" />
                    <span className="text-[15px] text-gray-700 font-medium">{comp}</span>
                  </label>
                ))}
                {companiesList.length === 0 && (
                  <div className="text-sm text-gray-400 text-center py-4">ไม่มีข้อมูลบริษัท</div>
                )}
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => setSelectedCompanies([])} className="px-5 py-3.5 rounded-xl text-[15px] font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors">
                ล้าง
              </button>
              <button onClick={() => setShowFilterModal(false)} className="flex-1 bg-[#006b5e] text-white py-3.5 rounded-xl text-[16px] font-bold hover:bg-[#005a4e] transition-colors shadow-sm">
                ดูผลลัพธ์ ({processedTrips.length} เที่ยว)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Trips() {
  return (
    <Suspense fallback={<div className="flex flex-col min-h-screen bg-[#f8f9fa] justify-center items-center font-sans text-[#006b5e] font-bold">กำลังโหลดข้อมูล...</div>}>
      <TripsContent />
    </Suspense>
  );
}