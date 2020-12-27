/*
 * @Date: 2020-12-16 10:09:44
 * @LastEditors: sam
 * @LastEditTime: 2020-12-25 16:44:18
 * @FilePath: /vue-typescript-admin-template/src/main.ts
 */
import Vue from 'vue'

import 'normalize.css'
import ElementUI from 'element-ui'
import SvgIcon from 'vue-svgicon'

import '@/styles/element-variables.scss'
import '@/styles/index.scss'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faCaretRight
} from '@fortawesome/free-solid-svg-icons'
import VueCodemirror from 'vue-codemirror'

// import base style
import 'codemirror/lib/codemirror.css'
// theme css
import 'codemirror/theme/paraiso-light.css'

// require active-line.js
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/mode/nginx/nginx.js'
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'

// highlightSelectionMatches
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'

import 'codemirror/addon/search/match-highlighter.js'

// keyMap
import 'codemirror/mode/clike/clike.js'
import 'codemirror/addon/edit/matchbrackets.js'
import 'codemirror/addon/comment/comment.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'

import 'codemirror/addon/search/search.js'
import 'codemirror/keymap/sublime.js'

// foldGutter
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/brace-fold.js'
import 'codemirror/addon/fold/comment-fold.js'
import 'codemirror/addon/fold/foldcode.js'
import 'codemirror/addon/fold/foldgutter.js'
import 'codemirror/addon/fold/indent-fold.js'
import 'codemirror/addon/fold/markdown-fold.js'
import 'codemirror/addon/fold/xml-fold.js'
import '@/icons/components'
import '@/permission'

// you can set default global options and events when Vue.use
Vue.use(VueCodemirror, {
  // options: { theme: 'base16-dark' },
  events: ['scroll']
})

Vue.use(ElementUI)

library.add(
  faCaretRight
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
