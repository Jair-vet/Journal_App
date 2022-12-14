<template>
    <template v-if="entry">

        <div v-if="entry" class="entry-title d-flex justify-content-between p-2">

            <div class="container">
                <div>
                    <span class="text-info fs-3 fw-bold">{{ dayMonthYear.day }}</span>
                    <span class="mx-1 fs-3">{{ dayMonthYear.month }}</span>
                    <span class="mx-2 fs-3 fw-light">{{ entryYear }}</span>
                </div>
            
                <div class="botones">

                    <input type="file"
                            @change="onSelectImage"
                            ref="imageSelector"
                            v-show="false"
                            accept="image/png, image/jpeg"
                    >

                    <button 
                        v-if="entry.id"
                        class="btn btn-danger mx-2 mb-3"
                        @click="onDeleteEntry"
                    >
                        Borrar
                        <i class="fa fa-trash-alt"></i>
                    </button>
            
                    <button 
                        class="btn btn-primary mx-2 mb-3"
                        @click="onSelectedImage"
                    >
                        Foto
                        <i class="fa fa-upload"></i>
                    </button>
                </div>
            </div>
    
        </div>
      
        <hr>
        <div class="d-flex flex-column px-3 h-75">
          <textarea 
              v-model="entry.text"
              placeholder="¿Qué sucedió hoy?"
          ></textarea>   
        </div>


        <img  
            v-if="entry.picture && !localImage"
            :src="entry.picture"
            alt="entry-picture"
            class="img-thumbnail"
        >

        <img  
            v-if="localImage"
            :src="localImage"
            alt="entry-picture"
            class="img-thumbnail"
        >
    </template>

  <Fab 
    class="guardar-icon"
    icon="fa-save"
    @on:click="saveEntry"
  />


</template>

<script>
import {defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex';  //propiedades computadas
import Swal from 'sweetalert2'

import getDayMonthYear from '../helpers/getDayMonthYear';
import uploadImage from '../helpers/uploadImage';


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
            entry: null,
            localImage: null,
            file: null,
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
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),

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
            // Alerta
            new Swal({
                title: 'Espere por Favor',
                allowOutsideClick: false,
            })
            Swal.showLoading()

            // Subir la Imagen a cloudinary
            const picture = await uploadImage( this.file )
            // Asiganarla a Firebase
            this.entry.picture = picture
            
            if( this.entry.id ){
                // Actualizar
                await this.updateEntry( this.entry )
            } else{
                // Crear una nueva entrada
                const id = await this.createEntry( this.entry )
                
                // redirecTo => entry, param: id
                this.$router.push({ name: 'entry', params: { id } })
            }

            this.file = null
            Swal.fire('Guardado', 'Entrada registrada con éxito', 'success')            
        },
        
        async onDeleteEntry() {

            const { isConfirmed } = await Swal.fire({
                title: '¿Está seguro?',
                text: 'Una vez borrado, no se puede eliminar',
                showDenyButton: true,
                confirmButtonText: 'Si, estoy seguro'
            })

            if( isConfirmed ){
                new Swal({
                    title: 'Espere por Favor',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                await this.deleteEntry( this.entry.id )
                this.$router.push({ name: 'no-entry' })

                Swal.fire('Eliminado', '', 'success')
            }
        },

        onSelectImage( event ) {
            const file = event.target.files[0]
            if( !file ){
                // Si se cancela la imagen
                this.localImage = null
                this.file = null
                return
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )

        },

        onSelectedImage() {
            this.$refs.imageSelector.click()
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

.container {
    display: flex;
    flex-direction: row;
}

.botones {
    display: flex;
    flex-direction: row;
}

@media (max-width: 780px) {  
    .container {
        text-align: center;
        flex-direction: column;
    }
    .botones{
        flex-direction: column;
    }

    img {
        width: 150px;
        bottom: 45px;
        right: 15px;
    }
    .guardar-icon{
        bottom: 3px;
        right: 1%;
    }

    textarea {
        height: 300px;
        margin-bottom: 150px;
        text-align: center;
    }
}

</style>