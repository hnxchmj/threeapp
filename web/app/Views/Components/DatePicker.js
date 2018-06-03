var monthString = {
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
    11: "十一",
    12: "十二",
}
const noCNMap = ['一', '二', '三', '四', '五', '六', '日']
function getWeekDays(momentPara) {
    const firstDay = moment(momentPara).startOf('isoWeek');
    const Mon = moment(firstDay);
    const Tue = moment(firstDay).add(1, 'days');
    const Wed = moment(firstDay).add(2, 'days');
    const Thur = moment(firstDay).add(3, 'days');
    const Fri = moment(firstDay).add(4, 'days');
    const Sat = moment(firstDay).add(5, 'days');
    const Sun = moment(firstDay).add(6, 'days');
    return [Mon, Tue, Wed, Thur, Fri, Sat, Sun];
}

function get3Weeks(momentPara) {
    var weeksOneYear = [];
    for (var i = 12; i > 0; i--) {
        const prevWeekMoment = moment(momentPara).subtract(i, 'weeks');
        weeksOneYear.push(getWeekDays(prevWeekMoment));
    }
    for (var i = 0; i < 12; i++) {
        const lastWeekMoment = moment(momentPara).add(i, 'weeks');
        weeksOneYear.push(getWeekDays(lastWeekMoment));
    }
    return weeksOneYear;
}

Vue.component('nb-date-picker', {
    template: '\
        <div>\
            <transition name="mydatefirst">\
                <div class="showbox" v-show="isdateShow" >\
                    <div class="datesort">\
                        <!--<i class="dateshow"></i>-->\
                        <div class="sort">\
                            <div class="sorttab">\
                                <!--<a class="tabstime" v-for="(mode, index) in modes" :class="{cur:changetab==index}" :key="mode.id" @click="modeChange(mode, index)">\
                                    {{mode.name}}\
                                    <i class="badge" v-if="mode.name === \'日\'">{{mode.countUndone}}</i>\
                                </a>-->\
                            </div>\
                        </div>\
                    </div>\
                    <div class = "date_select" v-if="currentModeName === \'日\'">\
                        <i class="dateshow">\
                        <i class="badge">{{countUndone}}</i>\
                        </i>\
                        <div class="datalist">\
                            <div class="dapart">\
                                    <div class="updown" v-on:click = "minYear"><i class="arrow left-arrow" ></i></div>\
                                    <label class = "date_select_date">{{year}}</label>\
                                    <div class="updown" v-on:click = "pluYear"><i class="arrow right-arrow" ></i></div>\
                            </div>\
                        </div>\
                        <div class="datalist">\
                            <div class="dapart">\
                                <div class="updown" v-on:click = "minMonth" ><i class="arrow left-arrow" ></i></div>\
                                <label class = "date_select_date">{{month}}月</label>\
                                <div class="updown" v-on:click = "pluMonth"> <i class="arrow right-arrow" ></i></div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </transition>\
            <grid v-if="currentModeName === \'日\'">\
                <grid-item v-for="i in noCNMap" :key="i">\
                    <span class="weekcount">周{{i}}</span>\
                </grid-item>\
            </grid>    \
            <mt-swipe v-if="currentModeName === \'日\'" :auto="0" ref="swipe" @change="handleChange" :show-indicators="false" :defaultIndex="12" :continuous="false" style="height: 50px;">\
                <mt-swipe-item class="oprate"  v-for="week in weekDayss" :key="week.id">\
                    <grid>\
                        <grid-item v-for="(day,index) in week" :key="day.id" v-bind:class="{\'date-grid-active\':day.isSame(date)}">\
                            <div slot="label" class="date-area"  @click="setDay(day)" >\
                                <div class="datecount" :date="day" v-bind:class="{\'datetoday\':day.isSame(timeFlag)}" > {{getDate(day)}}</div>\
                            </div>\
                        </grid-item>\
                    </grid>\
                </mt-swipe-item>\
            </mt-swipe>\
        </div>\
        ',
    data: function () {
        return {
            modes: [
                { name: '日', countUndone: 2 },
                { name: '周', countUndone: 3 },
                { name: '月', countUndone: 4 },
                { name: '季', countUndone: 8 },
                { name: '年', countUndone: 39 }
            ],
            changetab: 0,
            countUndone: 2,
            currentModeName: '日',
            modesVisible: false,
            timeFlag: moment().startOf("days"),
            time: moment(),
            noCNMap: [],
            weekDayss: []
        }
    },
    props: {
        isdateShow: Boolean,
    },
    computed: {
        year: function () {
            return this.time.year();
        },
        month: {
            get: function () {
                return monthString[this.time.month() + 1];
            }
        },
        date: {
            get: function () {
                return this.time.startOf("days");
            },
            set: function (day) {
                this.time = day;
            }
        }
    },
    created: function () {
        this.weekDayss = get3Weeks(this.time);
        this.noCNMap = noCNMap;
    },
    mounted: function () {

        this.$on('touchend', function () {
            this.touchend()
        });
        this.$on('datearea', function () {
            this.getTouchArea();
        })
    },
    watch: {
        month:function () {
            this.weekDayss = get3Weeks(this.time);
        }
    },
    methods: {
        getTouchArea: function () {
            var currentWeek = this.weekDayss[this.currIndexNum];
            var top = parseInt($('.is-active').offset().top);
            var width = parseInt($('.is-active .weui-grid').width());
            this.$parent.$emit('busdata', top, width);
        },
        modeChange: function (mode, index) {
            this.currentModeName = mode.name;
            this.$parent.$emit('changetab', this.currentModeName);
            this.modesVisible = false;
            this.changetab = index;
        },
        getDate: function (day) {
            return day.date();
        },
        handleChange: function (index_num) {
            console.log('handleChange');
            console.log(this.weekDayss[index_num]);
            var time0 = new Date($(".is-active .datecount").eq(0).attr("date"));
            var time6 = new Date($(".is-active .datecount").eq(6).attr("date"));
            // if(moment(time0).year() != moment(time6).year()){
            //     this.time = time0;
            if (time0 != "Invalid Date" || time6 != "Invalid Date") {
                if(moment(time0).month() != moment(time6).month()){
                    this.time = moment(time0);
                }
                if(moment(time0).month() == moment(time6).month()){
                    this.time = moment(time6);
                }
            }
            // }
            
        },
        setDay: function (day) {
            this.date = day
            this.$parent.$emit('todos', day);
        },
        pluYear: function () {
            console.log("pluYear");
            this.time = moment(this.time).add(1, "y");
        },
        minYear: function () {
            console.log("minYear");
            this.time = moment(this.time).subtract(1, "y");
        },
        pluMonth: function () {
            console.log("pluMonth");
            this.time = moment(this.time).add(1, "M");
        },
        minMonth: function () {
            console.log("minMonth");
            this.time = moment(this.time).subtract(1, "M");
            
        }
    }
});