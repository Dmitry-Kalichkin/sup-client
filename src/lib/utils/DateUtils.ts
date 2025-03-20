export function parseDate(date: Date): string {
    const monthName = MonthsNameForDate.get(date.getMonth() + 1);
    return date.getDate() + " " + monthName + " " + date.getFullYear();
}

export function parseFormDate(date: Date): string {
    const month = date.getMonth() + 1;
    return date.getFullYear() + "-" + (month < 10 ? "0" + month : month) + "-" + (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
}

export function toServerFormat(date: string): string {
    const [year, month, day] = date.split("-");
    return day + "." + month + "." + year;
}

export const MonthsNameForDate = new Map<number, string>([
    [1, "Января"],
    [2, "Февраля"],
    [3, "Марта"],
    [4, "Апреля"],
    [5, "Мая"],
    [6, "Июня"],
    [7, "Июля"],
    [8, "Августа"],
    [9, "Сентября"],
    [10, "Октября"],
    [11, "Ноября"],
    [12, "Декабря"]
]);