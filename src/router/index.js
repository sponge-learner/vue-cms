import Vue from 'vue'
import VueRouter from 'vue-router'

import { Message } from 'element-ui'
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

//页面级组件
import Layout from '@/components/Layout.vue'

const routes = [{
		path: '/login',
		//起别名
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue')

	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue')
	},
	{
		path: '/article/',
		name: 'Article',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'ArticleList',
				component: () => import('@/views/Article/List.vue')

			},
			{
				path: 'release',
				name: 'ArticleRelease',
				component: () => import('@/views/Article/Release.vue')

			},
			{
				path: 'edit/:id',
				name: 'ArticleEdit',
				component: () => import('@/views/Article/Edit.vue'),
				props: true
				

			},
		]
	},
	{
		path: '/category/',
		name: 'Category',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'CategoryList',
			component: () => import('@/views/Category/List.vue')

		}, ],
	},
	{
		path: '/admin/',
		name: 'Admin',
		component: Layout,
		//admin开头的路由，都需要登录。
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'AdminList',
				component: () => import('@/views/Admin/List.vue')

			},
			{
				path: 'release',
				name: 'AdminRelease',
				component: () => import('@/views/Admin/Release.vue')

			},
			{
				path: 'edit/:id',
				name: 'AdminEdit',
				component: () => import('@/views/Admin/Edit.vue'),
				props: true
			},
		],
	},
	{
		path: '/user/',
		name: 'User',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'UserList',
				component: () => import('@/views/User/List.vue')

			},
			{
				path: 'release',
				name: 'UserRelease',
				component: () => import('@/views/User/Release.vue')

			},
			{
				path: 'edit/:id',
				name: 'UserEdit',
				component: () => import('@/views/User/Edit.vue')

			},
			{
				path: 'account',
				name: 'UserAccount',
				component: () => import('@/views/User/Account.vue')

			},
		]

	},
	{
		path: '/power/',
		name: 'Power',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
				path: 'list',
				name: 'PowerList',
				component: () => import('@/views/Power/List.vue')

			},

		]

	},
]

const router = new VueRouter({
	routes
})
//全局守卫
router.beforeEach((to, from, next) => {
	// console.log(to);
	// console.log(from);
	console.log(to.matched);
	//根据meta元信息校验路由是否需要登录授权

	let isRequiresAuth = to.matched.some((path) => path.meta.requiresAuth);
	if (!isRequiresAuth) {
		next();
		return;
	}

	//校验token
	let token = sessionStorage.token;
	//有token 放行
	if (token) {
		next();
		return;
	}
	if (!token) {
		//无token，强制跳转登录		
		Message.error('无效的token，请重新登录');
		setTimeout(() => {
			next(`/login?redirect=${to.path}`);
		}, 2000)
	}






})

export default router
