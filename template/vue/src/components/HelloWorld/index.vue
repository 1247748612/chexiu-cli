<template>
  <div class="container">
    <h2>这是由webpack5实现的vue2.x和ytypescript的基础模板</h2>
    <p>设想用在脚手架上充当一个基础模板</p>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class HelloWorld extends Vue {
}
</script>
