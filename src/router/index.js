import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Login from '@/components/Login/Login'
import Register from '@/components/Register/Register'
import AddBlog from '@/components/Home/components/AddBlog'
import BlogList from '@/components/Home/components/BlogList'
import BlogDetail from '@/components/BlogDetail/BlogDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/Home/blogList',
      children:[
        {
          path: 'Home/addBlog/:id',
          component: AddBlog
        },
        {
          path: 'Home/blogList',
          component: BlogList
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/blogDetail/:id',
      name: 'BlogDetail',
      component: BlogDetail
    }
  ]
})
