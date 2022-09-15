import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBQkHU9vmiOHx0b_xYWe6gkoDTG11woa1M",
    authDomain: "apartment-api-e918b.firebaseapp.com",
    projectId: "apartment-api-e918b",
    storageBucket: "apartment-api-e918b.appspot.com",
    messagingSenderId: "556804653692",
    appId: "1:556804653692:web:3b991988ade6fccaf2bff9"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);