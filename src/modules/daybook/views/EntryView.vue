<template>
    <template v-if="entry">

        <div v-if="entry" class="entry-title d-flex justify-content-between p-2">
          
          <div>
              <span class="text-info fs-3 fw-bold">{{ dayMonthYear.day }}</span>
              <span class="mx-1 fs-3">{{ dayMonthYear.month }}</span>
              <span class="mx-2 fs-3 fw-light">{{ entryYear }}</span>
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
          <textarea 
              v-model="entry.text"
              placeholder="¿Qué sucedió hoy?"
          ></textarea>   
        </div>


        <img  src="https://estaticos-cdn.sport.es/clip/cc1f1efe-5198-459e-8e27-9d07d852a94b_alta-libre-aspect-ratio_default_0.jpg"
              alt="entry-picture"
              class="img-thumbnail"
        >
    </template>

  <Fab 
    icon="fa-save"
    @on:click="saveEntry"
  />


</template>

<script>
import {defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex';  //propiedades computadas

import getDayMonthYear from '../helpers/getDayMonthYear';

export default {
    props: {
        id: {
            type: String,
            required: true
        },
    },

    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },

    data() {
        return {
            entry: null
        }
    },

    computed: {
        ...mapGetters('journal', ['getEntryById']),
        dayMonthYear(){
            const { day, month, yearDay } = getDayMonthYear( this.entry.date )
            return { day, month, yearDay }
        },
        entryYear() {
        const year = new Date(this.entry.date).toLocaleString("default", {
            year: "numeric",
            weekday: "long",
        });
        return year;
        },
    },
    
    methods: {
        ...mapActions('journal', ['updateEntry']),

        loadEntry() {
            let entry;

            if( this.id === 'new' ){
                entry = {
                    text: '',
                    date: new Date().getTime(),
                    // picture:
                }
            } else {
                entry = this.getEntryById( this.id )
                if( !entry ) return this.$router.push({ name: 'no-entry' })
            }
            this.entry = entry

        },
        async saveEntry() {
            console.log('Guardando Entrada');
            // Mando llamar la Accion
            this.updateEntry( this.entry )
        },
    },

    created() {
        // console.log(this.$route.params.id)
        this.loadEntry()
    },

    watch: {
        id() {
            this.loadEntry()
        },
    }

}


</script>

<style lang="scss" scoped>

textarea {
    border-radius: 10px;
    border: none;
    height: 90%;
    font-size: 20px;
    margin-top: 10px;
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