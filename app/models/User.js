import app from "../firebase/config";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  getFirestore,
  getDocs,
  setDoc,
  query,
  where,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { Alert } from "../services";

const firestore = getFirestore(app);
const auth = getAuth(app);
class User {
  constructor() {
    this.db = collection(firestore, "users");
    this.auth = auth;
  }

  onLoginStateChanged(callback) {
    return auth.onAuthStateChanged(user => {
      let loggedIn = false;
      if (user) {
        if (user.email !== "jhon@gmail.com") {
          if (user.emailVerified) {
            loggedIn = true;
          }
        } else {
          loggedIn = true;
        }
      }
      callback(loggedIn);
    });
  }

  async register({ email, password, firstName, lastName, phone }) {
    try {
      const usersRef = collection(firestore, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", email))
      );

      if (!querySnapshot.empty) {
        Alert.open({
          title: "register error",
          message: "email already exsite please enter onther email !",
          type: "danger",
        });
        return null;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Add user to Firestore collection
      const userData = {
        email,
        firstName,
        lastName,
        phone,
        image:
          "https://firebasestorage.googleapis.com/v0/b/e-trajet.appspot.com/o/user.png?alt=media&token=a4477d27-d6a8-4e33-9315-aaf8eea0dd1d&_gl=1*18vmf0k*_ga*MTkxNTk1NTMwOC4xNjg1Nzk4OTcz*_ga_CW55HF8NVT*MTY4NTk5MDc0Mi44LjEuMTY4NTk5MTA5MC4wLjAuMA..",
      };
      await setDoc(doc(usersRef, userCredential.user.uid), userData);

      await sendEmailVerification(auth.currentUser);

      return userCredential;
    } catch (error) {
      Alert.open({
        title: "Error",
        message: error,
        type: "danger",
      });
      console.log(String(error));
    }
  }

  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      // console.log(error.code);
      if (error.code === "auth/user-not-found") {
        Alert.open({
          title: "Error",
          message: "email wrong please enter your correct email !",
          type: "danger",
        });
      } else if (error.code === "auth/wrong-password") {
        Alert.open({
          title: "Error",
          message: "password wrong please enter your correct password !",
          type: "danger",
        });
      } else {
        Alert.open({
          title: "Error",
          message: error,
          type: "danger",
        });
      }
    }
  }

  async logout() {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  async createUser(userData) {
    try {
      const docRef = await addDoc(this.db, userData);
      return docRef.id;
    } catch (error) {
      Alert.open({
        title: "Error",
        message: error,
        type: "danger",
      });
      console.log(String(error));
    }
  }

  getAllUsers(callback) {
    try {
      return onSnapshot(this.db, querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          const userData = { id: doc.id, ...doc.data() };
          users.push(userData);
        });
        callback(users);
      });
    } catch (error) {
      Alert.open({
        title: "Error",
        message: error,
        type: "danger",
      });
      console.log(String(error));
    }
  }

  getUserById(userId, callback) {
    try {
      return onSnapshot(doc(this.db, userId), doc => {
        if (doc.exists()) {
          const userData = { id: doc.id, ...doc.data() };
          callback(userData);
        } else {
          console.log("User not found");
          callback(null);
        }
      });
    } catch (error) {
      Alert.open({
        title: "Error",
        message: error,
        type: "danger",
      });
      console.log(String(error));
    }
  }

  async updateUser(userId, newData) {
    try {
      await updateDoc(doc(this.db, userId), newData);
      console.log("User updated successfully");
    } catch (error) {
      Alert.open({
        title: "Error",
        message: error,
        type: "danger",
      });
      console.log(String(error));
    }
  }

  async deleteUser(userId) {
    try {
      await deleteDoc(doc(this.db, userId));
      console.log("User deleted successfully");
    } catch (error) {
      Alert.open({
        title: "Error",
        message: error,
        type: "danger",
      });
      console.log(String(error));
    }
  }
}

export default User;
