const TemplatesPage = {
    name: 'TemplatesPage',
    template: '\
        <div>\
            <div class="templatepage">\
          		<div class="temp-tit">搜索结果</div>\
          	\
		            <group>\
		                <cell v-for="template in templates" :key="template.id" :title="template"></cell>\
		            </group>\
	          		\
	          		<div v-show="isshowdata">\
	          			<div class="empty" style="padding-top: 30px;">\
							<div class="empty-icon"></div>\
							<p class="empty-text">搜索结果为空!</p>\
						</div>\
	          		</div>\
	            \
            </div>\
        </div>\
    ',
    data:function(){
        return {
            templates: [],
            isshowdata:false
        }
    },
    mounted:function(){
    	    var todos = Todo.getList();
    	    
    	    for(var i=0; i<todos.length;i++){
    	    	var todo=todos[i];
    	    	if (todo.id != this.$route.params.todoId) {
                	this.isshowdata=true;
                }else{
    	    		var todo1 = new Todo();
                	todo1.id = this.$route.params.todoId;
			        todo1 = todo1.getDetail();	        
			        this.templates = todo1.templates;
			        if(this.templates==''|| this.templates==null){
			        	this.isshowdata=true;
			        }else{
			        	this.isshowdata=false;
			        	 break;
			        }
                }
    	    }
    }
};