export const setting = {
    path: '/setting',
    name: 'setting',
    title: '设置',
    component: () => import("../components/page/setting/index"),
    children: [
        {
            path: '/numberrangelist',
            name: 'numberrangelist',
            component: () => import("../components/page/setting/numberRangeList"),
            meta: { title: '设置' },
            children: [
                {
                    path: '/editbignum',
                    name: 'editbignum',
                    component: () => import("../components/page/setting/editBigNum"),
                },
                {
                    path: '/addnumlimits',
                    name: 'addnumlimits',
                    component: () => import("../components/page/setting/addNumLimits"),
                },
                {
                    path: '/editnumlimits',
                    name: 'editnumlimits',
                    component: () => import("../components/page/setting/editNumLimits"),
                }
            ]
        }
    ]
};