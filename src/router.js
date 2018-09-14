import Vue from 'vue'
import Router from 'vue-router'
import TalkSession from './views/TalkSession.vue'
import VoteResult from './views/VoteResult.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'session-home',
      component: TalkSession,
      meta: { offset: 0 }
    },
    {
      path: '/1',
      name: 'session1',
      component: TalkSession,
      meta: { offset: 0 }
    },
    {
      path: '/2',
      name: 'session2',
      component: TalkSession,
      meta: { offset: 1 }
    },
    {
      path: '/3',
      name: 'session3',
      component: TalkSession,
      meta: { offset: 2 }
    },
    {
      path: '/result',
      name: 'result',
      component: VoteResult
    }
  ]
})
