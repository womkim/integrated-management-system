<template lang="pug">
  .not-found
    .wrapper
      i.iconfont.icon-lab
      span 404 Not Found
</template>

<script>
  export default {
    name: 'NotFound',
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss">
  .not-found{

    .wrapper{
      display: flex;
      justify-content: center;
      margin-top: 30vh;
      width: 100%;
    }

    .iconfont{
      margin-right: 10px;
      font-size: 20px;
    }

    span{
      font-size: 30px;
      color: #333;
      font-family: Georgia;
      letter-spacing: 2px;
    }

  }
</style>
