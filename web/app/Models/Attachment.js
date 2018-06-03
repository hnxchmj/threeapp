function Attachment() {
    this.attachmentId = '';
    this.downloadUrl = '';
    this.fileName = '';
    this.billId = '';
}

Attachment.prototype.get = function (successFunc, failFunc) {
    axios.get('../../bzgzl.fileAction.do', {
        params: {
            downloadUrl: this.downloadUrl,
            fileName: this.fileName
        }
    }).then(function (response) {
        successFunc(response);
    }).catch(function (error) {
        failFunc(error);
    });
};