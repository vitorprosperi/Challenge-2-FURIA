import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconnection";

async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Usuário logado com sucesso:", userCredential.user);
    return true;
  } catch (error) {
    
    return false;
  }
}

export default login;