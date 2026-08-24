"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function PassengerInfoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const tripId = searchParams.get('tripId') || '';
  const paxStr = searchParams.get('pax') || '1 ท่าน';
  
  // Extract number from pax string (e.g., "3 ท่าน" -> 3)
  const paxMatch = paxStr.match(/\d+/);
  const paxCount = paxMatch ? parseInt(paxMatch[0], 10) : 1;

  const [tripDetails, setTripDetails] = useState(null);
  const [loadingTrip, setLoadingTrip] = useState(true);

  useEffect(() => {
    if (tripId) {
      const fetchTrip = async () => {
        try {
          const res = await fetch(`/api/trips/${tripId}`);
          const data = await res.json();
          if (data.success) {
            setTripDetails(data.data);
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingTrip(false);
        }
      };
      fetchTrip();
    } else {
      setLoadingTrip(false);
    }
  }, [tripId]);

  // Format time helper
  const formatTime = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
  };

  // Initialize state for passengers
  const [passengers, setPassengers] = useState(
    Array.from({ length: paxCount }, () => ({
      name: '',
      idCard: '',
      phone: ''
    }))
  );

  const handleInputChange = (index, field, value) => {
    const newPassengers = [...passengers];
    newPassengers[index][field] = value;
    setPassengers(newPassengers);
  };

  const handleProceed = () => {
    // Validation
    let isValid = true;
    for (let i = 0; i < passengers.length; i++) {
      const p = passengers[i];
      if (!p.name.trim() || !p.idCard.trim() || !p.phone.trim()) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      alert("กรุณากรอกข้อมูลผู้โดยสารให้ครบทุกช่อง และทุกคน ก่อนดำเนินการต่อครับ");
      return;
    }

    // Check for duplicate names
    const names = passengers.map(p => p.name.trim().toLowerCase());
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== passengers.length) {
      alert("ชื่อผู้โดยสารห้ามซ้ำกันครับ กรุณาตรวจสอบและแก้ไขชื่อให้ถูกต้อง");
      return;
    }

    // Save passenger data to sessionStorage so seat-selection can use it
    sessionStorage.setItem('booking_passengers', JSON.stringify(passengers));

    // Pass data to seat-selection
    router.push(`/seat-selection?tripId=${tripId}&pax=${paxCount}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans relative pb-24">
      
      {/* Header */}
      <div className="flex items-center px-4 bg-white h-14 border-b border-gray-100 z-10 shrink-0">
        <button onClick={() => router.back()} className="text-gray-700 mr-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-[14px] font-bold text-gray-900 leading-tight">กรอกข้อมูลผู้โดยสาร</h1>
          <span className="text-[11px] text-gray-500 leading-tight">EasyGo</span>
        </div>
        <Link href="/home" className="text-gray-700 ml-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>

      <div className="flex-1 px-4 py-5 overflow-y-auto">
        
        {/* Trip Summary Card */}
        {loadingTrip ? (
          <div className="bg-white rounded-xl p-5 mb-6 shadow-sm border border-gray-100 flex justify-center items-center h-32">
            <span className="text-[#006b5e] font-medium text-[13px]">กำลังดึงข้อมูลเที่ยวรถ...</span>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-5 mb-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100">
            <div className="text-[15px] font-bold text-gray-800 flex items-center gap-1.5 mb-1">
              {tripDetails?.origin || 'ต้นทาง'}
              <svg className="w-3.5 h-3.5 text-[#006b5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              {tripDetails?.destination || 'ปลายทาง'}
            </div>
            <div className="text-[11px] text-gray-500 mb-4">ข้อมูลเที่ยวรถที่เลือก</div>
            
            <div className="mb-5 relative">
              <div className="absolute left-[39.5px] top-2 bottom-2 w-[1.5px] bg-[#006b5e] z-0"></div>
              
              <div className="flex items-start mb-2.5 relative z-10">
                <span className="text-[11px] text-gray-600 w-[30px] mt-0.5 shrink-0">
                  {tripDetails ? formatTime(tripDetails.departureTime) : 'ออก'}
                </span>
                <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full mt-1 mx-2 shrink-0"></span>
                <span className="text-[12px] font-medium text-gray-800">{tripDetails?.origin || 'สถานีขนส่งผู้โดยสาร'}</span>
              </div>
              
              <div className="flex items-start relative z-10">
                <span className="text-[11px] text-gray-600 w-[30px] mt-0.5 shrink-0">
                  {tripDetails ? formatTime(tripDetails.arrivalTime) : 'ถึง'}
                </span>
                <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full mt-1 mx-2 shrink-0"></span>
                <span className="text-[12px] font-medium text-gray-800">{tripDetails?.destination || 'สถานีขนส่งผู้โดยสารปลายทาง'}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2.5">
              {tripDetails?.company?.logoUrl ? (
                <img src={tripDetails.company.logoUrl} alt={tripDetails.company.name} className="w-10 h-6 object-contain" />
              ) : (
                <div className="w-10 h-6 border border-gray-100 bg-gray-50 rounded flex items-center justify-center shrink-0">
                   <span className="text-[6px] font-black italic text-[#006b5e] tracking-tighter">
                     {tripDetails?.company?.name?.substring(0,3) || 'BUS'}
                   </span>
                </div>
              )}
              <div className="text-[12px] font-bold text-[#006b5e] flex flex-col">
                <span>
                  {tripDetails?.company?.name || 'บริษัทรถ'} 
                  <span className="text-[11px] font-normal text-gray-600 ml-1">({paxCount} ท่าน)</span>
                </span>
                {tripDetails?.busType && (
                  <span className="text-[10px] font-normal text-gray-500 mt-0.5 leading-tight">{tripDetails.busType}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Passenger Info Section */}
        <h3 className="text-[15px] font-bold text-[#006b5e] mb-3">ข้อมูลผู้โดยสาร ({paxCount} ท่าน)</h3>

        {passengers.map((passenger, index) => (
          <div key={index} className="bg-white border border-[#006b5e] rounded-xl p-4 mb-4 shadow-sm">
            <div className="border-b border-gray-100 pb-2.5 mb-4">
               <div className="text-[13px] font-bold text-gray-800 flex items-baseline gap-1.5">
                 ผู้โดยสาร {index + 1}
                 {index === 0 && <span className="text-[10px] font-normal text-gray-500">(ผู้ติดต่อหลัก)</span>}
               </div>
            </div>
            
            <div className="space-y-3.5">
               <div>
                 <label className="block text-[12px] font-medium text-gray-700 mb-1.5">ชื่อ-นามสกุล <span className="text-red-500">*</span></label>
                 <input 
                   type="text" 
                   value={passenger.name}
                   onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                   placeholder="เช่น สมชาย ใจดี"
                   className={`w-full border ${!passenger.name ? 'border-gray-300' : 'border-[#006b5e] bg-[#fbfcfd]'} rounded-lg p-2.5 text-[13px] text-gray-800 outline-none focus:border-[#006b5e] transition-colors`} 
                 />
               </div>
               <div>
                 <label className="block text-[12px] font-medium text-gray-700 mb-1.5">เลขบัตรประชาชน / เลขพาสปอร์ต <span className="text-red-500">*</span></label>
                 <input 
                   type="text" 
                   value={passenger.idCard}
                   onChange={(e) => handleInputChange(index, 'idCard', e.target.value)}
                   placeholder="ระบุ 13 หลัก"
                   className={`w-full border ${!passenger.idCard ? 'border-gray-300' : 'border-[#006b5e] bg-[#fbfcfd]'} rounded-lg p-2.5 text-[13px] text-gray-800 outline-none focus:border-[#006b5e] transition-colors`} 
                 />
               </div>
               <div>
                 <label className="block text-[12px] font-medium text-gray-700 mb-1.5">หมายเลขโทรศัพท์ <span className="text-red-500">*</span></label>
                 <input 
                   type="tel" 
                   value={passenger.phone}
                   onChange={(e) => handleInputChange(index, 'phone', e.target.value)}
                   placeholder="เช่น 0812345678"
                   className={`w-full border ${!passenger.phone ? 'border-gray-300' : 'border-[#006b5e] bg-[#fbfcfd]'} rounded-lg p-2.5 text-[13px] text-gray-800 outline-none focus:border-[#006b5e] transition-colors`} 
                 />
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-[#f8f9fa] via-[#f8f9fa] to-transparent flex justify-center pb-8 z-20 pointer-events-none">
        <button 
          onClick={handleProceed}
          className="bg-[#006b5e] hover:bg-[#005a4e] text-white font-medium py-3.5 px-8 rounded-full w-full max-w-[280px] text-center shadow-[0_4px_12px_rgba(0,107,94,0.3)] transition-all pointer-events-auto text-[15px]"
        >
          ดำเนินการต่อ
        </button>
      </div>
      
    </div>
  );
}

export default function PassengerInfo() {
  return (
    <Suspense fallback={<div className="flex flex-col min-h-screen bg-[#f8f9fa] justify-center items-center text-[#006b5e] font-bold">กำลังโหลดข้อมูล...</div>}>
      <PassengerInfoContent />
    </Suspense>
  );
}