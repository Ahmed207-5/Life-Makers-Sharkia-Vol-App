export default function AdminDashboard() {
  return (
    <div className='p-6'>
      <h1 className='text-4xl font-bold text-primary mb-6'>لوحة الأدمن</h1>

      <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-2xl shadow'>
          <h2 className='font-bold text-xl mb-2'>إضافة نشاط</h2>
          <button className='bg-orange text-white px-4 py-2 rounded-xl'>
            إضافة
          </button>
        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>
          <h2 className='font-bold text-xl mb-2'>قبول المتطوعين</h2>
          <p>متابعة طلبات التسجيل</p>
        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>
          <h2 className='font-bold text-xl mb-2'>الحضور</h2>
          <p>متابعة الحضور والانصراف</p>
        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>
          <h2 className='font-bold text-xl mb-2'>التقارير</h2>
          <p>استخراج تقارير المتطوعين</p>
        </div>
      </div>
    </div>
  )
}
