import LegalView from "../LegalView.vue";
import Imprint from "../pages/Imprint.vue";
import PrivacyPolicy from "../pages/PrivacyPolicy.vue";


export default [
	{
		path: "/legal",
		component: LegalView,
		children: [
			{
				path: "privacy-policy",
				component: PrivacyPolicy,
			},
			{
				path: "imprint",
				component: Imprint,
			},
		],
	},
];
