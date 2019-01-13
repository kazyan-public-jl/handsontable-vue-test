import VueRouter from 'vue-router';
// ページコンポーネントを読み込み
import Top from '../pages/top';
import About from '../pages/about';
import Table from '../js/components/table/table';

const routes = [
  {
    path: '/',
    component: Top
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/table',
    component: Table
  }
];

export default new VueRouter({
  routes,
});