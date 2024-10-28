<script setup>

import {Bell, MostlyCloudy} from "@element-plus/icons-vue";
import local from "@/utils/Local.js";
import {useAdminStore} from "@/stores/admin/admin.js";
import {useRouter} from 'vue-router'

const router = useRouter();
/*console.log(store.data);*/
const logout = () => {
  local.remove("admin")
  router.push({path: "/login"});
}
</script>

<template>
  <div class="header">
    <div class="title">
      <div class="logo">
        <el-icon>
          <MostlyCloudy/>
        </el-icon>
      </div>
      <div class="text">
        <a href="/admin">Akeelah</a>
      </div>
    </div>

    <div class="info">
      <div class="admin">
        <div class="name">
          <span>{{ useAdminStore().data.name }}</span>
          <el-icon>
            <Bell/>
          </el-icon>
        </div>

        <div class="exit" @click="logout">
          退出
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>