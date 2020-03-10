export const noticemanage = {
    path: '/noticemanage',
    name: 'noticemanage',
    title: '公告通知',
    component: () => import("../components/page/noticeManage/index"),
    children: [
      {
        path: '/noticelist',
        name: 'noticelist',
        component: () => import("../components/page/noticeManage/noticeList"),
        meta: { title: '公告通知' },
      },
      {
        path: '/noticeadd',
        name: 'noticeadd',
        component: () => import("../components/page/noticeManage/noticeAdd"),
        meta: { title: '添加公告' },
      },
      {
        path: '/noticeedit',
        name: 'noticeedit',
        component: () => import("../components/page/noticeManage/noticeEdit"),
        meta: { title: '编辑公告' },
      },
      {
        path: '/noticedetail',
        name: 'noticedetail',
        component: () => import("../components/page/noticeManage/noticeDetail"),
        meta: { title: '公告详情' },
      }
    ]
  };
  