import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// บังคับไม่ให้ Next.js จำค่าเก่า (No Caching) เพื่อให้ข้อมูลใหม่เสมอ
export const dynamic = 'force-dynamic';

export default async function SuperAdminPage() {
  // ดึงข้อมูลบริษัททั้งหมดจาก Database
  const companies = await prisma.company.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">จัดการบริษัท (Super Admin)</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
          + เพิ่มบริษัทใหม่
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ชื่อบริษัท</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สถานะ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สร้างเมื่อ</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div className="flex items-center">
                    {company.logoUrl && (
                      <img src={company.logoUrl} alt={company.name} className="w-8 h-8 rounded-full mr-3 object-cover" />
                    )}
                    {company.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${company.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {company.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(company.createdAt).toLocaleDateString('th-TH')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 mr-4">แก้ไข</a>
                  <a href="#" className="text-red-600 hover:text-red-900">ระงับ</a>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  ยังไม่มีข้อมูลบริษัทในระบบ
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
