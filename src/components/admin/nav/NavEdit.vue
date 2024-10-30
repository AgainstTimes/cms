<script setup>
import {reactive, onUpdated} from 'vue'
import {ElMessage} from 'element-plus'
import {useNavStore} from '@/stores/admin/nav'
import NavAPI from '@/api/NavAPI'


//初始化
const navStore = useNavStore()

const data = reactive({ //数据
  name: '',
  path: '',
  icon: '',
  sort: '0',
  status: '1'
})

//在组件更新之后调用
onUpdated(() => {
  if (navStore.data.pageEdit) { //若 pageEdit = true, 则打开了编辑页对话框
    NavAPI.getById(navStore.data.id).then(result => {
      //console.log(result)

      if (!result.status) {
        ElMessage.error(result.msg)
        return
      }

      data.name = result.data.name
      data.path = result.data.path
      data.icon = result.data.icon
      data.sort = result.data.sort
      data.status = result.data.status
    }).catch(err => {
      console.log("err:", err)
    })
  }
})

const edit = () => { //编辑
  if (data.name === '') {
    ElMessage.error("请填写名称")
    return
  }
  if (data.path === "") {
    ElMessage.error("请填写路径")
    return
  }

  let values = {
    id: String(navStore.data.id),
    name: data.name,
    path: data.path,
    icon: data.icon,
    sort: data.sort,
    status: data.status
  }
  //console.log(values)

  NavAPI.edit(values).then(result => {
    //console.log(result)

    if (!result.status) {
      ElMessage.error(result.msg)
      return
    }

    ElMessage.success("编辑成功")

    navStore.data.pageEdit = false //关闭对话框
    navStore.getList(navStore.data.parentId)  //重新获取列表
  }).catch(err => {
    console.log("err:", err)
  })
}

const close = () => { //关闭对话框
  data.name = ''
  data.path = ''
  data.icon = ''
  data.sort = '0'
  data.status = '1'
}
</script>

<template>
  <el-dialog v-model="navStore.data.pageEdit" draggable @close="close" width="600" title="添加导航">
    <el-form label-width="80">
      <el-form-item label="名称">
        <el-input v-model="data.name" placeholder="请填写名称"/>
      </el-form-item>

      <el-form-item label="路径">
        <el-input v-model="data.path" placeholder="请填写路径"/>
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="data.icon"/>
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
        <el-button type="primary" @click="edit">编辑</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>