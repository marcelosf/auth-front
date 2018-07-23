import User from '@/components/user/User'
import UserEdit from '@/components/user/User.Edit'

export const UserRouters = [

  {

    path: '/user/:userId',
    name: 'user',
    component: User

  },

  {

    path: '/user/edit/:userId',
    name: 'user-edit',
    component: UserEdit

  }

]
