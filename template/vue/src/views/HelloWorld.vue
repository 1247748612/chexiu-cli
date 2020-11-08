<template>
  <div>
    <hello-world />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld/index.vue'

@Component({
  components: {
    HelloWorld
  }
})
export default class HelloPage extends Vue {
}
</script>
