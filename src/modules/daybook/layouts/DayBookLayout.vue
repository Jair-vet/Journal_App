<template>
  <Navbar 
    class="navbar"
  />

  <div v-if="isLoading"
    class="row justify-content-center">
    <div class="container-all ">
      Espere Por Favor
      <h3 class="mt-2">
        <i class="fa fa-spin fa-sync"></i>
      </h3>
    </div>
  </div>

  <div v-else
    class="container-all d-flex">
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

<style lang="scss" >
body {
  background-color: rgba(8, 137, 160, 0.914);
  color: #fff;
}

.container-all{
  display: flex;
  flex-direction: row;
}

@media (max-width: 600px) {  
  .navbar {
    position: fixed;
    width: 100%;
  }
  .container-all {
    flex-direction: column;
  }
  .container-all div {
    width: 100%;
  }
}
</style>

