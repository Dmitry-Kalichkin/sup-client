export function parseDate(date: Date): string {
    const monthName = MonthsNameForDate.get(date.getMonth() + 1);
    return date.getDate() + " " + monthName + " " + date.getFullYear();
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