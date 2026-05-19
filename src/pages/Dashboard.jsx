import { useEffect, useState } from 'react'

import { auth, db } from '../firebase/config'

import {
  doc,
  getDoc
} from 'firebase/firestore'

import { QRCodeCanvas } from 'qrcode.react'

export default function Dashboard() {

  const [userData, setUserData] = useState(null)

  useEffect(() => {

    const fetchUser = async () => {

      const user = auth.currentUser

      if (user) {

        const docRef = doc(db, 'users', user.uid)

        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {

          setUserData(docSnap.data())

        }

      }

    }

    fetchUser()

  }, [])

  if (!userData) {

    return <div className='p-10'>Loading...</div>

  }

  return (

    <div className='p-6 bg-gray-100 min-h-screen'>

      <div className='bg-primary text-white p-6 rounded-3xl mb-6'>

        <div className='flex items-center justify-between flex-wrap gap-4'>

          <div>

            <h1 className='text-4xl font-bold'>
              أهلاً {userData.name} 👋
            </h1>

            <p className='mt-2'>
              عدد ساعات التطوع:
              {userData.hours}
              ساعة
            </p>

            <p>
              النقاط:
              {userData.points}
            </p>

            <p>
              الشارة:
              {userData.badge}
            </p>

            <p>
              الترتيب:
              {userData.rank}
            </p>

          </div>

          <div className='bg-white p-3 rounded-2xl'>

            <QRCodeCanvas
              value='https://ee-eu.kobotoolbox.org/bjCdFEdc'
              size={170}
            />

          </div>

        </div>

      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-2xl mb-4'>
            البيانات الشخصية
          </h2>

          <p>
            <strong>الإيميل:</strong>
            {userData.email}
          </p>

          <p>
            <strong>الموبايل:</strong>
            {userData.phone || 'غير مضاف'}
          </p>

          <p>
            <strong>الفريق:</strong>
            {userData.team || 'غير محدد'}
          </p>

          <p>
            <strong>نبذة:</strong>
            {userData.bio || 'لا توجد'}
          </p>

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-2xl mb-4'>
            الأنشطة
          </h2>

          {
            userData.activities.length === 0
              ? <p>لا توجد أنشطة</p>
              : userData.activities.map((item, index) => (

                <div
                  key={index}
                  className='bg-gray-100 p-3 rounded-xl mb-2'
                >
                  {item}
                </div>

              ))
          }

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-2xl mb-4'>
            الشهادات
          </h2>

          {
            userData.certificates.length === 0
              ? <p>لا توجد شهادات</p>
              : userData.certificates.map((item, index) => (

                <div
                  key={index}
                  className='bg-gray-100 p-3 rounded-xl mb-2'
                >
                  {item}
                </div>

              ))
          }

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-2xl mb-4'>
            الإشعارات
          </h2>

          {
            userData.notifications.length === 0
              ? <p>لا توجد إشعارات</p>
              : userData.notifications.map((item, index) => (

                <div
                  key={index}
                  className='bg-orange-100 p-3 rounded-xl mb-2'
                >
                  {item}
                </div>

              ))
          }

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-2xl mb-4'>
            الأنشطة القادمة
          </h2>

          {
            userData.upcomingActivities.length === 0
              ? <p>لا توجد أنشطة قادمة</p>
              : userData.upcomingActivities.map((item, index) => (

                <div
                  key={index}
                  className='bg-blue-100 p-3 rounded-xl mb-2'
                >
                  {item}
                </div>

              ))
          }

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-2xl mb-4'>
            حالة الحساب
          </h2>

          <p className='text-xl font-bold'>

            {
              userData.approved
                ? '✅ تم قبولك'
                : '⏳ قيد المراجعة'
            }

          </p>

        </div>

      </div>

    </div>

  )

}
