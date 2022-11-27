<template>
    <div class="entry-list-container">
        <div class="px-2 pt-2">
            <input 
                type="text"
                class="form-control"
                placeholder="Buscar Entrada"
            />
        </div>

        <div class="entry-scrollarea">
            <Entry 
                v-for="item in 100"
                :key="item"
            />
        </div>
    </div>

</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
        Entry: defineAsyncComponent(() => import('./Entry.vue')),
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
