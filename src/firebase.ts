import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: 'AIzaSyBUalx-9rhb7xvf8mg088bpZPiBQy3MJdk',
  authDomain: 'task-manager-2a881.firebaseapp.com',

  projectId: 'task-manager-2a881',
  storageBucket: 'task-manager-2a881.appspot.com',
  messagingSenderId: '825721550876',
  appId: '1:825721550876:web:bc77f5ed69731d06b9c7d9',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db , storage };
