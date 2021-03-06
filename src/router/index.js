import Vue from 'vue'
import Router from 'vue-router'

import {AuthenticationRouters} from '@/components/authentication/authentication.route'
import {UserRouters} from '@/components/user/user.route'

Vue.use(Router)

let routes = []

let registeredRoutes = routes.concat(

  AuthenticationRouters,
  UserRouters

)

let routerInstance = new Router({

  routes: registeredRoutes

});

routerInstance.beforeEach((to, from, next) => {

  next();

})

export default routerInstance;
