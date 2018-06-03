function Todo() {
    this.id = '';
    this.name = '';
    this.isDone = '';
    this.templates = [];
    this.forms = [];
}
function Team() {
    this.id = '';
    this.name = '';
}
Todo.getList = function () {
    return todos;
    
};
Team.getTeam = function () {
    return userStatuss;
    
};

Todo.prototype.add = function(){
    const todo = {
        id: Math.random().toString(),
        name: this.name,
        desc: '',
        timeSeq: '',
        innerNo: '',
        isDone: true,
        ischeck:false,
        templates: [],
        forms: []
    };
    todos.push(todo);
}

Todo.prototype.remove = function(){
    var thisObj = this;
    const i = todos.findIndex(function(t){
        return t.id === thisObj.id;
    });
    todos.splice(i, 1);
}

Todo.prototype.getDetail = function (successFunc, failFunc) {
    axios.get('com.nbcb.mobileoa.threesion.bzgzl.controller.attachment.flow'
    ).then(function (response) {
		successFunc(response);
	}).catch(function (error) {
		//failFunc(error);
    });
    var thisObj = this;
    return todos.find(function(t){
        return t.id === thisObj.id;
    });
}
// Todo.prototype.getDetail = function(){
//     var thisObj = this;
//     return todos.find(function(t){
//         return t.id === thisObj.id;
//     });
// }
Team.prototype.getTeams = function(){
    var thisObj = this;
    return userStatuss.find(function(u){
        return u.user.id === thisObj.id
    });
}
Todo.prototype.update = function(){
    var thisObj = this;
    const todo = todos.find(function(t){
        return t.id === thisObj.id;
    });
    todo.name = thisObj.name;
    todo.isDone = thisObj.isDone;
    todo.templates = thisObj.templates;
    todo.forms = thisObj.forms;
}