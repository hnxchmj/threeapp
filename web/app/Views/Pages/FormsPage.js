const FormsPage = {
    name: 'FormsPage',
    template: '\
        <div>\
            <mt-header fixed title="表单列表">\
                <mt-button slot="left" icon="back" @click="$router.go(-1)"></mt-button>\
            </mt-header>\
            <group>\
                <cell v-for="form in forms" :key="form.id" :title="form"></cell>\
            </group>\
        </div>\
    ',
    data:function(){
        return {
            forms: []
        }
    },
    mounted:function(){
        var todo = new Todo();
        todo.id = this.$route.params.todoId;
        todo = todo.getDetail();
        this.forms = todo.forms;
    }
};