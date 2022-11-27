<template>
  <Navbar />

  <div class="d-flex">
    <div class="col-4">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>


<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
    EntryList: defineAsyncComponent(() => import('../components/EntryList.vue')),
  }
}
</script>

<style>
body {
  background-color: rgba(8, 137, 160, 0.914);
  color: #fff;
}
</style>

