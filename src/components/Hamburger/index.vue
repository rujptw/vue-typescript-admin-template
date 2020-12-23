<!--
 * @Date: 2020-12-16 10:07:16
 * @LastEditors: sam
 * @LastEditTime: 2020-12-21 17:16:46
 * @FilePath: /vue-typescript-admin-template/src/components/Hamburger/index.vue
-->
<template>
  <div
    :class="[{'is-active': isActive}]"
    @click="toggleClick"
  >
    <svg-icon
      name="hamburger"
      width="20"
      height="20"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
  name: 'Hamburger'
})
export default class extends Vue {
  @Prop({ default: false }) private isActive!: boolean

  private toggleClick() {
    this.$emit('toggle-click')
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
