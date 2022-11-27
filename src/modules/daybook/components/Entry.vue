<template>
  <div 
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: 10 } })"
  >
    <!-- Titulo -->
    <div class="entry-title d-flex">
        <span class="text-info fs-5 fw-bold">25</span>
        <span class="mx-1 fs-5">Noviembre</span>
        <span class="mx-2 fw-light">2022, Viernes</span>
    </div>

    <div class="entry-description">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur quibusdam obcaecati ullam est placeat? Itaque sequi impedit minima repellat unde, numquam possimus quisquam voluptatem placeat laboriosam qui praesentium blanditiis similique.
    </div>

  </div>

</template>

<script>
export default {
  
}
</script>



<style lang="scss" scoped>
.entry-container{
    transition: 0.2s all ease-in;

    &:hover {
        background-color: lighten($color: #3f95a2, $amount: 35);
        color: #000;
        transition: 0.2s all ease-in;
    }
    .entry-description {
        font-size: 12px;
    }
}
</style>