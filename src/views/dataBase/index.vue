<!--
 * @Date: 2020-12-16 10:09:44
 * @LastEditors: sam
 * @LastEditTime: 2020-12-22 17:55:55
 * @FilePath: /vue-typescript-admin-template/src/views/dataBase/index.vue
-->
<template>
  <div class="app-container">
    数据库
  </div>
</template>

<script>
import VSeperate from 'comp/Seperate'
import VTable from 'comp/table'
import searchMixin from 'mixin/search'
import { Component, Mixins } from 'vue-property-decorator'

@Component({
  name: 'dataBase',
  components: {
    VSeperate,
    VTable
  }
})
export default class extends Mixins(searchMixin) {

}
</script>

<style lang="scss" scoped>

</style>
