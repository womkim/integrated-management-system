<template lang="pug">
  .dashboard
    .data-wrapper
      a.data-view list data
      a.data-view menu data
      a.data-view post data
      a.data-view news data
    .graphic-wrapper
      p canvas here
    Checkbox
    Slider.slider(v-model="value4", :step="10", range)
</template>
<script>
  import Checkbox from 'iview/src/components/checkbox'
  import Slider from 'iview/src/components/slider'
  export default {
    name: 'dashboard',
    components: {
      Checkbox,
      Slider
    },
    data () {
      return {
        value4: [10, 20]
      }
    }
  }
</script>
<style lang="scss">
  .dashboard{
  }
  .slider{
    background-color: #f40;
  }
</style>
