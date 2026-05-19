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

    <div className='p-6'>

      <div className='bg-primary text-white p-6 rounded-3xl mb-6'>

        <h1 className='text-3xl font-bold'>
          أهلاً {userData.name} 👋
        </h1>

        <p>
          عدد ساعات التطوع:
          {userData.hours}
          ساعة
        </p>

        <p>
          النقاط:
          {userData.points}
        </p>

      </div>

      <div className='grid md:grid-cols-3 gap-6'>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-xl mb-4'>
            الأنشطة
          </h2>

          {userData.activities.length === 0 ? (
            <p>لا توجد أنشطة</p>
          ) : (
            userData.activities.map((item, index) => (
              <div
                key={index}
                className='bg-gray-100 p-3 rounded-xl mb-2'
              >
                {item}
              </div>
            ))
          )}

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-xl mb-4'>
            QR تسجيل حضور الانشطة
          </h2>

        <QRCodeCanvas
  value='https://ee-eu.kobotoolbox.org/bjCdFEdc'
  size={180}
/>

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-xl mb-4'>
            الشهادات
          </h2>

          {userData.certificates.length === 0 ? (
            <p>لا توجد شهادات</p>
          ) : (
            userData.certificates.map((item, index) => (
              <div
                key={index}
                className='bg-gray-100 p-3 rounded-xl mb-2'
              >
                {item}
              </div>
            ))
          )}

        </div>

      </div>

    </div>

  )

}
