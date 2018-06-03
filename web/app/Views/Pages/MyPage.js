const MyPage = {
    name: 'MyPage',
    template: '\
        <div>\
        		<div class="fixedall">\
	            <div class="bggray"></div>\
	            \
	            <div class="time-picker" @touchstart="touchstart($event)" @touchmove="touchmove($event)">\
                    <nb-date-picker ref="date-picker" :isdateShow="isdateShow" v-if="currentModeName === \'日\'"></nb-date-picker>\
	            </div>\
	            \
	            <div class="bggray1"></div>\
                <div class="menu-nav">\
                    <div>\
                        <div class="menu-nav-l"  fitColumns="true">我的工作</div>\
                        <div class="menu-nav-r" @click="templatesSearchOpen"><i class="weui-icon weui-icon-search weui_icon_search"></i>模板搜索</div>\
                    </div>\
	            </div>\
	            <div class="completstate">\
	                <a class="statetab" v-for="(group, index) in groupTodoss" :class="{cur:changestatetab==index}" @click="groupChange(group, index)">{{group.title}}</a>\
	            </div>\
            </div>\
            <div class="todo-list isoverflow" :class="{\'todo-list-view\':isdateShow}">\
				<div class="task">\
					<div v-if="currentGroupName === \'未完成\'">\
                        <swipeout class="listtask">\
                            <swipeout-item v-for="(todo,index) in todosUndone" v-if="todo.date==selectedMoment" :key="todo.id" :index="index" class="drag-item">\
                                <div slot="right-menu">\
                                    <swipeout-button type="warn" @click.native="todoDelConfirm(todo)">删除</swipeout-button>\
                                </div>\
                                <cell slot="content">\
                                    <check-icon slot="icon" :value.sync="todo.ischeck"></check-icon>\
                                    <div slot="title" @click="todoOpen(todo)">{{todo.name}}</div>\
                                </cell>\
                            </swipeout-item>\
                        </swipeout>\
	                    <div class="operte">\
							<div class="check">\
								<check-icon slot="icon" :value.sync="isallcheckundone" >全选选中</check-icon>\
							</div>\
							<div class="surecomplet" @click="todosAllUndone">确认</div>\
						</div>\
					</div>\
					\
					<div v-if="currentGroupName === \'已完成\'">\
						<swipeout class="listtask">\
	                        <swipeout-item v-for="(todo,index) in todosDone" v-if="todo.date==selectedMoment" :key="todo.id">\
	                            <div slot="right-menu">\
	                                <swipeout-button type="warn" @click.native="todoDelConfirm(todo)">删除</swipeout-button>\
	                            </div>\
	                            <cell slot="content">\
	                                <check-icon slot="icon" :value.sync="todo.ischeck"></check-icon>\
	                                <div slot="title" @click="todoOpen(todo)">{{todo.name}}</div>\
	                            </cell>\
	                        </swipeout-item>\
	                    </swipeout>\
	                    <div class="operte">\
							<div class="check">\
								<check-icon slot="icon" :value.sync="isallcheckdone" >全选选中</check-icon>\
							</div>\
							<div class="surecomplet" @click="todosAllDone">撤销</div>\
						</div>\
					</div>\
				</div>\
				\
            </div>\
            <div class="work">\
            <div class="release" v-show="isshow">\
                <input placeholder="请输入任务具体名称" type="text" v-model="name" class="release_input">\
                <div class="release_sub" @click="todoAdd">发布</div>\
            </div>\
            <div class="addwork"  @click="toggle">\
                <div class="add_icon">添加工作</div>\
            </div>\
        </div>\
        </div> \
    ',
    data: function () {
        return {
            changestatetab: 0,
            currentModeName: '日',
            selectedMoment: date2str(new Date(), 'yyyy-MM-dd').toString(),
            selectedTime: '今天',
            currentGroupName: '未完成',
            modesVisible: false,
            menusVisible: false,
            isallcheckdone: false,
            isallcheckundone: false,
            isshow: false,
            isdateShow: false,
            todos: [],
            startx: 0,
            starty: 0,
            name: '',
            top: '',
            width: ''
        }
    },
    computed: {
        groupTodoss: function () {
            return [
                {
                    title: '未完成'
                },
                {
                    title: '已完成'
                },
            ];
        },
        
        todosDone: function () {//返回已完成数据
            return this.todos.filter(function (t) {
                return t.isDone === false;
            });
        },
        todosUndone: function () {//返回未完成数据
            return this.todos.filter(function (t) {
                return t.isDone === true;
            })
        },
        todoscheckDone: function () {//返回已完成已勾选数据
            return this.todosDone.filter(function (t) {
                return t.ischeck === true;
            });
        },
        todoscheckUnDone: function () {//返回未完成已勾选数据
            return this.todosUndone.filter(function (t) {
                return t.ischeck === true;
            });
        },
        isAllDone: function () {
            var flag = true;
            this.todos.forEach(function (todo) {
                if (!todo.isDone) {
                    flag = false;
                }
            }, this);
            return flag;
        },
        isAllUndone: function () {
            var flag = true;
            this.todos.forEach(function (todo) {
                if (todo.isDone) {
                    flag = false;
                }
            }, this);
            return flag;
        },
        currentMode: function () {
            return this.modes.find(function (m) {
                return m.name === this.currentModeName;
            });
        }
    },
    mounted: function () {
        this.todos = Todo.getList();
        this.$on('changetab', function (currentModeName) {
            this.currentModeName = currentModeName;
        });
        this.$on('busdata', function (top, width) {
            this.top = top;
            this.width = width;
        });
        this.$on('todos', function (day) {
            this.selectedMoment=date2str(new Date(day), 'yyyy-MM-dd').toString();
        });
    },
    updated: function () {
        var vm = this;
        $('.drag-item').draggable({
            revert: true,
            delay: 1000,
            proxy: "clone",
            onStartDrag: function () {
                $(this).draggable("options").cursor = 'not-allowed';
                $(this).draggable("proxy").css('z-index', 200);
                $(".todo-list").removeClass("isoverflow");
                vm.$children[0].$emit('datearea');
            },
            onStopDrag: function () {
                $(".todo-list").addClass("isoverflow");
                $(this).css('left', 0);
                $(this).css('top', 0);
            }
        });
        $('.time-picker').droppable({
            onDragEnter: function (e, source) {
                $(source).cursor = 'auto';
            },
            onDrop: function (e, source) {
                var e, endx, endy, date,index;
                e = window.event;
                endx = e.changedTouches[0].pageX;
                endy = e.changedTouches[0].pageY;
                index = $(".drag-item").attr("index");
                if (endx > 0 && endx < vm.width && endy > vm.top) {//周一拖拽区域
                    date = new Date($(".is-active .datecount").eq(0).attr("date"));
                }
                if (endx >= vm.width && endx < vm.width * 2 && endy > vm.top) {//周二拖拽区域
                    date = new Date($(".is-active .datecount").eq(1).attr("date"));
                }
                if (endx >= vm.width * 2 && endx < vm.width * 3 && endy > vm.top) {//周三拖拽区域
                    date = new Date($(".is-active .datecount").eq(2).attr("date"));
                }
                if (endx >= vm.width * 3 && endx < vm.width * 4 && endy > vm.top) {//周四拖拽区域
                    date = new Date($(".is-active .datecount").eq(3).attr("date"));
                }
                if (endx >= vm.width * 4 && endx < vm.width * 5 && endy > vm.top) {
                    date = new Date($(".is-active .datecount").eq(4).attr("date"));
                }
                if (endx >= vm.width * 5 && endx < vm.width * 6 && endy > vm.top) {
                    date = new Date($(".is-active .datecount").eq(5).attr("date"));
                }
                if (endx >= vm.width * 6 && endx < vm.width * 7 && endy > vm.top) {
                    date = new Date($(".is-active .datecount").eq(6).attr("date"));
                }
                date = date2str(date, 'yyyy-MM-dd');
                vm.addTask(vm.todosUndone[index], date);
            }
        });
    },
    watch: {
        isallcheckdone: function (isCheck) {
            if (isCheck) {
                this.todosDone.forEach(function (todo) {
                    todo.ischeck = true;
                });
            } else {
                this.todosDone.forEach(function (todo) {
                    todo.ischeck = false;
                });
            }
        },
        isallcheckundone: function (isCheck) {
            if (isCheck) {
                this.todosUndone.forEach(function (todo) {
                    todo.ischeck = true;
                });
            } else {
                this.todosUndone.forEach(function (todo) {
                    todo.ischeck = false;
                });
            }
        }
    },
    methods: {
        addTask: function (t,d) {
            t.date = d;
        },
        formsOpen: function (todo) {
            const url = '/forms/' + todo.id;
            this.$router.push(url);
        },
        todoOpen: function (todo) {
            const url = '/todos/' + todo.id;
            this.$router.push(url);
        },
        todoAddOpen: function () {
            const url = '/todo/new';
            this.$router.push(url);
        },
        todoDelConfirm: function (todo) {
            this.$messagebox.confirm('确定删除？').then(function (action) {
                if (action) {
                    const todoDel = new Todo();
                    todoDel.id = todo.id;
                    todoDel.remove();
                }
            });
        },
        todosAllDone: function () {
            this.todoscheckDone.forEach(function (todo) {
                todo.isDone = true;
                todo.ischeck = false;
            }, this);
            this.isallcheckdone = false;
        },
        todosAllUndone: function () {
            this.todoscheckUnDone.forEach(function (todo) {
                todo.isDone = false;
                todo.ischeck = false;

            }, this);
            this.isallcheckundone = false;
        },
        modesOpen: function () {
            this.modesVisible = true;
        },
        groupChange: function (group, index) {
            this.currentGroupName = group.title;
            this.changestatetab = index;
        },
        toggle: function () {
            this.isshow = !this.isshow;
        },
        templatesSearchOpen: function () {
            const url = '/templates/search';
            this.$router.push(url);
        },
        todoAdd: function () {
            const todo = new Todo();
            todo.name = this.name;
            if (!todo.name) {
                this.$messagebox.alert('名称不能为空', '错误');
                return;
            }
            todo.add();
            this.$messagebox.alert('发布成功', '');
            this.name = '';
            this.isshow = !this.isshow;
        },
        touchstart: function () {
            var e = window.event;
            startx = e.touches[0].pageX;
            starty = e.touches[0].pageY;
        },
        touchmove: function () {
            var e, endx, endy,direction;
            e = window.event;
            endx = e.changedTouches[0].pageX;
            endy = e.changedTouches[0].pageY;
            direction = getDirection(startx, starty, endx, endy);
            switch (direction) {
                case 1:
                    this.isdateShow = false;
                    break;
                case 2:
                    this.isdateShow = true;
                    break;
                default:
            }
        }
    }
};