<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input 
                type="text"
                class="form-control"
                placeholder="Buscar Entrada"
                v-model="term"
            />
        </div>

        <div class="mb-2 d-flex flex-column">
            <button class="btn btn-primary mx-3"
                @click="$router.push({ name: 'entry', params: { id: 'new' } })">
                <i class="fa fa-plus-circle"></i>
                Nueva Entrada
            </button>
        </div>

        <div class="entry-scrollarea">
            <Entry 
                v-for="entry in entriesByTerm"
                :key="entry.id"
                :entry="entry"
            />
        </div>
    </div>

</template>

<script>
import { defineAsyncComponent } from 'vue';
import { mapGetters } from 'vuex';

export default {
    components: {
        Entry: defineAsyncComponent(() => import('./Entry.vue')),
    },
    computed: {
        ...mapGetters('journal', ['getEntriesByTerm']),
        entriesByTerm() {
            return this.getEntriesByTerm( this.term )
        }
    },
    data() {
        return {
            term: ''
        }
    }
}
</script>


<style lang="scss" scoped>
input {
    padding: 10px;
    margin: 20px 0;
}
.entry-list-container{
    display: flex;
    flex-direction: column;
    border-right: 4px solid #fdfdfdeb;
    height: calc( 100vh - 17px );
    border-radius: 20px;
}
.entry-scrollarea {
    height: calc( 100vh - 110px );
    overflow: scroll;
}


@media (max-width: 780px) {  
    .entry-list-container{
       border-right: none;
       height: calc( 100vh - 390px );
    }
    .entry-scrollarea {
        overflow: scroll;
    }

    input {
        margin-top: 70px;
    }
}

</style>
