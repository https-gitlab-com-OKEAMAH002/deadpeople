import Vue from 'vue';
import VueRouter from 'vue-router';

import LMap from '@/components/LMap.vue';
import DatabaseEntry from '@/components/DatabaseEntry.vue';
import About from '@/components/About.vue';

Vue.use(VueRouter);


export default new VueRouter({
	routes: [
		{ 
			path: '/',
			name: 'Map', 
			component: LMap 
		},
		{ 
			path: '/database', 
			name: 'Database',
			component: DatabaseEntry
		},
		{ 
			path: '/about', 
			name: 'About',
			component: About
		}
	]
})