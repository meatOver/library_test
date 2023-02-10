import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomePage from "@/components/home/HomePage";
import bookCheckin from "@/components/commont/bookManagement/bookCheckin";
import bookReturn from "@/components/commont/bookManagement/bookReturn";
import homeIndex from "@/components/commont/home/homeIndex";
import userSearch from "@/components/commont/User/userSearch";
import addUser from "@/components/commont/User/addUser";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },

    {
        path: '/homePage',
        name: 'homePage',
        component: HomePage,
        children: [
            {
                path: '/userSearch',
                name: 'user',
                component: userSearch
            },
            {
                path: '/addUser',
                name: 'addUser',
                component: addUser
            },
            {
                path: '/checkin',
                name: 'checkin',
                component: bookCheckin
            },

            {
                path: '/return',
                name: 'return',
                component: bookReturn
            },
            {
                path: '/record',
                name: 'record',
                component: () => import('../components/commont/bookManagement/bookRecord')//bookRecord
            },
            {
                path: '/search',
                name: 'search',
                component: () => import('../components/commont/bookManagement/bookSearch')
            }
            ,
            {
                path: '/online',
                name: 'online',
                component: () => import('../components/commont/bookUser/onlineUser')
            },
            {
                path: '/outTime',
                name: 'outTime',
                component: () => import('../components/commont/bookUser/outTime')
            },
            {
                path: '/logs',
                name: 'logs',
                component: () => import('../components/commont/bookBoring/bookLogs')
            }
        ]
    },
    // }
    // {
    // path: '/about',
    // name: 'about',
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 检测是否存在token
// router.beforeEach((to, form, next) => {
//     let token = localStorage.getItem("token");
//     console.log("token:", token);
//     if (token || to.path === "/") {
//         next()
//     } else {
//         next("/")
//     }
// })
export default router
