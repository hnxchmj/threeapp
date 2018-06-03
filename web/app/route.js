const routes = [
    { path: '/my', component: MyPage },
    { path: '/team', component: TeamPage },
    { path: '/other', component: OtherPage },
    { path: '/templates/search', component: TemplatesSearchPage },
    { path: '/templates/:todoId', component: TemplatesPage },
    { path: '/forms/:todoId', component: FormsPage },
    { path: '/todos/:todoId', component: TodoPage },
    { path: '/todo/new', component: TodoAddPage }
];

const router = new VueRouter({
    routes:routes,
});