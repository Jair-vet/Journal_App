<template>
  <div 
    class="entry-container mb-3 pointer p-2"
    @click="$router.push({ name: 'entry', params: { id: entry.id } })"
  >
    <!-- Titulo -->
    <div class="entry-title d-flex">
        <span class="text-info fs-5 fw-bold"> {{ entryDay }} </span>
        <span class="mx-1 fs-5"> {{ entryMoth }} </span>
        <span class="mx-2 fw-light"> {{ entryYear }} </span>
    </div>

    <div class="entry-description">
        {{ shortText }}
    </div>

  </div>

</template>

<script>
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default {
  props: {
    entry: {
      type: Object,
      required: true,
    },
  },
  computed: {
    shortText() {
      return this.entry.text.length > 130
        ? this.entry.text.substring(0, 130) + "..."
        : this.entry.text;
    },

    entryDay() {
      const date = new Date( this.entry.date )
      return date.getDate();
    },

    entryMoth() {
      const date = new Date( this.entry.date )
      return months[ date.getMonth() ];
    },

    entryYear() {
      const year = new Date(this.entry.date).toLocaleString("default", {
        year: "numeric",
        weekday: "long",
      });
      return year;
    },
    
  }
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