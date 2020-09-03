import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '@/views/Film'
import Cinema from '@/views/Cinema'
import Center from '@/views/Center'
import Comingsoom from '@/views/Film/Comingsoom'
import Nowplaying from '@/views/Film/Nowplaying'
import Detail from '@/views/Detail'
import City from '@/views/City'

Vue.use(VueRouter)

const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        path: '/film/nowplaying',
        component: Nowplaying
      },
      {
        path: 'comingsoon',
        component: Comingsoom
      },
      {
        path: '',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: Cinema
  },
  {
    path: '/center',
    component: Center
  },
  {
    path: '/detail/:id',
    component: Detail,
    name: 'kerwindetail',
    props: true
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '*',
    redirect: '/film'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
