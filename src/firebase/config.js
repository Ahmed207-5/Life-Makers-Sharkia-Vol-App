import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCKiMVRDuiKYutcjcTHie2_FKJhcAyptTk",
  authDomain: "life-makers-sharqia.firebaseapp.com",
  projectId: "life-makers-sharqia",
  storageBucket: "life-makers-sharqia.firebasestorage.app",
  messagingSenderId: "935272961884",
  appId: "1:935272961884:web:5a3a411d948f83453b1399",
  measurementId: "G-QDYWBCS9FT"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
