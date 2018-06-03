Vue.component('nb-attachment-link', {
    props: {
        downloadUrl: String,
        fileName: String,
        billId: String
    },
    template: '<div @click="previewAttachment(downloadUrl, fileName)">\
                    <p><i class="enclosure">{{fileName}}</i></p>\
                </div>',
    methods: {
        previewAttachment: function (downloadUrl, fileName) {
            var attatchment = new Attachment();
            attatchment.downloadUrl = downloadUrl;
            attatchment.fileName = fileName;
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
        }
    }
});