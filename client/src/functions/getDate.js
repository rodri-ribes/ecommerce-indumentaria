

export default function getDate(hourOrDate) {

    let date = new Date();

    let hourText = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}`

    let dateText = `${date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}/${date.getMonth() + 1 < 10 ? "0" + parseInt(date.getMonth() + 1) : parseInt(date.getMonth())}/${date.getFullYear()}`

    if (hourOrDate === "hour") {
        return hourText
    } else if (hourOrDate === "date") {
        return dateText
    } else {
        return hourText + " - " + dateText
    }

}