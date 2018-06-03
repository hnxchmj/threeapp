const threesionApp = new Vue({
    router:router,
    data:function(){
        return {
            selectedTab: '',
            tabs: [
                {
                    id: 'my',
                    name: '我的',
                    isEnabled: true,
                    img: 'dzs.png',
                    url: '/my'
                },
                // {
                //     id: 'team',
                //     name: '团队',
                //     isEnabled: true,
                //     img: 'assist.png',
                //     url: '/team'
                // }
            ]
        }
    },
    computed: {
        tabbarVisible:function(){
            const urls = this.tabs.map(function(t){
                return t.url
            });
            return urls.includes(this.$route.path);
        }
    },
    watch: {
        selectedTab: function(tabId){
            const tab = this.tabs.find(function(t){
                return t.id === tabId
            });
            this.tabOpen(tab);
        }
    },
    mounted:function(){
        this.selectedTab = 'my';
    },
    methods:{
        tabOpen:function(tab){
            this.$router.replace(tab.url);
        }
    }
}).$mount('#app');