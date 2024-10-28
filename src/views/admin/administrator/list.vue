<script setup>
import {onMounted, reactive} from "vue";
import Axios from "@/utils/Axios.js";
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "@/utils/Axios.js";
import {useRouter} from "vue-router";
const router =  useRouter();
const data = reactive({
  list: []
})
onMounted(() => {
  Axios.get('/api/adm/list').then(res => {
    if (!res.status) {
      ElMessage.error(res.msg)
      return;
    }
    data.list = res.data.list;

  }).catch((err) => {
    ElMessage.error(err.message);
  })
})

const del = async (row) => {
  try {
    await ElMessageBox.confirm('confirm delete?', 'title', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning'
    })
    let delResult = await axios.post('/api/adm/del', {id: String(row.id)})
    if (!delResult.status) {
      ElMessage.error(delResult.msg)
      return;
    }
    let getListResult = await Axios.get('/api/adm/list')
    if (!getListResult.status) {
      ElMessage.error(getListResult.msg)
      return;
    }
    data.list = getListResult.data.list;
  } catch (err) {
    ElMessage.error(err.message);
  }
}
const edit = (row) => {
  //跳转至编辑页
  router.push({path: '/administrator/edit', query: {id: row.id}})
}
</script>

<template>
  <el-table :data="data.list" border style="width: 100%">
    <el-table-column label="ID" width="60" prop="id"/>
    <el-table-column label="Name" prop="name"/>
    <el-table-column label="Email" prop="email"/>
    <el-table-column label="remark" prop="remark"/>
    <el-table-column label="option" width="150" prop="remark">
      <template #default="scope">
        <el-button size="small" type="primary" @click="edit(scope.row)">edit</el-button>
        <el-button size="small" @click="del(scope.row)">del</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>