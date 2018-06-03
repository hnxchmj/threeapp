const TeamPage = {
    name: 'TeamPage',
    template: '\
        <div>\
	        <div class="team">\
	    		 <div class="bggray"></div>\
	    		 <group>\
	                <cell v-for="userStatus in userStatuss" :key="userStatus.id" is-link>\
	                	<div slot="title" @click="goLink(userStatus.user.id)">{{userStatus.user.name}}</div>\
	                    <div>{{userStatus.user.position}}</div>\
	                </cell>\
	            </group>\
	    	</div>\
        </div>\
    ',
    data:function(){
        return {
            userStatuss: userStatuss,
            
        }
    },
    mounted:function(){
        this.userStatuss= Team.getTeam();
    },
    methods: {
        goLink:function(num){
        	    var team = new Team();
        	    team.id = num;
        	    //alert(team.id);
        		//const url = '/my/' + team.id ;
        		//this.$router.push(url);
        		// this.currentModeName = team.name;
        		//let todo = new Todo();
        		//todo.id = this.teamTodoss.user.name;
        		//const url = '/templates/' + todo.id;
        		//this.$router.push(url);
        }
    }
};