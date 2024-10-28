<script setup>

import {Files, UserFilled} from "@element-plus/icons-vue";
</script>

<template>
  <div class="home">
    <el-menu router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-sub-menu index="admin">
        <template #title>
          <el-icon>
            <UserFilled/>
          </el-icon>
          Administrator
        </template>
        <el-menu-item-group>
          <el-menu-item index="/administrator/add">add Administrator</el-menu-item>
          <el-menu-item index="/administrator/list">add list</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="/category/list?parent_id=0">
        <el-icon>
          <Files/>
        </el-icon>
        Category Management
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>

</style>