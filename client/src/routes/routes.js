import notFound from '../components/notFound.vue';
import projectDetail from '../components/projectDetail.vue';
import Dashboard from '../components/mainComponent.vue'
import Router from 'vue-router';
// import jwt_decode from "jwt-decode";

const routes = [{
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
        {
            path: '/project/lala',
            component: projectDetail,
        },
        {
            path: '/project/:id',
            component: projectDetail,
        },
        {
            path: '*',
            component: notFound,
        },
    ];
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
export default routes;