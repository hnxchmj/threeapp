function getDate(year, month, date) {
    var strMonth = '';
    var nextMonthNum = moment([year, month], "YYYY-MM").daysInMonth();
    if (date.date() > nextMonthNum) {
        strMonth = year + "-" + month + "-" + nextMonthNum;
    } else {
        strMonth = year + "-" + month + "-" + date.date();
    }
    return moment(strMonth, "YYYY-MM-DD");
}
function date2str(x, y) {
    var z = { y: x.getFullYear(), M: x.getMonth() + 1, d: x.getDate() };
    return y.replace(/(y+|M+|d+)/g, function (v) { return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2)) });
}
function getDirection(startx, starty, endx, endy) {
    var angx = endx - startx;
    var angy = endy - starty;
    var result = 0;

    //如果滑动距离太短
    if (Math.abs(angx) < 2 && Math.abs(angy) < 2) {
        return result;
    }
    var angle = getAngle(angx, angy);
    if (angle >= -135 && angle <= -45) {
        result = 1;
    } else if (angle > 45 && angle < 135) {
        result = 2;
    } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3;
    } else if (angle >= -45 && angle <= 45) {
        result = 4;
    }
    return result;
}
function getAngle(angx, angy) {
    return Math.atan2(angy, angx) * 180 / Math.PI;
}