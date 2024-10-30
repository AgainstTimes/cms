import {createRouter, createWebHistory} from "vue-router"
import {useAdminStore} from "@/stores/admin/admin.js";
import Time from "@/utils/Time.js";
import {ElMessage} from "element-plus";
import Local from "@/utils/Local.js";
const routes = [
    {
        path: "/", // http://localhost:5173/
        redirect: "/admin" // 重定向
    },
    {
        path: "/login", // http://localhost:5173/login
        //component: () => import("../views/admin/login.vue")
        component: () => import("@/views/admin/login.vue")
    },
    {
        path: "/admin", // http://localhost:5173/admin
        component: () => import("@/views/admin/home.vue"),
        meta: { requiresAuth: true }, //身份验证
        children: [
            //管理员
            {
                path: "administrator/add", // http://localhost:5173/admin/administrator/add
                component: () => import("@/views/admin/administrator/add.vue")
            },
            {
                path: "administrator/edit", // http://localhost:5173/admin/administrator/edit
                component: () => import("@/views/admin/administrator/edit.vue")
            },
            {
                path: "administrator/list", // http://localhost:5173/admin/administrator/list
                component: () => import("@/views/admin/administrator/list.vue")
            },
            //类别管理
            {
                path: "category/list", // http://localhost:5173/admin/category/list
                component: () => import("@/views/admin/category/list.vue")
            },
            //文章管理
            {
                path: "article/add", // http://localhost:5173/admin/article/add
                component: () => import("@/views/admin/article/add.vue")
            },
            {
                path: "article/edit", // http://localhost:5173/admin/article/edit
                component: () => import("@/views/admin/article/edit.vue")
            },
            {
                path: "article/list", // http://localhost:5173/admin/article/list
                component: () => import("@/views/admin/article/list.vue")
            },
            //导航管理
            {
                path: "nav/list", // http://localhost:5173/admin/nav/list
                component: () => import("@/views/admin/nav/list.vue")
            },
        ]
    }
]

const router = createRouter({
    //使用url的#符号之后的部分模拟url路径的变化,因为不会触发页面刷新,所以不需要服务端支持
    //history: createWebHashHistory(),
    history: createWebHistory(), routes
})
//全局前置守卫
router.beforeEach((to, from, next) => {

    if (to.meta.requiresAuth) { //判断是否需要身份验证
        const adminStore = useAdminStore()
        //console.log(adminStore.data)
        if (adminStore.data.token === ""){
            ElMessage.error("Not logged in.")
            router.push("/login").then(() => {}) //跳转至登录页
        }

        //校验登录状态是否过期
        //let startTime = "2024-05-01 00:00:00"
        let startTime = Time.now()
        let endTime = adminStore.data.expireDate
        let timeSubResult = Time.timeSub(startTime,endTime)
        //console.log(timeSubResult)
        if(timeSubResult.expire){ //已过期
            ElMessage.error("Login expired, please log in again")
            Local.remove("admin") //删除 localStorage 中的 key
            router.push("/login").then(() => {}) //跳转至登录页
        }
        next()
    }else{
        next()
    }
})
export default router