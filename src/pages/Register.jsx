import { useState } from 'react'
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'

import {
  doc,
  setDoc
} from 'firebase/firestore'

import { auth, db } from '../firebase/config'
import { useNavigate } from 'react-router-dom'

export default function Register() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = async () => {

    try {

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )

      const user = userCredential.user

      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        points: 0,
        hours: 0,
        activities: [],
        certificates: [],
        createdAt: new Date()
      })

      navigate('/dashboard')

    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>

      <div className='bg-white p-8 rounded-2xl shadow-xl w-[350px]'>

        <h1 className='text-3xl font-bold text-primary mb-6 text-center'>
          إنشاء حساب
        </h1>

        <input
          className='w-full border p-3 rounded-xl mb-4'
          placeholder='الاسم'
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className='w-full border p-3 rounded-xl mb-4'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type='password'
          className='w-full border p-3 rounded-xl mb-4'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className='w-full bg-orange text-white p-3 rounded-xl'
        >
          إنشاء الحساب
        </button>

      </div>

    </div>
  )
}
