import SignIn from '@/views/SignInView.vue';
import SignUp from '@/views/SignUpView.vue';

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
