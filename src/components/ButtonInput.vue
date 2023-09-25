<template>
  <button class="button">{{ symbol }}
  </button>
</template>

<script>
export default {
    name: 'ButtonInput',
    props: {
      symbol: String,
    },
}
</script>

<style lang="scss">
button{
  height: 72px;
  width: 72px;
  align-items: center;
  border-radius: 24px;
  background: #2E2F38;
  color: #FFF;
  text-align: center;
  font-family: 'Work Sans', sans-serif;
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px; /* 125% */
  &:active{
    background: #949fff;
  }
}
</style>