import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA1oHDQkYeKjrusrfPzh6l3aG52zlW3dEc',
  authDomain: 'video-f290e.firebaseapp.com',
  projectId: 'video-f290e',
  storageBucket: 'video-f290e.appspot.com',
  messagingSenderId: '215556628004',
  appId: '1:215556628004:web:2cd8b016196defe5ff02b1',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
