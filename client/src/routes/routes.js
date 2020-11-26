// import Signin from '../components/Signin.vue';
// import Login from '../components/Login.vue';
// import Dashboard from '../components/Dashboard.vue';
// import Profile from '../components/profile.vue';
// import userProfile from '../components/userProfile.vue';
// import Admin from '../components/Admin.vue';
// import Post from '../components/post.vue';
// import categoryPost from '../components/postCategory.vue';
// import createPost from '../components/newPost.vue';
// import Edit from '../components/edit.vue';

import notFound from '../components/notFound.vue';
import Dashboard from '../components/mainComponent.vue'
import Router from 'vue-router';
// import jwt_decode from "jwt-decode";

let router = new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            // meta: {
            //     requiresAuth: false,
            // },
        },
        // {
        //     path: '/login',
        //     name: 'Login',
        //     component: Login,
        //     meta: {
        //         guest: true,
        //     },
        // },
        // {
        //     path: '/signin',
        //     component: Signin,
        //     meta: {
        //         guest: true,
        //     },
        // },
        // {
        //     path: '/admin',
        //     name: 'Admin',
        //     component: Admin,
        //     meta: {
        //         requiresAuth: true,
        //         is_admin: true,
        //     },
        // },
        // {
        //     path: '/profile',
        //     component: Profile,
        //     meta: {
        //         requiresAuth: true,
        //     },
        // },
        // {
        //     path: '/user/:id',
        //     component: userProfile,
        //     meta: {
        //         requiresAuth: true,
        //     },
        // },
        // {
        //     path: '/post/:id',
        //     component: Post,
        //     meta: {
        //         requiresAuth: false,
        //     },
        // },
        // {
        //     path: '/post/category/:id',
        //     component: categoryPost,
        //     meta: {
        //         requiresAuth: true,
        //     },
        // },
        // {
        //     path: '/new-post',
        //     component: createPost,
        //     meta: {
        //         requiresAuth: true,
        //     },
        // },
        // {
        //     path: '/post/edit',
        //     name: 'Edit',
        //     component: Edit,
        //     meta: {
        //         requiresAuth: true,
        //     },
        // },
        {
            path: '/api/projects/all',
            component: notFound,
            // meta: {
            //     requiresAuth: false,
            // },
        },
        {
            path: '*',
            component: notFound,
            // meta: {
            //     requiresAuth: false,
            // },
        },
    ],
});
/*
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') === null) {
            next({
                name: 'Login',
                params: {
                    nextUrl: to.fullPath
                },
            });
        } else {
            let decodedToken = null;
            try {
                decodedToken = jwt_decode(localStorage.getItem('jwt', {
                    header: true
                }));
            } catch (error) {
                localStorage.removeItem('jwt');
                next({
                    name: 'Login'
                });
            }
            if (to.matched.some((record) => record.meta.is_admin)) {
                if (decodedToken.admin === 1) {
                    next({
                        name: 'Admin'
                    });
                } else {
                    next({
                        name: 'Dashboard'
                    });
                }
            } else {
                next();
            }
        }
    } else if (to.matched.some((record) => record.meta.guest)) {
        if (localStorage.getItem('jwt') === null) {
            next();
        } else {
            try {
                const decodedToken = jwt_decode(localStorage.getItem('jwt', {
                    header: true
                }));
            } catch (error) {
                localStorage.removeItem('jwt');
                next({
                    name: 'Login'
                });
            }
            next({
                name: 'Dashboard'
            });
        }
    } else {
        next();
    }
});
*/
export default router;