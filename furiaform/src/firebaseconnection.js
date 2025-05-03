// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBW7kNstIHfaLTicWKs87Ckj5_TJ5ne_Yc",
  authDomain: "furiaforms.firebaseapp.com",
  projectId: "furiaforms",
  storageBucket: "furiaforms.appspot.com", // corrigido
  messagingSenderId: "113773243194",
  appId: "1:113773243194:web:cbfe4f00d57a57d419fe03",
  measurementId: "G-56CGR732N3"
};

// Inicialização
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Exportando para uso em outros arquivos
export { app, analytics, auth, db, storage };
