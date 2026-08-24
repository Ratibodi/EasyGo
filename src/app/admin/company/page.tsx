import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// บังคับไม่ให้ Next.js จำค่าเก่า (No Caching) เพื่อให้ข้อมูลใหม่เสมอ
export const dynamic = 'force-dynamic';

export default async function CompanyAdminPage() {
  // ดึงข้อมูลเที่ยวรถทั้งหมด พร้อมข้อมูลบริษัทที่ผูกอยู่
  const trips = await prisma.trip.findMany({
    include: {
      company: true
    },
    orderBy: { departureTime: 'asc' }
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">จัดการเที่ยวรถ (Company Admin)</h2>
          <p className="text-sm text-gray-500 mt-1">แสดงเที่ยวรถทั้งหมดในระบบ (จำลองยังไม่ได้แบ่งสิทธิ์)</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
          + เพิ่มเที่ยวรถใหม่
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">บริษัท</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เส้นทาง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">เวลาออก</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ราคา</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ที่นั่งว่าง</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {trips.map((trip) => (
              <tr key={trip.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{trip.company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {trip.origin} - {trip.destination}
                  <div className="text-xs text-gray-500 font-normal">{trip.busType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(trip.departureTime).toLocaleString('th-TH', { dateStyle: 'short', timeStyle: 'short' })} น.
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">฿{trip.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${trip.availableSeats > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {trip.availableSeats} ที่นั่ง
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">แก้ไข</a>
                  <a href="#" className="text-red-600 hover:text-red-900">ยกเลิก</a>
                </td>
              </tr>
            ))}
            {trips.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  ยังไม่มีเที่ยวรถในระบบ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-sm text-gray-500">* ข้อมูลด้านบนดึงมาจากฐานข้อมูลจริงผ่าน Prisma</p>
    </div>
  );
}
