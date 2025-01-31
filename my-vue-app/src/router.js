import { createRouter, createWebHashHistory } from 'vue-router'

import * from './views/*' // Fill in with page names
import * from '*'
import * from '*'

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component:*, // Fill in with page name
      path: '/' // Fill in with page path
    },
    {
      component:*,
      path: '/*'
    },
    {
      component:*,
      path: '/*' // Home page can be left empty
    }
  ]
})
