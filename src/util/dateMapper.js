export function dateMapper(date) {
    const Month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const dates = date.split("-");

    return `${Month[Number(dates[1]) - 1]}, ${dates[2]}, ${dates[0]}`
}