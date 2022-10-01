<template>
    <h1>Create an Account</h1>
    <p><input type="email
      " placeholder="Email" v-model="email"></p>
    <p><input type="password" placeholder="Password" v-model="password"></p>
    <p v-if="errMsg">{{ errMsg}}</p>
    <p><button @click="register">Submit</button></p>
    <p>
      <button @click="signInWithGoogle">Sign in With Google
        <font-awesome-icon :icon="['fab', 'google']" />  
      </button>
    </p>

</template>

<script setup>
  import { ref } from 'vue';
  import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { useRouter } from 'vue-router';
  const router = useRouter();

  const email = ref("");
  const password = ref("");  
  const errMsg = ref("");

  const register = ()=>{
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((data) =>{
        console.log("Successfully registered");
        console.log(auth.currentUser);
        router.push("/feed")
      })
      .catch((error) =>{
        console.log(error.code);
        switch(error.code){
          case "auth/email-already-exists":
            errMsg.value = "email-already-exist";
            break;
          case "auth/invalid-email":
            errMsg.value = "email-already-exist";
            break;
          default:
            errMsg.value = "Enter valid details";
            break;
        }
        alert(error.message);
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