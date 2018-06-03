const TodoAddPage = {
    name: 'TodoAddPage',
    template: '\
        <div>\
            <mt-header fixed title="添加任务">\
                <mt-button slot="left" @click="$router.go(-1)">取消</mt-button>\
                <mt-button slot="right" @click="todoAdd">完成</mt-button>\
            </mt-header>\
            <mt-field placeholder="请输入任务具体名称" type="textarea" rows="4" v-model="name"></mt-field>\
        </div>\
    ',
    data:function(){
        return {
            name: ''
        }
    },
    methods: {
        todoAdd:function(){
            const todo = new Todo();
            this.todos = Todo.getList();
            todo.name = this.name;
            if(!todo.name){
                this.$messagebox.alert('名称不能为空', '错误');
                return;
            }
            todo.add();
            this.$router.go(-1);
        }
    }
};