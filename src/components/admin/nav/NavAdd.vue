<script setup>
import {reactive} from 'vue'
import {ElMessage} from 'element-plus'
import {useNavStore} from '@/stores/admin/nav'
import NavAPI from '@/api/NavAPI'
import TimeDR from '@/utils/Time.js'

//初始化
const navStore = useNavStore()

const data = reactive({ //数据
  name: '',
  path: '',
  icon: '',
  sort: '0',
  status: '1'
})

const add = () => { //添加
  if (data.name === '') {
    ElMessage.error("请填写名称")
    return
  }
  if (data.path === "") {
    ElMessage.error("请填写路径")
    return
  }

  let values = {
    parent_id: navStore.data.parentId,
    level: navStore.data.level,
    name: data.name,
    path: data.path,
    icon: data.icon,
    sort: data.sort,
    status: data.status,
    create_time: TimeDR.now()
  }
  //console.log(values)

  NavAPI.add(values).then(result => {
    //console.log(result)

    if (!result.status) {
      ElMessage.error(result.msg)
      return
    }

    ElMessage.success("添加成功")

    navStore.data.pageAdd = false //关闭对话框
    navStore.getList(values.parent_id)  //重新获取列表
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
  <el-dialog v-model="navStore.data.pageAdd" draggable @close="close" width="600" title="添加导航">
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
        <el-button type="primary" @click="add">添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped>

</style>