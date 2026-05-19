import { useEffect, useState } from 'react'

import {
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore'

import {
  signOut
} from 'firebase/auth'

import { auth, db } from '../firebase/config'
import logo from '../logo.png.png'

import { QRCodeCanvas } from 'qrcode.react'

export default function Dashboard() {

  const [userData, setUserData] = useState(null)

  const [editing, setEditing] = useState(false)

  const [phone, setPhone] = useState('')

  const [university, setUniversity] = useState('')

  const [bio, setBio] = useState('')

  const [photo, setPhoto] = useState('')

  const [selectedActivity, setSelectedActivity] =
    useState('')

  useEffect(() => {

    fetchUser()

  }, [])

  const fetchUser = async () => {

    const user = auth.currentUser

    if (!user) return

    const docRef =
      doc(db, 'users', user.uid)

    const docSnap =
      await getDoc(docRef)

    if (docSnap.exists()) {

      const data = docSnap.data()

      setUserData(data)

      setPhone(data.phone || '')
      setUniversity(data.university || '')
      setBio(data.bio || '')
      setPhoto(data.photo || '')

    }

  }

  const saveProfile = async () => {

    const user = auth.currentUser

    const userRef =
      doc(db, 'users', user.uid)

    await updateDoc(userRef, {

      phone,
      university,
      bio,
      photo

    })

    alert('تم حفظ البيانات')

    setEditing(false)

    fetchUser()

  }

  const requestCertificate =
    async () => {

      const user = auth.currentUser

      const userRef =
        doc(db, 'users', user.uid)

      await updateDoc(userRef, {

        certificateRequest: true

      })

      alert('تم إرسال طلب الشهادة')

    }

  const requestActivity =
    async () => {

      if (!selectedActivity)
        return alert('اختر نشاط')

      const user = auth.currentUser

      const userRef =
        doc(db, 'users', user.uid)

      const currentActivities =
        userData.activities || []

      await updateDoc(userRef, {

        requestedActivities: [

          ...(userData.requestedActivities || []),

          selectedActivity

        ]

      })

      alert('تم إرسال طلب النشاط')

      fetchUser()

    }

  const logout = async () => {

    await signOut(auth)

    window.location.href = '/'

  }

  if (!userData) {

    return (
      <div className='p-10'>
        Loading...
      </div>
    )

  }

  return (

    <div className='p-6 bg-gray-100 min-h-screen'>

      <div className='bg-primary text-white p-8 rounded-3xl mb-6 flex flex-col lg:flex-row justify-between items-center gap-6'>

        <div>

          <img
  src={logo}
  alt="logo"
  className="w-32 mb-4"
/>
          
          git add .
git commit -m "Fix logo"
git push

          <h1 className='text-5xl font-bold mb-3'>

            أهلاً {userData.name} 👋

          </h1>

          <p className='text-xl'>

            عدد ساعات التطوع:
            {userData.hours || 0} ساعة

          </p>

          <p className='text-xl mt-2'>

            النقاط:
            {userData.points || 0}

          </p>

          <p className='mt-2'>

            الفريق:
            {userData.team || 'غير محدد'}

          </p>

        </div>

        <div className='bg-white p-4 rounded-2xl'>

          <QRCodeCanvas
            value='https://ee-eu.kobotoolbox.org/bjCdFEdc'
            size={180}
          />

        </div>

      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='text-3xl font-bold mb-4'>
            البيانات الشخصية
          </h2>

          {
            photo && (

              <img
                src={photo}
                alt='profile'
                className='w-28 h-28 rounded-full object-cover mb-4'
              />

            )
          }

          <p className='mb-2'>
            <strong>الإيميل:</strong>
            {userData.email}
          </p>

          {
            editing ? (
              <>

                <input
                  type='text'
                  placeholder='رابط الصورة'
                  value={photo}
                  onChange={(e) =>
                    setPhoto(e.target.value)
                  }
                  className='w-full border p-3 rounded-xl mb-3'
                />

                <input
                  type='text'
                  placeholder='رقم الهاتف'
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  className='w-full border p-3 rounded-xl mb-3'
                />

                <input
                  type='text'
                  placeholder='الجامعة'
                  value={university}
                  onChange={(e) =>
                    setUniversity(e.target.value)
                  }
                  className='w-full border p-3 rounded-xl mb-3'
                />

                <textarea
                  placeholder='نبذة'
                  value={bio}
                  onChange={(e) =>
                    setBio(e.target.value)
                  }
                  className='w-full border p-3 rounded-xl mb-3'
                />

                <button
                  onClick={saveProfile}
                  className='bg-green-600 text-white px-5 py-2 rounded-xl'
                >

                  حفظ

                </button>

              </>
            ) : (
              <>

                <p className='mb-2'>
                  <strong>الهاتف:</strong>
                  {userData.phone || 'لا يوجد'}
                </p>

                <p className='mb-2'>
                  <strong>الجامعة:</strong>
                  {userData.university || 'لا يوجد'}
                </p>

                <p className='mb-4'>
                  <strong>نبذة:</strong>
                  {userData.bio || 'لا يوجد'}
                </p>

                <button
                  onClick={() =>
                    setEditing(true)
                  }
                  className='bg-blue-600 text-white px-5 py-2 rounded-xl'
                >

                  تعديل

                </button>

              </>
            )
          }

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='text-3xl font-bold mb-4'>
            الأنشطة
          </h2>

          {
            userData.activities?.length > 0 ? (

              userData.activities.map(
                (activity, index) => (

                  <div
                    key={index}
                    className='bg-gray-100 p-3 rounded-xl mb-2'
                  >

                    {activity}

                  </div>

                )
              )

            ) : (

              <p>لا توجد أنشطة</p>

            )
          }

          <select
            className='w-full border p-3 rounded-xl mt-4'
            value={selectedActivity}
            onChange={(e) =>
              setSelectedActivity(
                e.target.value
              )
            }
          >

            <option value=''>
              اختر نشاط
            </option>

            <option>
              بارتشن
            </option>

            <option>
              قافلة
            </option>

            <option>
              مجزر
            </option>

            <option>
              نمويل
            </option>

            <option>
              ديزاين
            </option>

            <option>
              ادارة الحالة
            </option>

            <option>
              تنفيذ
            </option>

            <option>
              تجهيزات
            </option>

          </select>

          <button
            onClick={requestActivity}
            className='bg-orange-500 text-white px-5 py-2 rounded-xl mt-4 w-full'
          >

            طلب انضمام للنشاط

          </button>

        </div>

        <div className='bg-white p-6 rounded-2xl shadow'>

          <h2 className='text-3xl font-bold mb-4'>
            الشهادات
          </h2>

          {
            userData.certificates?.length > 0 ? (

              userData.certificates.map(
                (certificate, index) => (

                  <div
                    key={index}
                    className='bg-gray-100 p-3 rounded-xl mb-2'
                  >

                    {certificate}

                  </div>

                )
              )

            ) : (

              <p>لا توجد شهادات</p>

            )
          }

          <button
            onClick={requestCertificate}
            className='bg-green-600 text-white px-5 py-2 rounded-xl mt-4 w-full'
          >

            طلب شهادة

          </button>

        </div>

      </div>

      <div className='flex flex-wrap gap-4 mt-8'>

        <a
          href='https://lifemakers-sharkia.org'
          target='_blank'
          className='bg-orange-500 text-white px-6 py-3 rounded-2xl'
        >

          زيارة الموقع الإلكتروني

        </a>

        <button
          onClick={logout}
          className='bg-red-600 text-white px-6 py-3 rounded-2xl'
        >

          تسجيل الخروج

        </button>

      </div>

    </div>

  )

}
