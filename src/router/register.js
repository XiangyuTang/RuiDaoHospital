//默认容器组件
import DefaultContainer from "../containers/DefaultContainer";

//挂号首页组件
import RegisterHome from "../views/register/registerHome";

//挂号首页组件
import ChargeHome from "../views/register/chargeHome";

//发票
import BillHome from "../views/register/billHome";

//对账
import CheckHome from "../views/register/checkHome";



export default {
  path: '/register',
  name: 'register',
  redirect:'/register/registerHome',
  component: DefaultContainer,
  children: [
    {
      path: 'registerHome',
      name: 'registerHome',
      component: RegisterHome
    },
    {
      path: 'chargeHome',
      name: 'chargeHome',
      component: ChargeHome
    },
    {
      path: 'billHome',
      name: 'billHome',
      component: BillHome
    },
    {
      path: 'checkHome',
      name: 'checkHome',
      component: CheckHome
    },
  ]
}

