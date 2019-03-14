export default [
  {
    resId: '1',
    presId: '0',
    resName: '首页',
    icon: 'el-icon-ebk-home',
    showInMenu: true,
    butRule: '/',
    children: []
  }, {
    resId: '2',
    presId: '0',
    resName: '产品管理',
    icon: 'el-icon-ebk-product',
    showInMenu: true,
    butRule: '',
    children: [
      {
        resId: '2-1',
        presId: '2',
        resName: '自由行产品',
        showInMenu: true,
        butRule: '/product/trip/list'
      }
    ]
  }, {
    resId: '3',
    presId: '0',
    resName: '订单管理',
    icon: 'el-icon-ebk-order',
    showInMenu: true,
    butRule: '',
    children: [
      {
        resId: '3-1',
        presId: '3',
        resName: '自由行订单',
        showInMenu: true,
        butRule: '/order/trip/list'
      }
    ]
  }
]
