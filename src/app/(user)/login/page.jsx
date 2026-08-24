"use client";

import { useLiff } from "@/components/LiffProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const { liff, isReady, isLoggedIn } = useLiff();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isReady || !liff) return;

    if (isLoggedIn) {
      setLoading(true);
      const idToken = liff.getIDToken();
      if (idToken) {
        // Verify with our backend
        fetch("/api/auth/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              router.push("/home");
            } else {
              console.error("Login failed:", data.error);
              setLoading(false);
            }
          })
          .catch((err) => {
            console.error("Verification error:", err);
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }
  }, [isReady, isLoggedIn, liff, router]);

  const handleLineLogin = () => {
    if (!isReady || !liff) return;
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 font-sans">
      
      {/* Header */}
      <div className="flex items-center px-4 bg-white h-14 border-b border-gray-100 z-10 shrink-0">
        <button className="text-gray-700 mr-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-[14px] font-bold text-gray-900 leading-tight">EasyGo</h1>
          <span className="text-[11px] text-gray-500 leading-tight">เข้าสู่ระบบ</span>
        </div>
        <button className="text-gray-700 ml-3 p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Main Content with Background Image */}
      <div 
        className="flex-1 flex flex-col items-center justify-center p-6 relative bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=1000&auto=format&fit=crop')" 
        }}
      >
        <div className="absolute inset-0 bg-black/10"></div>

        {/* Center Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-[20px] p-8 w-full max-w-[340px] flex flex-col items-center shadow-2xl relative z-10 text-center">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="text-[#006b5e] mb-1">
              {/* Bus Icon */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 16C4 16.55 4.45 17 5 17H6V19C6 19.55 6.45 20 7 20C7.55 20 8 19.55 8 19V17H16V19C16 19.55 16.45 20 17 20C17.55 20 18 19.55 18 19V17H19C19.55 17 20 16.55 20 16V6C20 2.5 16.42 2 12 2C7.58 2 4 2.5 4 6V16ZM7.5 14C6.67 14 6 13.33 6 12.5C6 11.67 6.67 11 7.5 11C8.33 11 9 11.67 9 12.5C9 13.33 8.33 14 7.5 14ZM16.5 14C15.67 14 15 13.33 15 12.5C15 11.67 15.67 11 16.5 11C17.33 11 18 11.67 18 12.5C18 13.33 17.33 14 16.5 14ZM18 9H6V6C6 5.1 7.46 4 12 4C16.54 4 18 5.1 18 6V9Z" />
              </svg>
            </div>
            <h2 className="text-[26px] font-bold text-[#006b5e] tracking-tight">EasyGo</h2>
          </div>

          {/* Welcome Text Section */}
          <div className="mb-8">
            <h3 className="text-[18px] font-bold text-gray-800 mb-1.5">ยินดีต้อนรับ</h3>
            <p className="text-[14px] text-gray-500">เข้าสู่ระบบเพื่อจองการเดินทาง</p>
          </div>

          {/* LINE Login Button */}
          <button 
            onClick={handleLineLogin}
            disabled={!isReady || loading}
            className={`w-full ${!isReady || loading ? 'bg-gray-400' : 'bg-[#06C755] hover:bg-[#05b34c] active:bg-[#04a044]'} text-white font-bold py-3.5 px-4 rounded-full transition-colors flex items-center justify-center shadow-sm`}
          >
            {loading ? "กำลังเข้าสู่ระบบ..." : "Log in with LINE"}
          </button>
          
        </div>
      </div>
    </div>
  );
}
