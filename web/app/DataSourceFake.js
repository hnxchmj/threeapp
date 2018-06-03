var todos = [
    {
        id: '001',
        name: '开门营业撤防',
        desc: '每日安排专人开门撤防',
        timeSeq: '班前',
        date:'2018-06-01',
        innerNo: 1,
        isDone: true,
        ischeck:false,
        templates: ['工作任务模板1','工作任务模板2','工作任务模板3','工作任务模板4'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '002',
        name: '主题晨会召开',
        desc: '根据模板召开主题晨会并记录，例如周三为风险主题晨会',
        timeSeq: '班前',
        date:'2018-06-01',
        innerNo: 2,
        isDone: true,
        ischeck:false,
        templates: [],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '003',
        name: '开门营业撤防1',
        desc: '每日安排专人开门撤防',
        timeSeq: '班前',
        date:'2018-06-01',
        innerNo: 1,
        isDone: true,
        ischeck:false,
        templates: ['工作任务模板1','工作任务模板2','工作任务模板3','工作任务模板4'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '004',
        name: '主题晨会召开1',
        desc: '根据模板召开主题晨会并记录，例如周三为风险主题晨会',
        timeSeq: '班前',
        date:'2018-06-01',
        innerNo: 2,
        isDone: true,
        ischeck:false,
        templates: [],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '005',
        name: '网点账务核对',
        desc: '对前一日的账务进行核对，确保账实相符（包括网点每日报表、重要内部账余额及变动情况，关注查询查复等重要业务）',
        timeSeq: '班中',
        date:'2018-06-02',
        innerNo: 1,
        isDone: true,
        ischeck:false,
        templates: ['内部账核对指引', '内部账核对明细表', '内部账核对明细表1'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '006',
        name: '网点走动管理',
        desc: '1、对柜面业务、服务、营销进行现场检查，对员工履职情况进行督导，并重点关注新员工 2 、网点巡检：“一日两巡”包括检查柜面、厅堂及VIP室是否符合营业标准，并适时参与厅堂管理（原则上为10：00、15：00，可结合客流量的实际情况进行灵活安排）；“一日一巡”包括检查双录及机房是否符合营业标准 3、根据当日的客流量做好窗口的灵活安排 4、对外部客户及业务条线的疑问进行解答',
        timeSeq: '班中',
        date:'2018-06-02',
        innerNo: 2,
        isDone: true,
        ischeck:false,
        templates: ['厅堂巡检标准化指引'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '007',
        name: '网点账务核对',
        desc: '对前一日的账务进行核对，确保账实相符（包括网点每日报表、重要内部账余额及变动情况，关注查询查复等重要业务）',
        timeSeq: '班中',
        date:'2018-06-02',
        innerNo: 1,
        isDone: true,
        ischeck:false,
        templates: ['内部账核对指引', '内部账核对明细表', '内部账核对明细表1'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '008',
        name: '网点走动管理',
        desc: '1、对柜面业务、服务、营销进行现场检查，对员工履职情况进行督导，并重点关注新员工 2 、网点巡检：“一日两巡”包括检查柜面、厅堂及VIP室是否符合营业标准，并适时参与厅堂管理（原则上为10：00、15：00，可结合客流量的实际情况进行灵活安排）；“一日一巡”包括检查双录及机房是否符合营业标准 3、根据当日的客流量做好窗口的灵活安排 4、对外部客户及业务条线的疑问进行解答',
        timeSeq: '班中',
        date:'2018-06-02',
        innerNo: 2,
        isDone: true,
        ischeck:false,
        templates: ['厅堂巡检标准化指引'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '009',
        name: '网点签退确认',
        desc: '1、签退前对各类重点关注交易进行确认并进行二次对账 2、关注网点签退待处理事项，梳理当日的重要事项、待跟踪事件',
        timeSeq: '班后',
        date:'2018-06-03',
        innerNo: 1,
        isDone: false,
        ischeck:false,
        templates: ['内部账核对指引', '内部账核对明细表', '日终交易确认勾兑表'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '010',
        name: '柜员尾箱盘点',
        desc: '原则上对所有上班员工的尾箱进行盘点，确保账实相符',
        timeSeq: '班后',
        date:'2018-06-03',
        innerNo: 2,
        isDone: false,
        ischeck:false,
        templates: ['盘库指引'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '011',
        name: '网点签退确认',
        desc: '1、签退前对各类重点关注交易进行确认并进行二次对账 2、关注网点签退待处理事项，梳理当日的重要事项、待跟踪事件',
        timeSeq: '班后',
        date:'2018-06-03',
        innerNo: 1,
        isDone: true,
        ischeck:false,
        templates: ['内部账核对指引', '内部账核对明细表', '日终交易确认勾兑表'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '012',
        name: '柜员尾箱盘点',
        desc: '原则上对所有上班员工的尾箱进行盘点，确保账实相符',
        timeSeq: '班后',
        date:'2018-06-03',
        innerNo: 2,
        isDone: false,
        ischeck:false,
        templates: ['盘库指引'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '013',
        name: '开门营业撤电',
        desc: '每日安排专人开门撤防',
        timeSeq: '班前',
        date:'2018-06-02',
        innerNo: 1,
        isDone: true,
        ischeck:false,
        templates: ['工作任务模板1','工作任务模板2','工作任务模板3','工作任务模板4'],
        forms: ['form01', 'form02', 'form03']
    },
    {
        id: '014',
        name: '开门营业撤电',
        desc: '每日安排专人开门撤防',
        timeSeq: '班前',
        date:'2018-06-02',
        innerNo: 1,
        isDone: true,
        ischeck:false,
        templates: ['工作任务模板1','工作任务模板2','工作任务模板3','工作任务模板4'],
        forms: ['form01', 'form02', 'form03']
    }
]

var userStatuss = [
    {
        user: {
            id: '112539',
            name: '竺婷婷',
            department: {
                id: '0001',
                name: '总行办公室',
            },
            position: '文员'
        },
        countUndone: 8
    },
    {
        user: {
            id: '120514',
            name: '毛思远',
            department: {
                id: '0002',
                name: '总行电子银行部',
            },
            position: '产品经理'
        },
        countUndone: 5
    },
    {
        user: {
            id: '152190',
            name: '孙卢纳',
            department: {
                id: '0003',
                name: '总行研发四部',
            },
            position: '项目经理'
        },
        countUndone: 0
    },
]