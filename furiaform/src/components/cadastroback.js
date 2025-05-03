import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseconnection";

async function cadastrar(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Usuário cadastrado com sucesso:", userCredential.user);
    return true; // Retorna true se o cadastro for bem-sucedido
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error.message);
    return false; // Retorna false se o cadastro falhar
  }
}

export default cadastrar;