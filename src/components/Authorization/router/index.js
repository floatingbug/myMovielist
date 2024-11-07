import SignIn from '../SignIn.vue';
import SignUp from '../SignUp.vue';

const authRoutes = [
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn,
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
];


export default authRoutes;
