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

        <div class="entry-scrollarea">
            <Entry 
                v-for="item in entriesByTerm"
                :key="item"
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
    border-right: 4px solid #fdfdfdeb;
    height: calc( 100vh - 17px );
    border-radius: 20px;
}
.entry-scrollarea {
    height: calc( 100vh - 110px );
    overflow: scroll;
}
</style>
