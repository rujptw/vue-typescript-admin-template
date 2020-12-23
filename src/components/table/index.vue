<!--
 * @Date: 2020-12-21 18:21:12
 * @LastEditors: sam
 * @LastEditTime: 2020-12-23 09:14:34
 * @FilePath: /vue-typescript-admin-template/src/components/table/index.vue
-->
<template>
  <div class="common__table--container">
    <el-table
      ref="common__table"
      v-loading="loading"
      highlight-current-row
      :data="tableData"
      :header-cell-style="headerCellStyle || headStyle"
      :row-style="commonRowStyle || rowStyle"
      :cell-style="commonCellStyle || cellStyle"
      @select="handleSelectionChange"
      @select-all="handleSelectAll"
      @row-click="handleRowClick"
    >
      <!-- 头一列 -->
      <el-table-column v-if="isSelection" type="selection" width="55" align="center"/>
      <el-table-column
        v-else-if="isExpand"
        type="index"
        :index="indexMethod"
        width="55"
        align="center"
      />
      <el-table-column type="index" :index="indexMethod" :width="isSelection ? 65 : 100" align="center" label="序号">
        <template scope="scope">
          <span>{{ (page - 1) * limit + scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 详情列 -->
      <el-table-column
        v-for="item in tableConfig"
        v-if="item.show"
        :label="item.label"
        :prop="item.prop"
        :width="item.width || ''"
        :align="item.align || 'left'"
        :header-align="item.headerAlign || 'left'"
        :min-width="item.minWidth || ''"
        :show-overflw-tootip="true"
      >
        <template slot-scope="scope">
          <div>
           <span>
              {{ transFomZero(scope.row[item.prop]) || '/' }}
            </span>
          </div>
        </template>
      </el-table-column>
      <!-- 操作列 -->
      <el-table-column v-if="operateConfigLength" label="操作" align="left" fixed="right" :width="operateColWidth">
        <template slot-scope="scope">
          <div style="display:flex;">
            <span v-for="item in operateConfig" class="operate__container">
              <el-button v-if="!item.btnType" class="operate_btn"
                         :type="item.type" plain size="small"
                         @click="handleOperate(scope,item.operate)">{{ item.name }}
              </el-button>
              <el-dropdown v-else-if="item.btnType==='dropdown'" @command="handleCommand">
              <el-dropdown-menu slot="dropdown">
                  <template>
                  <el-dropdown-item v-for="it in item.menuOperate" :command="constructObj(it.operate,scope)">{{it.name}}</el-dropdown-item>
                  <el-dropdown-item command="bbb">客户额度冻结</el-dropdown-item>
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页操作 -->
    <div class="table__pagination">
      <el-pagination
        v-if="showPagination"
        background
        :current-page="page"
        :page-sizes="pageSizes"
        :page-size="limit"
        :layout="layOut"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
// :formatter="item.formatter? item.formatter:''"

/**
   * tableConfig://
   *   字段:
   *        label==>标题
   *        prop===>对应列的字段名
   *        width===>列的宽度
   *        show====>是否显示
   *        formatter===> 格式化内容，为函数
   *        align===>对齐方式
   *        header-align:====> 表头对齐方式
   *        show-overflw-tootip===>当内容过长时,显示tooltip
   */
/**
   * operateConfig:
   *    字段:
   *        name: 操作的中文名称
   *        operate:操作的英文名称
   *        disabled: 是否禁用
   //    通用:
   *         remove==>删除,
   *         change==>修改,
   *         check==>查看,
   *         changePass ==>修改密码
   *         post ===>发布
   *         unshelve ===>下架
   *
   */
import { Component, Vue } from 'vue-property-decorator'
  @Component({
    name: 'Table',
    props: {
      showPagination: {
        type: Boolean,
        default: true
      }, // 是否显示分页,详情里一般设置为false,因为没有分页
      tableData: {
        type: Array,
        default: () => []
      }, // 表格数据
      tableConfig: {
        type: Array,
        default: () => []
      }, // 表格配置
      isSelection: {
        type: Boolean,
        default: false
      }, // 选择框列
      isExpand: {
        type: Boolean,
        default: false
      }, // 展开按钮列
      headerCellStyle: {
        type: [Object, String],
        default: ''
      }, // 表头行样式
      commonRowStyle: {
        type: [Object, String],
        default: ''
      },
      // cell样式
      cellStyle: {
        type: [Object, String],
        default: ''
      },
      // 操作
      operateConfig: {
        type: Array,
        default: () => []
      },
      // 数据总数
      total: {
        type: Number,
        default: 0
      },
      // 载入动画
      loading: {
        type: Boolean,
        default: false
      },
      // 分页组件配置
      limit: {
        type: Number,
        default: 10
      },
      pageSizes: {
        type: Array,
        default: () => [10, 20, 30, 40]
      },
      layOut: {
        type: String,
        default: 'total,prev, pager, next, sizes, jumper'
      },
      page: {
        type: Number,
        default: 1
      },
      inDetails: {
        type: Boolean,
        default: false
      },
      paddingTop: {
        type: 'string',
        defaut: '30px'
      }
    }
  })
export default class Table extends Vue {
    // 默认
    headStyle = {
      background: '#F2F2F2',
      height: '50px',
      color: '#333',
      fontWeight: 400
    }

    rowStyle= {
      color: '#666',
      fontWeight: 400
    }

    commonCellStyle= {
      height: '44px!important',
      paddingTop: '6px!important',
      paddingBottom: '6px!important'
    }

    statusPath = ''
    get operateConfigLength() {
      return this.operateConfig.length > 0
    }

    get operateColWidth() {
      if (this.inDetails) {
        return '120px'
      } else {
        return 85 * this.operateConfig.length + 'px'
      }
    }

    mounted() {
      this.statusPath = this.$route.path
      console.log('route', this.$route.path)
      console.log('operateConfig', this.operateConfig.length)
    }

    transFomZero(params) {
      if (params === 0) {
        return '0'
      } else {
        return params
      }
    }

    // table选择项变化时触发
    handleSelectionChange(select, row) {
      this.$emit('listenSelect', select, row)
    }

    handleSelectAll(select) {
      this.$emit('listenAllSelect', select)
    }

    handleRowClick(row) {
      console.log('row', row)
      this.$emit('listenRowClick', row)
    }

    // 页数发生变化触发
    handleSizeChange(size) {
      console.log('size', size)
      this.$emit('listenSize', size)
    }

    // 页码发生变化触发
    handleCurrentChange(current) {
      this.$emit('listenCurrent', current)
    }

    // 索引方法
    indexMethod(index) {
      return index + 1
    }

    handleOperate(scope, key) {
      console.log('scope', scope)
      console.log('key', key)
      this.$emit('listenOperate', { scope, key })
    }

    // 下拉菜单循环
    handleCommand(command) {
      console.log('command', command)
      this.$emit('listenOperate', command)
    }
}
</script>

<style lang="scss" scoped>
  .common__table--container {
    width: 100%;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;

    .el-table th > .cell {
      white-space: nowrap;
    }

    .operate__container {
      margin-right: 10px;
    }

    .el-pagination__sizes {
      margin-right: -22px;
    }

    .operate__container {
      margin-right: 10px;
    }

    .el-pagination__sizes {
      margin-right: -22px;
    }

    .table__pagination {
      display: flex;
      justify-content: flex-end;
      padding-top: 20px;
    }

    .operate_btn {
      padding-right: 10px;
      padding-left: 10px;
      padding-bottom: 6px !important;
      padding-top: 6px !important;
      margin-right: 6px;
    }

    .sign-container {
      display: flex;
      align-items: center;

      .sign-size {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        display: inline-block;
        line-height: 44px;
        margin-right: 11px;
      }
    }
  }
</style>
