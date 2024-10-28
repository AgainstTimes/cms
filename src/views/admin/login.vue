<script setup>

import '@/assets/admin/css/admin.css'
import {User, Lock} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import axios from 'axios'
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";
import {useAdminStore} from "@/stores/admin/admin.js";

const router = useRouter();
const adminStore = useAdminStore();
const data = reactive({
  name: '',
  password: '',
})

const rules = {
  name: [
    {required: true, message: 'please enter name', trigger: 'blur'},
    {min: 2, max: 5, message: ' character length between 2 and 5', trigger: 'blur'},
  ],
  password: [
    {required: true, message: 'please enter password', trigger: 'blur'},
  ]
}
const loginForm = ref()


const login = () => {

  loginForm.value.validate((valid) => {
    if (!valid) {
      return
    }
    axios.post('http://localhost:80/api/adm/login', data).then(res => {
      /*console.log(res.data)*/
      if (!res.data.status) {
        ElMessage.error(res.data.msg)
        return
      }
      //token 解码
      let payloadObj = JSON.parse(atob(res.data.data.token.split('.')[1]));
     // console.log("payloadObj:",payloadObj)

      //管理员状态存储至 pinia (持久化存储到 localStorage 中)
      adminStore.save(payloadObj.name, res.data.data.token, payloadObj.expireDate)
     // console.log(adminStore.data)
      router.push('/admin')
    }).catch(err => {
      console.log("err:", err)
    })
  })
}

</script>

<template>
  <div class="login">
    <el-form :model="data" label-position="top" :rules="rules" ref="loginForm">
      <div class="title">
        CMS
      </div>
      <el-form-item prop="name" label="Name">
        <el-input :prefix-icon=User v-model="data.name" clearable/>
      </el-form-item>

      <el-form-item prop="password" label="Password">
        <el-input show-password :prefix-icon=Lock v-model="data.password" clearable/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login">login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>