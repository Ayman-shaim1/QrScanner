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
  orderBy,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { Alert } from "../services";
const firestore = getFirestore(app);

class Trip {
  constructor() {
    this.db = collection(firestore, "trips");
  }

  async creatTrip(tripData) {
    try {
      const docRef = await addDoc(this.db, {
        ...tripData,
        createdAt: serverTimestamp(),
      });
      return docRef;
    } catch (error) {
      console.log(String(error));
      Alert.open({
        title: "Create trip error",
        message: String(error),
        type: "danger",
      });
    }
  }

  async updateConfirmPayment(tripId) {
    try {
      const tripRef = doc(this.db, tripId);
      const tripDoc = await getDoc(tripRef);

      if (tripDoc.exists()) {
        const paiementDetails = tripDoc.data().paiementDetails || {};
        console.log("PAIMENTDATA:", JSON.stringify(paiementDetails));
        if (!paiementDetails.confirmPaiment) {
          await updateDoc(tripRef, {
            paiementDetails: {
              ...paiementDetails,
              confirmPaiment: true,
            },
          });
          return true; // Updated and confirmed payment, return true
        } else {
          return false; // Already confirmed payment, return false
        }
      } else {
        return false; // Trip document not found, return false
      }
    } catch (error) {
      Alert.open({
        title: "Error",
        message: String(error),
        type: "danger",
      });
      console.log(String(error));
    }
  }

  getTripById(tripId, callback) {
    try {
      return onSnapshot(doc(this.db, String(tripId)), doc => {
        if (doc.exists()) {
          const tripData = { id: doc.id, ...doc.data() };
          callback(tripData);
        } else {
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

  getAllUserTrips(userId, callback) {
    try {
      const userTripsQuery = query(
        this.db,
        where("userId", "==", userId),
        orderBy("createdAt", "desc")
      );

      return onSnapshot(userTripsQuery, querySnapshot => {
        const trips = [];
        querySnapshot.forEach(doc => {
          const tripData = { id: doc.id, ...doc.data() };
          trips.push(tripData);
        });
        callback(trips);
      });
    } catch (error) {
      Alert.open({
        title: "Error",
        message: String(error),
        type: "danger",
      });
      console.log(String(error));
    }
  }
}

export default Trip;
