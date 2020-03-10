export const usermanage = {
    path: '/usermanage',
    name: 'usermanage',
    title: '用户管理',
    component: () => import("../components/page/userManage/index"),
    children: [
      {
        path: '/usermanageshow',
        name: 'usermanageshow',
        component: () => import("../components/page/userManage/userManageShow"),
        meta: { title: '用户管理' },
        children:[
          {
            path: '/inneruseradd',
            name: 'inneruseradd',
            component: () => import("../components/page/userManage/innerUserAdd"),
            meta: { title: '添加用户' },
          },
          {
            path: '/inneruseredit',
            name: 'inneruseredit',
            component: () => import("../components/page/userManage/innerUserEdit"),
            meta: { title: '编辑用户' },
          },
          {
            path: '/inneruserdetail',
            name: 'inneruserdetail',
            component: () => import("../components/page/userManage/innerUserDetail"),
            meta: { title: '用户详情' },
          }
        ]
      }
    ]
  };
  