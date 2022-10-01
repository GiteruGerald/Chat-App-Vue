import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

import "bootswatch/dist/sketchy/bootstrap.min.css";
// TODO: Note: Replace ^[theme]^ (examples: darkly, slate, cosmo, spacelab, and superhero. See https://bootswatch.com for current theme names.)




// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9lED8WpVgb5H_ri9vTORHN59iVuc1ue0",
  authDomain: "vue-chat-app-e2c50.firebaseapp.com",
  projectId: "vue-chat-app-e2c50",
  storageBucket: "vue-chat-app-e2c50.appspot.com",
  messagingSenderId: "154985853092",
  appId: "1:154985853092:web:1ad9733f37dce1f23a3631"
};

// Initialize Firebase
initializeApp(firebaseConfig);

//FontAwesome
library.add(faGoogle)

const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
.mount("#app")
