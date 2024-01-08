import moment from "moment";

// const now = moment().month(0);
// const year = now.year();
// const startWeekOfMonth = now.startOf('month').week();
// const endWeekOfMonth = now.endOf('month').week();
// const rangeWeek = Array(endWeekOfMonth - startWeekOfMonth + 1).fill().map((_, idx) => startWeekOfMonth + idx);
// const matrixCalendar = rangeWeek.map((week) => {
//   return Array(7).fill().map((_, idx) => {
//     const startOfWeek = moment().year(year).week(week).startOf('week');
//     console.log(startOfWeek.toISOString(), idx, startOfWeek.add(idx, 'day').toISOString())
//     return startOfWeek.add(idx, 'day').format('YYYY-MM-DD');
//   });
// });
// // console.log(now.isoWeeksInYear());
// // console.log(rangeWeek[0]);
// // console.log(rangeWeek[1]);
// // console.log(moment().weekday(1).toISOString());
// console.log(rangeWeek)
// console.log(matrixCalendar)
// console.log(matrixCalendar)

// console.log(moment().year(year).week(1).startOf('date').toISOString());
// console.log(moment().year(year).week(1).startOf('week').toISOString());
// // for (let week = rangeWeek[0]; week <= rangeWeek[1]; week++) {
// //   const startOfWeek = moment().year(year).week(week).startOf('date');
// //   const startOfWeek = moment().year(year).week(week).startOf('date');
  
// //   console.log('week :', week);
// //   console.log(startOfWeek.toISOString());
// // }



function getMatrixCalendar({
  _month = 0,
  _year = moment().year(),
}){
  const now = moment().year(_year).month(_month);
  const startWeekOfMonth = now.startOf("month").week();
  const endWeekOfMonth = now.endOf("month").week();
  const rangeWeek = Array(endWeekOfMonth - startWeekOfMonth + 1)
    .fill(undefined)
    .map((_, idx) => startWeekOfMonth + idx);
  const matrixCalendar = rangeWeek.map((week) => {
    return Array(7)
      .fill(undefined)
      .map((_, idx) => {
        const startOfWeek = moment().year(_year).week(week).startOf("date");
        return startOfWeek.add(idx, "day");
      });
  });
  return matrixCalendar;
}

const jan = getMatrixCalendar({ _month: 0, _year: 2024 });

console.log(jan);