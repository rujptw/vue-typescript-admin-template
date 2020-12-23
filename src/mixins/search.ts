/*
 * @Date: 2020-12-22 16:04:55
 * @LastEditors: sam
 * @LastEditTime: 2020-12-22 17:13:04
 * @FilePath: /vue-typescript-admin-template/src/mixins/search.ts
 */
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class searchMixin extends Vue {
      tableData:any[] = []// table数据
      total = 0 // 总条数
      limit = 10 // 每页几条
      pageSizes:number[] = [10, 20, 30, 40]// 每页展示条数配置
      layOut = 'total,prev, pager, next, sizes,jumper' // 组件布局
      loading = false
      page = 1 // 页码
      currentPage= 1
      /**
     *
     * @param {object} outerParams,传入的额外参数
     * @param {function} func:传入的请求函数
     */
      async loadData(outerParams:any = {}, func:any = '') {
      // console.log('outerParams', outerParams)
      // console.log('func', func)
        this.loading = true
        let params = { page: this.page, limit: this.limit }
        // outerParams = {}
        // NOTICE:将传进来的参数,默认放在最后,用于覆盖第一个参数中的某些属性
        params = { ...params, ...outerParams }
        // console.log('params', params)
        try {
          const res = await func(params)
          // console.log('res', res.reocde)
          if (res.recode === '000000') {
            this.loading = false
            this.tableData = res.data.records
            // console.log('tableData', this.tableData)
              ? res.data.records /* this._.cloneDeep(res.data.records) TODO: 需要underscore来进行深拷贝 */
              : []
            this.total = res.data.total || 0
          } else {
            this.tableData = []
            this.loading = false
          }
        } catch (error) {
          this.loading = false
          console.log('error', error)
          this.tableData = []
          this.total = 0
        }
      }
}
