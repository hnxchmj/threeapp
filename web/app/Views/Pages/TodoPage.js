const TodoPage = {
    name: 'TodoPage',
    template: '\
        <div>\
         	<div class="taskdetail">\
         		<div class="record">\
					<div class="record_tit">记录每日立项情况</div>\
					<div class="record_det"  v-show="desc">{{desc}}</div>\
				</div>\
				<div class="temp" v-show="templates.length !== 0">\
					<div class="temptit">模板</div>\
					<div class="tempcon">\
                        <!-- <div class="templist"  v-for="t in templates" :key="t.id" :title="t" >{{t}}</div>-->\
                        <nb-attachment-link class="templist" v-for="template in templates" \
                        :key="template.id" \
                        :download-url="template.DIRECTBANK_IMGURL"\
                        :file-name="template.DIRECTBANK_TITLE">\
                        </nb-attachment-link>\
					</div>\
				</div>\
				<div class="form" v-show="forms.length !== 0">\
					<div class="formtit">表单</div>\
					<div class="formcon">\
						<div class="formlist" v-for="f in forms" :key="f.id" :title="f">{{f}}</div>\
					</div>\
				</div>\
         	</div>\
\
        </div>\
    ',
    data:function(){
        return {
            id: '',
            name: '',
            isDone: false,
            desc: '',
            timeSeq: '',
            innerNo: '',
            templates: [],
            forms: []
        }
    },
    computed: {
        isDoneText:function(){
            return this.isDone ? '已完成' : '未完成';
        }
    },
    mounted:function(){
        var todo = new Todo();
        todo.id = this.$route.params.todoId;
        thisVm = this;
        // this.$indicator.open();
        todo=todo.getDetail(
            function (response) {
                // MINT.Indicator.close();
                console.log(response);

                thisVm.templates = response.data;
            },function (error) {
                console.log(error);
                MINT.MessageBox.alert("内部服务器出错");
            }
        );
        thisVm.id = todo.id;
        thisVm.name = todo.name;
        thisVm.isDone = todo.isDone;
        thisVm.desc = todo.desc;
        thisVm.timeSeq = todo.timeSeq;
        thisVm.innerNo = todo.innerNo;
        thisVm.forms = todo.forms;

        
        // todo.getDetail();
        // this.id = todo.id;
        // this.name = todo.name;
        // this.isDone = todo.isDone;
        // this.desc = todo.desc;
        // this.timeSeq = todo.timeSeq;
        // this.innerNo = todo.innerNo;
        // this.templates = todo.templates;
        // this.forms = todo.forms;
    }
};