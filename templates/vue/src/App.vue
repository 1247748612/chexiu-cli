<template>
  <div class="container max-auto px-4">
    <router-link to="/HelloWorld">
      跳转hello
    </router-link>
    <router-link to="/jsx">
      jsx
    </router-link>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class App extends Vue {
}
</script>

<style>
</style>
