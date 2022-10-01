<template>
  <h1>Sign In into your Account</h1>
  <p><input type="text" placeholder="Email" v-model="email"></p>
  <p><input type="password" placeholder="Password" v-model="password"></p>
  <p v-if="errMsg">{{ errMsg }}</p>
  <p><button @click="signIn">Submit</button></p>
  <p>
    <button @click="signInWithGoogle">Sign in With Google
      
      <font-awesome-icon :icon="['fab', 'google']" shake/>  
    </button>
  </p>

</template>

<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref("");
const password = ref("");  
const errMsg = ref();  


const signIn = ()=>{
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) =>{
      const user = data.user;
      console.log("Successfully registered"+user);
      console.log(auth.currentUser);
      router.push("/feed")
    })
    .catch((error) =>{
      console.log(error.code);
      switch(error.code){
        case "auth/invalid-email":
          errMsg.value ="Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value ="Invalid email";
          break;
        case "auth/wrong-password":
          errMsg.value ="Invalid email";
          break;
        default:
          errMsg.value ="Email or password is incorrecy";
          break;
      }
    })
  
}
const signInWithGoogle = ()=>{
  const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
      .then((result)=>{
        console.log(result.user);
      })
      .catch((error)=>{
        console.log(error.code);
        console.log(error.message);
      })  
  
}


</script>