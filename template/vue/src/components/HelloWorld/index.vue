<template>
  <div>
    <h2>这是组件HelloWorld</h2>
    <p>这是一个随机时间：{{ date }}</p>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class HelloWorld extends Vue {
  date: any = new Date().toISOString()
}
</script>