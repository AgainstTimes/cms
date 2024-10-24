<script setup>
import '@/assets/admin/css/home.css'
import HomeSide from "@/views/admin/home/HomeSide.vue";
import HomeHeader from "@/views/admin/home/HomeHeader.vue";
</script>

<template>

  <div class="home">
    <HomeHeader/>

    <div class="main">
      <HomeSide/>
      <div class="content">
        <router-view/>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>



