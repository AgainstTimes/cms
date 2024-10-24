<script setup>

import {Bell, MostlyCloudy} from "@element-plus/icons-vue";
</script>

<template>
  <div class="header">
    <div class="title">
      <div class="logo">
        <el-icon><MostlyCloudy /></el-icon>
      </div>
      <div class="text">
        <a href="/admin">Akeelah</a>
      </div>
    </div>

    <div class="info">
      <div class="admin">
        <div class="name">
          <span>Jessika</span> <el-icon><Bell /></el-icon>
        </div>

        <div class="exit">
          退出
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>