import { createRouter, createWebHistory } from "vue-router"
import {useAdminStore} from "@/stores/admin/admin.js";

const routes = [
    {
        path: "/", // http://localhost:5173/
        redirect: "/admin",
    },
    {
        path: "/login", // http://localhost:5173/login
        component: () => import("@/views/admin/login.vue")
    },
    {
        path: "/admin", // http://localhost:5173/admin
        component: () => import("@/views/admin/home.vue"),
        meta: { requiresAuth: true },
        children: [
            {
                path: "/administrator/add", // http://localhost:5173/admin/administrator/add
                component: () => import("@/views/admin/administrator/add.vue")
            },
            {
                path: "/administrator/list", // http://localhost:5173/administrator/list
                component: () => import("@/views/admin/administrator/list.vue")
            },
            {
                path: "/category/list", // http://localhost:5173/category/list
                component: () => import("@/views/admin/category/list.vue")
            },
        ]
    },
]

const router = createRouter({
    //使用url的#符号之后的部分模拟url路径的变化,因为不会触发页面刷新,所以不需要服务端支持
    //history: createWebHashHistory(),
    history: createWebHistory(),
    routes
})
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && useAdminStore().data.token === "") {
        console.log("Require authentication :", to.meta.requiresAuth);
        router.push("/login").then(() => {});
    } else {
        next();
    }
})
export default router