// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Calculator from './components/Calculator.vue';
import Calendar from './components/Calendar.vue';
import ToDo from './components/ToDo.vue';
import PurchaseOrderTable from './components/PurchaseOrderTable.vue';
import Base from './components/base.vue';

const routes = [
    {
        path: '/cal',
        name: 'Calculator',
        component: Calculator,
    },
    {
        path: '/calendar',
        name: 'Calendar',
        component: Calendar,
    },
    {
        path: '/todo',
        name: 'Todo',
        component: ToDo,
    },
    {
        path: '/order',
        name: 'order',
        component: PurchaseOrderTable,
    },
    {
        path: '/',
        name: 'Muhtasir Shafkat',
        component: Base,
      },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
