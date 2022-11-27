import { defineAsyncComponent } from 'vue';
<template>
  <div class="entry-title d-flex justify-content-between p-2">
    <div>
        <span class="text-info fs-3 fw-bold">15</span>
        <span class="mx-1 fs-3">Julio</span>
        <span class="mx-2 fs-3 fw-light">2022, Jueves</span>
    </div>

    <div>
        <button class="btn btn-danger mx-2">
            Borrar
            <i class="fa fa-trash-alt"></i>
        </button>

        <button class="btn btn-primary">
            Foto
            <i class="fa fa-upload"></i>
        </button>
    </div>

  </div>

  <hr>
  <div class="d-flex flex-column px-3 h-75">
    <textarea placeholder="¿Qué sucedió hoy?"></textarea>   
  </div>

  <Fab 
    icon="fa-save"
  />

  <img  src="https://estaticos-cdn.sport.es/clip/cc1f1efe-5198-459e-8e27-9d07d852a94b_alta-libre-aspect-ratio_default_0.jpg"
        alt="entry-picture"
        class="img-thumbnail"
       >

</template>

<script>
import {defineAsyncComponent } from 'vue'

export default {
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
}
</script>

<style lang="scss" scoped>

textarea {
    border-radius: 10px;
    border: none;
    height: 90%;
    font-size: 20px;
    margin-top: 10px;
    text-align: center;
    box-shadow: 0px 5px 5px rgb($color: #000000, $alpha: 0.2);

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 130px;
    right: 20px;
    box-shadow: 0px 10px 15px rgb($color: #000000, $alpha: 0.3);
}

</style>