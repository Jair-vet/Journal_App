<template>
    <div class="container-noEntry">
        <h1 class="align-self-center">No Hay Nada Seleccionado</h1>
    </div>

    <Fab 
      @on:click="createNewEntry"
    />
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    Fab: defineAsyncComponent(() => import('../components/Fab.vue')),
  },

  methods: {
    createNewEntry() {
      this.$router.push({ name: 'entry', params: { id: 'new' } })
    }
  },
}
</script>


<style lang="scss" scoped>
.container-noEntry {
  display: flex;
  justify-content: center;
  margin-top: 20rem;
}

@media (max-width: 780px) {
  .container-noEntry {
    margin-top: 1rem;
  }
}


</style>