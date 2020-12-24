<!--
 * @Date: 2020-12-16 10:09:44
 * @LastEditors: sam
 * @LastEditTime: 2020-12-24 17:17:57
 * @FilePath: /vue-typescript-admin-template/src/views/middleware/index.vue
-->
<template>
  <div class="app-container">
      <v-table
        :table-data="tableData"
        :table-config="tableConfig"
        :operate-config="operateConfig"
        :total="total"
        :limit="limit"
        :page="page"
        @listenSize="listenSize"
        @listenCurrent="listenCurrent"
        @listenOperate="listenOperate"
      />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Mixins } from 'vue-property-decorator'
import VSeperate from 'comp/Seperate/index.vue'
import VTable from 'comp/table/index.vue'
import searchMixin from 'mixin/search'

// import { Tree as ElTree } from 'element-ui'
// import { TreeData } from 'element-ui/types/tree'

@Component({
  name: 'Tree',
  components: {
    VSeperate,
    VTable
  }
})
export default class middleWare extends Mixins(searchMixin) {
    tableConfig:any=[
      {
        label: '数据库名',
        prop: 'dataBaseName',
        show: true,
        minWidth: '120px'
      },
      { label: '用户姓名', prop: 'userName', show: true, minWidth: '120px' },
      { label: '密码', prop: 'password' },
      { label: '备份', prop: 'backup', show: true, minWidth: '200px' },
      { label: '备注', prop: 'memo', show: true, minWidth: '120px' }

    ]

    listenSize() {

    }

    listenCurrent() {

    }

    listenOperate() {

    }
  // private filterText = '';
  // private data2 = [{
  //   id: 1,
  //   label: 'Level one 1',
  //   children: [{
  //     id: 4,
  //     label: 'Level two 1-1',
  //     children: [{
  //       id: 9,
  //       label: 'Level three 1-1-1'
  //     }, {
  //       id: 10,
  //       label: 'Level three 1-1-2'
  //     }]
  //   }]
  // }, {
  //   id: 2,
  //   label: 'Level one 2',
  //   children: [{
  //     id: 5,
  //     label: 'Level two 2-1'
  //   }, {
  //     id: 6,
  //     label: 'Level two 2-2'
  //   }]
  // }, {
  //   id: 3,
  //   label: 'Level one 3',
  //   children: [{
  //     id: 7,
  //     label: 'Level two 3-1'
  //   }, {
  //     id: 8,
  //     label: 'Level two 3-2'
  //   }]
  // }];

  // private defaultProps = {
  //   children: 'children',
  //   label: 'label'
  // };

  // @Watch('filterText')
  // private onFilterTextChange(value: string) {
  //   (this.$refs.tree2 as ElTree).filter(value)
  // }

  // private filterNode(value: string, data: TreeData) {
  //   if (!value) { return true }
  //   return data.label && data.label.indexOf(value) !== -1
  // }
}
</script>
