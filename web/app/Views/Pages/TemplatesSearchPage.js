const TemplatesSearchPage = {
	name: 'TemplatesSearchPage',
	template: '\
	    <div>\
	        <div class="searchpage">\
	       		<form action onsubmit="return false;">\
		        	<div class="searchbox">\
		        		<input placeholder="请输入关键字" type="search" v-model="key"  @keydown.up="changeUp($event)" @keydown.down="changeDown()" @keyup="show($event)"  class="search_input">\
					<div class="cannel" @click="cannel">取消</div>\
					<div class="searchlistbox" v-show="issearchShow">\
						<div class="search_box">\
						    <div class="search_list" v-for="(value,index) in arr" :class="{select:index==now}" @click="enter(index)">{{value.DIRECTBANK_TITLE}}</div>\
						</div>\
					</div>\
		        	</div>\
	        	</form>\
	        </div>\
	    </div>\
    ',
	data: function () {
		return {
			issearchShow: false,
			key: '',
			templateArr: [],
			arr: [],
			now: -1
		}
	},
	mounted: function () {
		vm = this;
		// var todos = Todo.getList();
		// for (var i = 0; i < todos.length; i++) {
		// 	var content = todos[i].templates;
		// 	for (var j = 0; j < content.length; j++) {
		// 		this.templateArr.push(content[j]);
		// 	}
		// }
		var todo = new Todo();
        todo.getDetail(
            function (response) {
				console.log(response);
				vm.templateArr=response.data;
            },function (error) {
                console.log(error);
                MINT.MessageBox.alert("内部服务器出错");
            }
        );
	},
	watch: {
		key: function () {
			this.$options.methods.get();
		}
	},
	methods: {
		cannel: function () {
			this.$router.go(-1);
		},
		show: function (ev) {
			if (ev.keyCode == "13") {
				if (!this.key) {
					this.$messagebox.alert('请输入关键字搜索', '错误');
					return;
				}
				var todo = new Todo();
				todo.id = this.key;
				const url = '/templates/' + todo.id;
				this.$router.push(url);
			}
		},
		get: function () {
			var ev = window.event;
			var _this = vm;
			if (ev.keyCode == 38 || ev.keyCode == 40) {
				return;
			}
			var template = _this.templateArr;
			for (var i = 0; i < template.length; i++) {
				var todo = template[i];
				if (vm.key == '') {
					vm.arr = [];
				} else {
					if (todo.DIRECTBANK_TITLE.indexOf(vm.key) >= 0) {
						if (vm.arr.indexOf(todo) < 0) {
							vm.arr.push(todo);
						}
					}
				}
			}
			if (vm.arr.length > 0) {
				vm.issearchShow = true;
			} else {
				vm.issearchShow = false;
			}
		},
		enter: function (index) {
            var attatchment = new Attachment();
            attatchment.downloadUrl = this.arr[index].DIRECTBANK_IMGURL;
            attatchment.fileName = this.arr[index].DIRECTBANK_TITLE;
            attatchment.get(function (response) {
                console.log(response);
                var data = response.data;
                if (data.errCode === "0000") {
                    var isPC = navigator.userAgent.includes('Windows');
                    var url = data.errMsg;
                    if (isPC) {
                        window.location.href = url;
                    } else {
                        if (navigator.userAgent.includes('iOS')) {
                            var strs = url.split('?');
                            url = encodeURI(strs[0]) + '?' + strs[1];
                        }
                        XuntongJSBridge.call('gotoLightApp',
                            { 'urlParam': url },
                            function (result) {
                                console.log(result);
                            });
                    }
                } else {
                    MINT.MessageBox.alert(data.errMsg);
                }
            }, function (error) {
                console.log(error);
                MINT.MessageBox.alert("内部服务器错误!");
            });
        },
		changeUp: function (ev) {
			ev.preventDefault();
			this.now--;
			if (this.now == -2) {
				this.now = this.arr.length - 1;
			};
			if (this.now == -1) {
				this.now = this.arr.length - 1;
			};
			this.key = this.arr[this.now];
		},
		changeDown: function () {
			this.now++;
			if (this.now == this.arr.length) {
				this.now = 0;
			};
			this.key = this.arr[this.now];
		}
	}
};