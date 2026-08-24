"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId");
  const paxStr = searchParams.get("pax") || "1";
  const paxCount = parseInt(paxStr, 10) || 1;

  const [passengers, setPassengers] = useState([]);
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [bookingRef, setBookingRef] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [slipFile, setSlipFile] = useState(null);

  useEffect(() => {
    // Generate Random Booking Ref
    const randomRef = `#${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-TH`;
    setBookingRef(randomRef);

    // Load passengers from session storage
    const storedPassengers = sessionStorage.getItem("booking_passengers");
    if (storedPassengers) {
      setPassengers(JSON.parse(storedPassengers));
    } else {
      router.push("/home");
      return;
    }

    if (tripId) {
      fetchTripDetails();
    }
  }, [tripId, router]);

  useEffect(() => {
    if (timeLeft <= 0) {
      alert("หมดเวลาการทำรายการ ที่นั่งของคุณถูกยกเลิกการจองแล้ว");
      sessionStorage.removeItem("booking_passengers");
      router.push("/home");
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, router]);

  const fetchTripDetails = async () => {
    try {
      const res = await fetch(`/api/trips/${tripId}`);
      const data = await res.json();
      if (data.success) {
        setTripDetails(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!slipFile) {
      alert("กรุณาอัปโหลดสลิปการโอนเงินก่อนยืนยันการชำระเงิน");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId,
          passengers,
          totalPrice: (tripDetails?.price || 0) * paxCount,
        }),
      });
      const data = await res.json();

      if (data.success) {
        alert(`จองที่นั่งสำเร็จ! รหัสการจอง: ${bookingRef}`);
        sessionStorage.removeItem("booking_passengers");
        router.push("/home");
      } else {
        alert(data.error || "ไม่สามารถทำรายการได้ กรุณาลองใหม่");
      }
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการยืนยันการชำระเงิน");
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSlipFile(e.target.files[0]);
    }
  };

  const formatTimeStr = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDateStr = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB");
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const seatNumbers = passengers.map(p => p.seatNumber).filter(Boolean).join(", ") || "ไม่ระบุ";
  const ticketPrice = tripDetails?.price || 0;
  const totalPrice = ticketPrice * paxCount;

  // Placeholder QR if company doesn't have one
  const qrCodeUrl = tripDetails?.company?.qrCodeUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png";

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-[#f8f9fa] text-[#006b5e] font-bold">กำลังโหลด...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans">
      {/* Header */}
      <div className="flex items-center px-4 bg-white h-14 border-b border-gray-100 z-10 shrink-0">
        <button onClick={() => router.back()} className="text-gray-700 mr-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-[14px] font-bold text-gray-900 leading-tight">ชำระเงิน</h1>
          <span className="text-[11px] text-gray-500 leading-tight">EasyGo</span>
        </div>
        <Link href="/home" className="text-gray-700 ml-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>
      </div>

      <div className="flex-1 px-4 py-5 overflow-y-auto pb-24">
        
        {/* Countdown Timer */}
        <div className="bg-[#fff3cd] border border-[#ffeeba] text-[#856404] rounded-xl p-3 mb-4 flex justify-center items-center shadow-sm">
          <span className="font-semibold text-[14px]">กรุณาชำระเงินภายใน {timeDisplay} นาที</span>
        </div>

        {/* QR Code & Price Card */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5 shadow-sm">
          <div className="flex justify-center mb-6 mt-2 relative">
            <div className="border border-gray-100 rounded-2xl p-4 shadow-sm w-48 h-48 bg-white relative">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-green-100/50 blur-sm rounded-full"></div>
            </div>
            {/* Overlay if expired (failsafe visual) */}
            {timeLeft <= 0 && (
              <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
                <span className="text-red-500 font-bold">หมดเวลา</span>
              </div>
            )}
          </div>

          <div className="mb-1">
            <span className="text-sm text-gray-500">ราคาตั๋ว ({paxCount} × {ticketPrice} บาท)</span>
          </div>
          <div className="flex justify-between items-end border-b-[1.5px] border-dotted border-gray-300 pb-2">
            <span className="text-sm font-bold text-gray-800">ยอดรวมสุทธิ</span>
            <span className="text-lg font-bold text-[#006b5e]">฿ {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Warning Box */}
        <div className="bg-[#f2f8f6] border border-[#006b5e] rounded-xl p-4 mb-5 flex flex-col items-center shadow-sm text-center">
          <svg className="w-6 h-6 text-[#ed8936] mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
             <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="text-[13px] font-bold text-[#006b5e]">โปรดบันทึกสลิปหรือแคปหน้าจอ</span>
          <span className="text-[12px] font-medium text-[#006b5e]">เพื่อใช้อัปโหลดเป็นหลักฐานการชำระเงิน</span>
        </div>

        {/* Booking Details Card */}
        <div className="bg-[#e9f2ee] rounded-xl p-5 mb-6">
          <div className="flex justify-between mb-6">
            <div>
              <div className="text-[11px] text-gray-500 mb-1">รหัสการจอง</div>
              <div className="text-sm font-semibold text-gray-800">{bookingRef}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-gray-500 mb-1">วันที่เดินทาง</div>
              <div className="text-sm font-semibold text-gray-800">{tripDetails ? formatDateStr(tripDetails.departureTime) : ""}</div>
            </div>
          </div>

          <div className="mb-6 relative">
            {/* Timeline Line */}
            <div className="absolute left-[44px] top-2 bottom-6 w-[1.5px] bg-[#006b5e] z-0"></div>
            
            {/* Boarding Point */}
            <div className="flex items-start mb-5 relative z-10">
              <span className="text-[11px] font-medium text-gray-600 w-9 mt-0.5 shrink-0">{tripDetails ? formatTimeStr(tripDetails.departureTime) : "..."}</span>
              <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full mt-1 mx-2 shrink-0 border-2 border-[#e9f2ee]"></span>
              <div>
                <div className="text-xs font-semibold text-gray-700">จุดขึ้นรถ</div>
                <div className="text-[11px] text-gray-500">สถานีขนส่ง{tripDetails?.origin || "..."}</div>
              </div>
            </div>

            {/* Drop-off Point */}
            <div className="flex items-start relative z-10">
              <span className="text-[11px] font-medium text-gray-600 w-9 mt-0.5 shrink-0">{tripDetails ? formatTimeStr(tripDetails.arrivalTime) : "..."}</span>
              <span className="w-2.5 h-2.5 bg-[#006b5e] rounded-full mt-1 mx-2 shrink-0 border-2 border-[#e9f2ee]"></span>
              <div>
                <div className="text-xs font-semibold text-gray-700">จุดลงรถ</div>
                <div className="text-[11px] text-gray-500">สถานีขนส่ง{tripDetails?.destination || "..."}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-1 border-t border-gray-300 border-dashed mt-4 pt-4">
            <div>
              <div className="text-[11px] text-gray-500 mb-1">ประเภทรถ</div>
              <div className="text-[12px] font-bold text-[#006b5e]">
                {tripDetails?.company?.name || "บริษัทรถ"} <span className="text-[10px] font-normal text-gray-600 ml-1">{tripDetails?.busType || ""}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-gray-500 mb-1">เลขที่นั่ง</div>
              <div className="text-[12px] font-semibold text-gray-800">{seatNumbers}</div>
            </div>
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent pb-8 z-20 shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col gap-3 max-w-[400px] mx-auto">
          {/* Hidden File Input */}
          <input 
            type="file" 
            id="slip-upload" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange} 
          />
          
          <label 
            htmlFor="slip-upload"
            className="w-full bg-white border border-[#006b5e] text-[#006b5e] font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-sm text-[14px] cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            {slipFile ? slipFile.name : "อัปโหลดสลิปการโอนเงิน"}
          </label>

          <button 
            onClick={handleConfirmPayment}
            disabled={submitting}
            className={`w-full font-bold py-3.5 rounded-xl text-center transition-colors shadow-sm text-[15px] ${
              submitting 
                ? "bg-gray-400 text-gray-200 cursor-not-allowed" 
                : "bg-[#006b5e] hover:bg-[#005a4e] text-white"
            }`}
          >
            {submitting ? "กำลังดำเนินการ..." : "ยืนยันการชำระเงิน"}
          </button>
        </div>
      </div>
      
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div className="flex flex-col min-h-screen bg-[#f8f9fa] justify-center items-center text-[#006b5e] font-bold">กำลังโหลด...</div>}>
      <PaymentContent />
    </Suspense>
  );
}