import TermsOfUse from "../components/TermsOfUse.vue";
import PrivacyPolicy from "../components/PrivacyPolicy.vue";

const footerRoutes = [
  {
    path: '/privacy-policy',
    name: 'privacyPolicy',
    component: PrivacyPolicy,
  },
  {
    path: '/Terms-of-use',
    name: 'termsOfUse',
    component: TermsOfUse,
  },
];


export default footerRoutes;
