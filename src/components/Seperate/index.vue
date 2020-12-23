<!--
 * @Date: 2020-12-21 17:08:26
 * @LastEditors: sam
 * @LastEditTime: 2020-12-22 17:17:39
 * @FilePath: /vue-typescript-admin-template/src/components/seperate/index.vue
-->
// 列表页分割

<template>
  <div class="seperate__block--container" :style="blockStyle" >
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
interface Styles {
 height: string
 background: string
 width: string
}
@Component({
  name: 'Seperate'
})

export default class Seperate extends Vue {
  blockStyle:Styles= {
    height: '20px',
    background: '#F0F2F5',
    width: '100%'
  }
}

</script>

<style scoped lang="scss">

</style>
