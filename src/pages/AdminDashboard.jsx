import { useEffect, useState } from 'react'

import {
  collection,
  getDocs
} from 'firebase/firestore'

import { db } from '../firebase/config'

export default function AdminDashboard() {

  const [users, setUsers] = useState([])

  useEffect(() => {

    const fetchUsers = async () => {

      const querySnapshot =
        await getDocs(collection(db, 'users'))

      const usersData = []

      querySnapshot.forEach((doc) => {

        usersData.push({
          id: doc.id,
          ...doc.data()
        })

      })

      setUsers(usersData)

    }

    fetchUsers()

  }, [])

  return (

    <div className='p-6'>

      <h1 className='text-4xl font-bold text-primary mb-6'>
        لوحة الأدمن
      </h1>

      <div className='bg-white rounded-2xl shadow p-6'>

        <h2 className='text-2xl font-bold mb-4'>
          المتطوعين
        </h2>

        <div className='space-y-4'>

          {users.map((user, index) => (

            <div
              key={index}
              className='border p-4 rounded-xl'
            >

              <p>
                <strong>الاسم:</strong>
                {user.name}
              </p>

              <p>
                <strong>الإيميل:</strong>
                {user.email}
              </p>

              <p>
                <strong>الساعات:</strong>
                {user.hours}
              </p>

              <p>
                <strong>النقاط:</strong>
                {user.points}
              </p>

              <p>
                <strong>الدور:</strong>
                {user.role || 'volunteer'}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  )

}
