// Containers
const DefaultContainer = () => import('../containers/DefaultContainer');

//Pharmacy
const pharmacy = () => import("../views/pharmacy/pharmacy");
const catalog = () => import("../views/pharmacy/catalogue");

export default {
  path:'/pharmacy',
  redirect:'/pharmacy/pharmacy',
  name:'pharmacy',
  component: DefaultContainer,
  children: [
    {
      path: '/pharmacy/pharmacy',
      name: 'pharmacy',
      component: pharmacy
    },
    {
      path: '/pharmacy/catalogue',
      name: 'catalogue',
      component: catalog
    }
  ]
}
