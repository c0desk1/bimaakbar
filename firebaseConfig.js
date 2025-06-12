// Import library Firebase yang dibutuhkan
import firebase from 'firebase/app';
import 'firebase/database'; // Digunakan untuk Realtime Database
import 'firebase/auth';     // Digunakan untuk Authentication (login/logout)
import 'firebase/storage';  // Digunakan untuk Firebase Storage (unggah gambar)

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDtMdCf91Ihh-SlhoZHLV4Taxg2YPmks14",
  authDomain: "bima-akbar-web.firebaseapp.com",
  databaseURL: "https://bima-akbar-web-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bima-akbar-web",
  storageBucket: "bima-akbar-web.appspot.com",
  messagingSenderId: "521611265429",
  appId: "1:521611265429:web:9e6c64385b5abcbad6e29c"
};

// Inisialisasi Firebase App
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export instance Firebase yang sudah diinisialisasi
export default firebase;
