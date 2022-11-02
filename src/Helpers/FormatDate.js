export const FormatDate = (date) => {
    if (typeof date === "undefined" || date === null)
        return "--:--:-- --/--/----";
    var mm = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    return [[(d > 9 ? "" : "0") + d, (mm > 9 ? "" : "0") + mm, date.getFullYear()].join("/"), [(h > 9 ? "" : "0") + h, (m > 9 ? "" : "0") + m, (s > 9 ? "" : "0") + s].join(":")].join(" ");
}