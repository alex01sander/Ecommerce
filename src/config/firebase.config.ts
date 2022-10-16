
import { initializeApp } from '@firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBkXyocb6gHV7T2MK9qBJGMHu-1rUGMT_4',
  authDomain: 'ecommerce-d39ff.firebaseapp.com',
  projectId: 'ecommerce-d39ff',
  storageBucket: 'ecommerce-d39ff.appspot.com',
  messagingSenderId: '503255293299',
  appId: '1:503255293299:web:af34f90b0c0a9e44753906'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
