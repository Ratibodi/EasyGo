import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-600">EasyGo Admin</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {/* Menu for Super Admin */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              ส่วนกลาง (Super Admin)
            </h3>
            <Link href="/admin/super" className="block px-4 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              จัดการบริษัท (Companies)
            </Link>
          </div>

          {/* Menu for Company Admin */}
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              จัดการบริษัท (Company Admin)
            </h3>
            <Link href="/admin/company" className="block px-4 py-2 rounded text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              จัดการเที่ยวรถ (Trips)
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t text-sm text-gray-500">
          จำลองระบบ Role-based
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm h-16 flex items-center px-8">
          <h1 className="text-lg font-medium text-gray-800">ระบบหลังบ้าน</h1>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
