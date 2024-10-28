<script setup>

import {reactive} from "vue";
import {ElMessage} from "element-plus";
import axios from "@/utils/Axios.js";
import Time from "@/utils/Time.js";

const data = reactive({
  name: "",
  email: "",
  password: "",
  gender: 0,
  remark: "Akeelah and Jessika"
})
const add = () => {
  if (data.name.length <= 1) {
    ElMessage.error("Please enter name");
  }
  if (data.password.length <= 1) {
    ElMessage.error("Please enter password");
  }
  data.create_time = Time.now()
  axios.post('/api/adm/add', data).then(res => {
    if (!res.status) {
      ElMessage.error(res.msg)
    }
    ElMessage.success("success");
  }).catch((err) => {
    ElMessage.error(err.message);
  })
}
const reset = () => {
  data.name = ""
  data.email = ""
  data.password = ""
  data.remark = ""
  data.gender = 0
}
</script>

<template>
  <el-form label-width="80px" style="width: 400px;">
    <el-form-item label="name">
      <el-input placeholder="Name" v-model="data.name"/>
    </el-form-item>
    <el-form-item label="password">
      <el-input placeholder="password" v-model="data.password"/>
    </el-form-item>
    <el-form-item label="email">
      <el-input placeholder="email" v-model="data.email"/>
    </el-form-item>
    <el-form-item label="gender">
      <el-radio-group v-model="data.gender">
        <el-radio value="male">male</el-radio>
        <el-radio value="female">female</el-radio>
        <el-radio value="0">unknown</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="remark">
      <el-input placeholder="remark" v-model="data.remark" type="textarea" rows:4/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="add">add</el-button>
      <el-button @click="reset">reset</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>