import { QRCodeCanvas } from 'qrcode.react'

export default function Dashboard() {
  const activities = [
    'قافلة الخير',
    'إفطار صائم',
    'توزيع شنط غذائية'
  ]

  return (
    <div className='p-6'>
      <div className='bg-primary text-white p-6 rounded-3xl mb-6'>
        <h1 className='text-3xl font-bold'>أهلاً بالمتطوع 👋</h1>
        <p>عدد ساعات التطوع: 120 ساعة</p>
        <p>النقاط: 450</p>
      </div>

      <div className='grid md:grid-cols-3 gap-6'>
        <div className='bg-white p-6 rounded-2xl shadow'>
          <h2 className='font-bold text-xl mb-4'>الأنشطة</h2>
          {activities.map((item, index) => (
            <div key={index} className='bg-gray-100 p-3 rounded-xl mb-2'>
              {item}
            </div>
          ))}
        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>
          <h2 className='font-bold text-xl mb-4'>QR الحضور</h2>
          <QRCodeCanvas value='Volunteer Attendance' size={180} />
        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>
          <h2 className='font-bold text-xl mb-4'>الشهادات</h2>
          <div className='bg-gray-100 p-3 rounded-xl'>
            شهادة مشاركة رمضان 2025
          </div>
        </div>
      </div>
    </div>
  )
}
