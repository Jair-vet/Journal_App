<template>
  <Navbar />

  <div v-if="isLoading"
    class="row justify-content-center">
    <div class="col-3 alert-info text-center mt-5">
      Espere Por Favor
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else
    class="d-flex">
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
import { mapActions, mapState } from 'vuex';

export default {
  components: {
    Navbar: defineAsyncComponent(() => import('../components/Navbar.vue')),
    EntryList: defineAsyncComponent(() => import('../components/EntryList.vue')),
  },

  methods: {
    ...mapActions('journal', ['loadEntries']),
  },

  computed: {
    ...mapState('journal', ['isLoading'])
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

