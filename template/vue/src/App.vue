<template>
  <div class="container max-auto px-4">
    <h1>This is App.vue</h1>
    <hello-world></hello-world>
    <preview-image></preview-image>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld/index.vue'
import PreviewImage from './components/PreviewImage/index.vue'

@Component({
  components: {
    HelloWorld,
    PreviewImage,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>