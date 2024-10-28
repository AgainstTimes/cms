<script setup>
import {reactive, inject} from 'vue'
import {ElMessage} from "element-plus";
import Time from '@/utils/Time.js'
import CategoryAPI from "@/api/CategoryAPI.js";

const injectData = inject('provideData')
const injectFuncGetList = inject("provideFuncGetList") //注入祖先组件提供的方法

const data = reactive({ //数据
  name: '',
  sort: '0',
  status: '1'
})

/*const show = ref(true) //默认显示*/

const add = () => { //添加
  if (data.name === "") {
    ElMessage.error("Please enter name")
    return
  }
  let values = {
    parent_id: injectData.parentId,
    level: injectData.level,
    name: data.name,
    sort: data.sort,
    status: data.status,
    create_time: Time.now()
  }
  CategoryAPI.add(values).then((res) => {
    if (!res.status) {
      ElMessage.error(res.msg)
    }
    ElMessage.success("Add Successfully")
    injectData.pageAdd = false
    injectFuncGetList()
  }).catch(err => {
    console.log("err:", err)
  })
}

const close = () => { //关闭对话框
  data.name = ''
  data.sort = '0'
  data.status = '1'
}

</script>

<template>
  <el-dialog v-model="injectData.pageAdd" draggable @close="close" width="600" title="添加类别">
    <el-form label-width="80">
      <el-form-item label="名称">
        <el-input v-model="data.name" placeholder="请填写名称"/>
      </el-form-item>

      <el-form-item label="排序">
        <el-input v-model="data.sort"/>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="data.status">
          <el-radio value="1">显示</el-radio>
          <el-radio value="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>