import { useEffect, useState } from 'react'
import { auth, db, storage } from '../firebase/config'

import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion
} from 'firebase/firestore'

import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage'

import { signOut } from 'firebase/auth'

import { QRCodeCanvas } from 'qrcode.react'

export default function Dashboard() {

  const [userData, setUserData] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [imageFile, setImageFile] = useState(null)

  const activitiesList = [
    'بارتشن',
    'قافلة',
    'مجزر',
    'تمويل',
    'ديزاين',
    'إدارة الحالة',
    'تنفيذ',
    'تجهيزات'
  ]

  useEffect(() => {

    const fetchUser = async () => {

      const user = auth.currentUser

      if (!user) return

      const docRef = doc(db, 'users', user.uid)

      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {

        setUserData(docSnap.data())

      }

    }

    fetchUser()

  }, [])

  const saveData = async () => {

    const user = auth.currentUser

    const docRef = doc(db, 'users', user.uid)

    let imageUrl = userData.image || ''

    if (imageFile) {

      const storageRef = ref(storage, `profiles/${user.uid}`)

      await uploadBytes(storageRef, imageFile)

      imageUrl = await getDownloadURL(storageRef)

    }

    await updateDoc(docRef, {

      phone: userData.phone || '',
      university: userData.university || '',
      bio: userData.bio || '',
      image: imageUrl

    })

    alert('تم حفظ البيانات')

    setEditMode(false)

  }

  const requestCertificate = async () => {

    const user = auth.currentUser

    const docRef = doc(db, 'users', user.uid)

    await updateDoc(docRef, {

      certificateRequests: arrayUnion({
        date: new Date().toISOString(),
        status: 'pending'
      })

    })

    alert('تم إرسال طلب الشهادة')

  }

  const logout = async () => {

    await signOut(auth)

    window.location.href = '/'

  }

  if (!userData) {

    return <div className="p-10">Loading...</div>

  }

  return (

    <div className="p-6 bg-gray-100 min-h-screen">

      <div className="bg-primary text-white p-6 rounded-3xl mb-6 flex justify-between items-center flex-wrap gap-4">

        <div>

          {userData.image && (

            <img
              src={userData.image}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white"
            />

          )}

          <h1 className="text-4xl font-bold mb-2">
            👋 أهلاً {userData.name || 'متطوع'}
          </h1>

          <p className="text-xl">
            عدد ساعات التطوع:
            {userData.hours || 0} ساعة
          </p>

          <p className="text-xl">
            النقاط:
            {userData.points || 0}
          </p>

          <p className="mt-2">
            الفريق:
            {userData.team || 'لا يوجد'}
          </p>

        </div>

        <div className="bg-white p-3 rounded-2xl">

          <QRCodeCanvas
            value="https://ee-eu.kobotoolbox.org/bjCdFEdc"
            size={170}
          />

        </div>

      </div>

      <div className="flex gap-4 mb-6 flex-wrap">

        <a
          href="https://lifemakers-sharkia.org"
          target="_blank"
          className="bg-orange-500 text-white px-6 py-3 rounded-xl font-bold"
        >
          زيارة الموقع الإلكتروني
        </a>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold"
        >
          تسجيل خروج
        </button>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="font-bold text-2xl mb-4">
            البيانات الشخصية
          </h2>

          <p className="mb-2">
            <strong>الإيميل:</strong>
            {userData.email}
          </p>

          <input
            type="file"
            className="mb-3"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="رقم الهاتف"
            value={userData.phone || ''}
            onChange={(e) =>
              setUserData({
                ...userData,
                phone: e.target.value
              })
            }
            className="w-full p-3 border rounded-xl mb-3"
          />

          <input
            type="text"
            placeholder="الجامعة"
            value={userData.university || ''}
            onChange={(e) =>
              setUserData({
                ...userData,
                university: e.target.value
              })
            }
            className="w-full p-3 border rounded-xl mb-3"
          />

          <textarea
            placeholder="نبذة"
            value={userData.bio || ''}
            onChange={(e) =>
              setUserData({
                ...userData,
                bio: e.target.value
              })
            }
            className="w-full p-3 border rounded-xl mb-3"
          />

          <button
            onClick={saveData}
            className="bg-green-500 text-white px-6 py-2 rounded-xl"
          >
            حفظ
          </button>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="font-bold text-2xl mb-4">
            الأنشطة
          </h2>

          {
            userData.activities?.length > 0 ?

            userData.activities.map((activity, index) => (

              <div
                key={index}
                className="bg-gray-100 p-3 rounded-xl mb-2"
              >
                {activity}
              </div>

            ))

            :

            <p>لا توجد أنشطة</p>
          }

          <select className="w-full p-3 border rounded-xl mt-4">

            <option>اختر نشاط</option>

            {
              activitiesList.map((activity, index) => (

                <option key={index}>
                  {activity}
                </option>

              ))
            }

          </select>

        </div>

        <div className="bg-white p-6 rounded-2xl shadow">

          <h2 className="font-bold text-2xl mb-4">
            الشهادات
          </h2>

          {
            userData.certificates?.length > 0 ?

            userData.certificates.map((certificate, index) => (

              <div
                key={index}
                className="bg-gray-100 p-3 rounded-xl mb-2"
              >
                {certificate}
              </div>

            ))

            :

            <p>لا توجد شهادات</p>
          }

          <button
            onClick={requestCertificate}
            className="bg-green-600 text-white w-full p-3 rounded-xl mt-4"
          >
            طلب شهادة
          </button>

        </div>

      </div>

    </div>

  )

}
