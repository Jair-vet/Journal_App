<template>
  <Navbar />

  <div class="d-flex">
    <div class="col-3">
      <EntryList />
    </div>
    <div class="col">
      <router-view />
    </div>
  </div>
</template>


<script>
import { defineAsyncComponent } from 'vue';
import { mapActions } from 'vuex';

export default {
  components: {
    Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
    EntryList: defineAsyncComponent(() => import('../components/EntryList.vue')),
  },

  methods: {
    ...mapActions('journal', ['loadEntries'])
  },

  created() {
    this.loadEntries()
  }
}
</script>

<style>
body {
  background-color: rgba(8, 137, 160, 0.914);
  color: #fff;
}
</style>

