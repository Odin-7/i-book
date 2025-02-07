// 获取当前时间

export function getCurrentDateTime() {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = ("0" + (currentDate.getMonth() + 1)).slice(-2); //月份从0开始，需要加1
    var day = ("0" + currentDate.getDate()).slice(-2);
    var hours = ("0" + currentDate.getHours()).slice(-2);
    var minutes = ("0" + currentDate.getMinutes()).slice(-2);
    var seconds = ("0" + currentDate.getSeconds()).slice(-2);
    return year + month  + day + hours + minutes + seconds;
}