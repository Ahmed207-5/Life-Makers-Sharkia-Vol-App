import { useState } from 'react'

import {
  signInWithEmailAndPassword
} from 'firebase/auth'

import { auth, db } from '../firebase/config'

import {
  doc,
  getDoc
} from 'firebase/firestore'

import {
  useNavigate,
  Link
} from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

 const handleLogin = async () => {

  try {

    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

    const user = userCredential.user

    const docRef = doc(db, 'users', user.uid)

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {

      const userData = docSnap.data()

      if (userData.role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/dashboard')
      }

    }

  } catch (err) {
    alert(err.message)
  }

}

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-2xl shadow-xl w-[350px]'>
        <h1 className='text-3xl font-bold text-primary mb-6 text-center'>
          صناع الحياة الشرقية
        </h1>

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
          onClick={handleLogin}
          className='w-full bg-primary text-white p-3 rounded-xl'
        >
          تسجيل الدخول
        </button>

        <Link to='/register' className='block text-center text-orange mt-4'>
          إنشاء حساب جديد
        </Link>
      </div>
    </div>
  )
}
