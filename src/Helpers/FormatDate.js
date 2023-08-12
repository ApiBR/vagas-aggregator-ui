
const FormatDate = (date, onlyDate = false) => {
    if (typeof date === "undefined" || date === null)
        return onlyDate ? "--/--/---" : "--/--/---- --:--:--";
    const mm = date.getMonth() + 1;
    const d = date.getDate();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();

    const datePart = [(d > 9 ? "" : "0") + d, (mm > 9 ? "" : "0") + mm, date.getFullYear()].join("/");
    const timePart = [(h > 9 ? "" : "0") + h, (m > 9 ? "" : "0") + m, (s > 9 ? "" : "0") + s].join(":");

    if (onlyDate) {
        return datePart;
    }

    return [datePart, timePart].join(" ");
}

export default FormatDate;