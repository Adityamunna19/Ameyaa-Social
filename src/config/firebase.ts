import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBJ5oeJyT_r09rBx_VXUGqKGXaL4dcUuDw",
  authDomain: "ameeya-social.firebaseapp.com",
  projectId: "ameeya-social",
  storageBucket: "ameeya-social.firebasestorage.app",
  messagingSenderId: "24050992479",
  appId: "1:24050992479:web:5daaa076bca88e89a7e2ea"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);