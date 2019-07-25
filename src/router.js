import VueRouter from 'vue-router'
import Main from './components/Main.vue'
import Learn from './components/Learn.vue'
import Wordlist from './components/Wordlist.vue'

var router = new VueRouter({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    {
      path: '/:page',
      component: Main
    },
    {
      path: '/home/learn',
      component: Learn
    },
    {
      path: '/lexicon/:category/:wordbook',
      component: Wordlist
    },
    {
      path: '/user/collect',
      component: Wordlist
    }
  ]
})

export default router