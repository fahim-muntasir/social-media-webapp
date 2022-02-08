import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const getCurrentUser = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        setIsLogin(true);
      }
      setLoading(false);
    });
    return getCurrentUser;
  }, []);

  const loginWithGoogle = (cd) => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        cd({ msg: "Suercreate create successfull." });
        setCurrentUser(result.user);
      })
      .catch((err) => {
        cd({ error: err.message });
      });

    const user = auth.currentUser;
    setCurrentUser({
      ...user,
    });
  };

  const logOut = () => {
    const auth = getAuth();
    setIsLogin(false);
    return signOut(auth);
  };

  const sherePostApi = (file, description, cd) => {
    if (file !== "" && description !== "") {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshort) => {
          const progress =
            (snapshort.bytesTransferred / snapshort.totalBytes) * 100;
          console.log(progress);
        },
        (error) => cd({ error: error.message }),
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const db = getFirestore();

            const docInfo = {
              author: {
                date: Timestamp.fromDate(new Date()),
                user: currentUser.email,
                imageUrl: currentUser.photoURL,
                userName: currentUser.displayName,
              },
              comment: 0,
              description: description,
              shereImage: downloadURL,
            };
            await addDoc(collection(db, "posts"), docInfo);
            cd({ msg: "Data insert successfull." });
          });
        }
      );
    }
  };

  const getDataApi = async (cd) => {
    const db = getFirestore();
    const orderData = query(
      collection(db, "posts"),
      orderBy("author.date", "desc")
    );
    onSnapshot(orderData, (allData) => {
      cd(allData);
    });
  };

  const value = {
    loginWithGoogle,
    logOut,
    sherePostApi,
    getDataApi,
    currentUser,
    isLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
