import { useEffect, useState } from 'react'

import { auth, db } from '../firebase/config'

import {
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'

import { signOut } from 'firebase/auth'

import { QRCodeCanvas } from 'qrcode.react'

export default function Dashboard() {

  const [userData, setUserData] = useState(null)

  const [editing, setEditing] = useState(false)

  const activityOptions = [

    'بارتشن',
    'قافلة',
    'مجزر',
    'نمويل',
    'ديزاين',
    'إدارة الحالة',
    'تنفيذ',
    'تجهيزات'

  ]

  const logout = async () => {

    await signOut(auth)

    window.location.href = '/login'

  }

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged(async (user) => {

      if (user) {

        try {

const docRef = doc(db, 'users', user.uid)
          
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {

            setUserData(docSnap.data())

          }

        } catch (error) {

          console.log(error)

        }

      }

    })

    return () => unsubscribe()

  }, [])

  const saveProfile = async () => {

    const user = auth.currentUser

    if (!user) return

    try {

      const userRef = doc(db, 'users', user.uid)

      await updateDoc(userRef, {

        phone: userData.phone || '',

        team: userData.team || '',

        bio: userData.bio || '',

        image: userData.image || '',

        selectedActivity:
          userData.selectedActivity || ''

      })

      alert('تم حفظ البيانات بنجاح')

      setEditing(false)

    } catch (error) {

      console.log(error)

    }

  }

  if (!userData) {

    return (

      <div className='p-10 text-2xl'>
        Loading...
      </div>

    )

  }

  return (

    <div className='p-6 bg-gray-100 min-h-screen'>

      <div className='bg-primary text-white p-6 rounded-3xl mb-6'>

        <div className='flex items-center justify-between mb-6 flex-wrap gap-4'>

          <a
            href='https://lifemakers-sharkia.org'
            target='_blank'
            className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl text-lg font-bold transition'
          >
            زيارة الموقع الإلكتروني
          </a>

        </div>

        <div className='flex items-center justify-between flex-wrap gap-4'>

          <div>

            {
              userData.image && (

                <img
                  src={userData.image}
                  alt='profile'
                  className='w-24 h-24 rounded-full object-cover mb-4 border-4 border-white'
                />

              )
            }

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
              {userData.badge || 'متطوع'}
            </p>

            <p>
              الترتيب:
              {userData.rank || 'غير مصنف'}
            </p>

            <p>
              النشاط المختار:
              {userData.selectedActivity || 'لا يوجد'}
            </p>

          </div>

          <div className='flex flex-col items-center gap-3'>

            <div className='bg-white p-3 rounded-2xl'>

              <QRCodeCanvas
                value='https://ee-eu.kobotoolbox.org/bjCdFEdc'
                size={170}
              />

            </div>

            <button
              onClick={logout}
              className='bg-red-600 text-white px-5 py-2 rounded-xl'
            >
              تسجيل الخروج
            </button>

          </div>

        </div>

      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='font-bold text-2xl mb-4'>
            البيانات الشخصية
          </h2>

          <p className='mb-2'>
            <strong>الإيميل:</strong>
            {' '}
            {userData.email}
          </p>

          <div className='space-y-3'>

            <input
              type='text'
              placeholder='رابط الصورة'
              value={userData.image || ''}
              disabled={!editing}
              className='w-full border p-2 rounded-xl'
              onChange={(e) =>
                setUserData({
                  ...userData,
                  image: e.target.value
                })
              }
            />

            <input
              type='text'
              placeholder='رقم الموبايل'
              value={userData.phone || ''}
              disabled={!editing}
              className='w-full border p-2 rounded-xl'
              onChange={(e) =>
                setUserData({
                  ...userData,
                  phone: e.target.value
                })
              }
            />

            <input
              type='text'
              placeholder='الفريق'
              value={userData.team || ''}
              disabled={!editing}
              className='w-full border p-2 rounded-xl'
              onChange={(e) =>
                setUserData({
                  ...userData,
                  team: e.target.value
                })
              }
            />

            <textarea
              placeholder='نبذة'
              value={userData.bio || ''}
              disabled={!editing}
              className='w-full border p-2 rounded-xl'
              onChange={(e) =>
                setUserData({
                  ...userData,
                  bio: e.target.value
                })
              }
            />

            <select
              className='w-full border p-2 rounded-xl'
              value={userData.selectedActivity || ''}
              disabled={!editing}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  selectedActivity: e.target.value
                })
              }
            >

              <option value=''>
                اختر النشاط
              </option>

              {
                activityOptions.map((activity, index) => (

                  <option
                    key={index}
                    value={activity}
                  >
                    {activity}
                  </option>

                ))
              }

            </select>

          </div>

          <div className='flex flex-wrap gap-3 mt-4'>

            <button
              className='bg-blue-600 text-white px-4 py-2 rounded-xl'
              onClick={() => setEditing(true)}
            >
              تعديل
            </button>

            <button
              className='bg-green-600 text-white px-4 py-2 rounded-xl'
              onClick={saveProfile}
            >
              حفظ
            </button>

            <button
              className='bg-orange-500 text-white px-4 py-2 rounded-xl'
              onClick={async () => {

                const user = auth.currentUser

                const userRef =
                  doc(db, 'users', user.uid)

                await updateDoc(userRef, {

                  certificateRequest: true

                })

                alert('تم إرسال طلب الشهادة')

              }}
            >

              طلب شهادة

            </button>

          </div>

        </div>

      </div>

    </div>

  )

}
