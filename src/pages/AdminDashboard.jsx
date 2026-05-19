import { useEffect, useState } from 'react'

import {
  collection,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore'

import { db } from '../firebase/config'

export default function AdminDashboard() {

  const [users, setUsers] = useState([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {

    fetchUsers()

  }, [])

  const fetchUsers = async () => {

    const querySnapshot =
      await getDocs(collection(db, 'users'))

    const usersData = []

    querySnapshot.forEach((docItem) => {

      usersData.push({
        id: docItem.id,
        ...docItem.data()
      })

    })

    setUsers(usersData)

    setLoading(false)

  }

  const updateUser = async (id, data) => {

    const userRef = doc(db, 'users', id)

    await updateDoc(userRef, data)

    fetchUsers()

  }

  if (loading) {

    return <div className='p-10'>Loading...</div>

  }

  return (

    <div className='p-6 bg-gray-100 min-h-screen'>

      <h1 className='text-4xl font-bold text-primary mb-8'>
        لوحة الأدمن
      </h1>

      <div className='grid gap-6'>

        {users.map((user, index) => (

          <div
            key={index}
            className='bg-white rounded-2xl shadow p-6'
          >

            <div className='mb-4'>

              <h2 className='text-2xl font-bold'>
                {user.name}
              </h2>

              <p>{user.email}</p>

            </div>

            <div className='grid md:grid-cols-2 gap-4'>

              <input
                type='number'
                placeholder='عدد الساعات'
                defaultValue={user.hours}
                className='border p-3 rounded-xl'
                onChange={(e) =>
                  user.hours = Number(e.target.value)
                }
              />

              <input
                type='number'
                placeholder='النقاط'
                defaultValue={user.points}
                className='border p-3 rounded-xl'
                onChange={(e) =>
                  user.points = Number(e.target.value)
                }
              />

              <input
                type='text'
                placeholder='الشهادات'
                className='border p-3 rounded-xl'
                onChange={(e) =>
                  user.certificate = e.target.value
                }
              />

              <input
                type='text'
                placeholder='ملاحظات'
                className='border p-3 rounded-xl'
                onChange={(e) =>
                  user.notes = e.target.value
                }
              />

            </div>

            <div className='flex flex-wrap gap-3 mt-6'>

              <button
                className='bg-green-600 text-white px-4 py-2 rounded-xl'
                onClick={() =>
                  updateUser(user.id, {
                    approved: true
                  })
                }
              >
                قبول
              </button>

              <button
                className='bg-red-600 text-white px-4 py-2 rounded-xl'
                onClick={() =>
                  updateUser(user.id, {
                    approved: false
                  })
                }
              >
                رفض
              </button>

              <button
                className='bg-blue-600 text-white px-4 py-2 rounded-xl'
                onClick={() =>
                  updateUser(user.id, {
                    hours: user.hours || 0,
                    points: user.points || 0,
                    notes: user.notes || '',
                    certificates:
                      user.certificate
                        ? [user.certificate]
                        : []
                  })
                }
              >
                حفظ البيانات
              </button>

            </div>

            <div className='mt-4 text-sm'>

              <p>
                <strong>الحالة:</strong>

                {user.approved
                  ? ' مقبول'
                  : ' غير مقبول'}
              </p>

              <p>
                <strong>الدور:</strong>

                {user.role || 'volunteer'}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}
