import dayjs from "dayjs";

export const getMonth = (month = dayjs().month()) => {
    const year = dayjs().year()
    const firstDayOfThisMonth = dayjs(new Date(year, month, 1)).day()   //umpama april maka nilainya 5
    let startFromDate = 0 - firstDayOfThisMonth
    const daysMatrix = new Array(6).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            startFromDate++
            return dayjs(new Date(year, month, startFromDate))
        })
    })
    return daysMatrix;
}




















// export function getMonth(month = dayjs().month()) {
//     month = Math.floor(month);
//     const year = dayjs().year();
//     const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
//     let currentMonthCount = 0 - firstDayOfTheMonth;
//     const daysMatrix = new Array(5).fill([]).map(() => {
//       return new Array(7).fill(null).map(() => {
//         currentMonthCount++;
//         return dayjs(new Date(year, month, currentMonthCount));
//       });
//     });
//     return daysMatrix;
//   }
  