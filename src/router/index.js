import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from '@firebase/auth';

import HomeView from '../views/Home.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {path:"/register", name: "Register", component: ()=>import("../views/Register.vue")},
  {path:"/sign-in", name: "Signin", component: ()=>import("../views/SignIn.vue")},
  { path:"/feed",
    name: "Feed",
    component: ()=>import("../views/Feed.vue"),
    meta:{
      requiresAuth:true
    },
  },
  // {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const getCurrentUser =() =>{
  return new Promise((resolve, reject)=>{
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user)=>{
        removeListener();
        resolve(user);
      },
      reject
    );
  })
}
router.beforeEach( async (to, from, next)=>{  //Setups a navigation guard which runs before ache vue router
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(await getCurrentUser){
      next();
    }else{
      alert("You dont have access!");
      next("/");
    }
  }else{
    next();
  }
});
export default router
