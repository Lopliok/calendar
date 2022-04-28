

type DayCell = {
    date: Date
    dayName: string
    disable?: boolean
    czIdxWeekday: number
    day: number
}

const formatDayOfWeek = (date: Date) =>
    Intl.DateTimeFormat("cs-CZ", {
        weekday: "long"
    }).format(date)


const generateDayItemForMonth = (year = 2022, month = 4): DayCell[][] => {

    const date = new Date(year, month + 1, 0);

    const daysInMonth = date.getDate();

    let day = 1;
    let data: [DayCell[]] = [[]]
    let week = 0;

    while (day <= daysInMonth) {

        const dayOfWeek = new Date(year, month, day).getDay();

        const czDayIndex = { 0: 6, 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5 }[dayOfWeek];

        if (!data?.[week]) {
            data.push([]);
        }

        if (czDayIndex !== undefined) {

            const date = new Date(year, month, day)

            data[week][czDayIndex] = {
                date,
                dayName: formatDayOfWeek(date),
                czIdxWeekday: czDayIndex,
                day: day
            };

        }
        if (dayOfWeek == 0 && day !== daysInMonth) {
            week++;
        }
        day++;
    }
    const [firstWeek, ...rest] = data

    const lastWeek = prefillLastWeek(rest.at(-1) as any)


    const weeks: DayCell[][] = (rest as any).slice(0, -1)

    const result: DayCell[][] = [prefillFirstWeek(firstWeek), ...weeks, lastWeek]

    return result
}

export const prefillLastWeek = (lastWeek: DayCell[]) => {


    let dayIndex = 0;
    let prevDay: Date | undefined;
    let result = [];
    while (dayIndex <= 6) {
        if (prevDay && lastWeek[dayIndex] === undefined) {
            let newDate = new Date(prevDay);
            newDate.setDate(prevDay.getDate() + 1);
            result[dayIndex] = { date: newDate, dayName: formatDayOfWeek(newDate), disable: true, czIdxWeekday: dayIndex, day: newDate.getDate() };
            prevDay = newDate;
        } else {

            prevDay = lastWeek[dayIndex].date;
            result[dayIndex] = lastWeek[dayIndex];
        }
        dayIndex++;
    }

    return result
}

const prefillFirstWeek = (firstWeek: DayCell[]) => {

    let dayIndex = 6;
    let prevDay: Date | undefined;
    let result = [];
    while (dayIndex >= 0) {
        if (prevDay && firstWeek[dayIndex] === undefined) {
            let newDate = new Date();
            newDate.setDate(prevDay.getDate() - 1);
            result[dayIndex] = { date: newDate, dayName: formatDayOfWeek(newDate), disable: true, czIdxWeekday: dayIndex, day: prevDay.getDate() };
            prevDay = newDate;
        } else {
            prevDay = firstWeek[dayIndex].date;
            result[dayIndex] = firstWeek[dayIndex];
        }
        dayIndex--;
    }
    return result
}

const Calendar = {
    prefillFirstWeek,
    generateDayItemForMonth
}

export default Calendar


