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
div {
    height: 100%;
}

.container-noEntry{
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
}
</style>