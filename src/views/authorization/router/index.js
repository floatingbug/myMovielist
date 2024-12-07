import SignIn from '@/views/authorization/SignInView.vue';
import SignUp from '@/views/authorization/SignUpView.vue';

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
