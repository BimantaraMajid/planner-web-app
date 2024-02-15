import moment, { Moment } from "moment"

interface GetMatrixCalendarParams {
  _month?: number
  _year?: number
}

export function getMatrixCalendar({
  _month = moment().month(),
  _year = moment().year(),
}: GetMatrixCalendarParams): Array<Array<Moment>> {
  const dateMatrix = moment()
    .year(_year)
    .month(_month)
    .startOf("month")
    .subtract(1, "week")
  const rangeWeek = Array(5)
    .fill(undefined)
    .map((_, idx) => dateMatrix.add(1, "week").week())
  const matrixCalendar = rangeWeek.map((week) => {
    return Array(7)
      .fill(undefined)
      .map((_, idx) => {
        const startOfWeek = moment()
          .year(_year)
          .month(_month)
          .week(week)
          .startOf("week")
        return startOfWeek.add(idx, "day")
      })
  })
  return matrixCalendar
}

export function isThisMonth(date: Moment, _month = 0) {
  if (date.month() === _month) return true
  return false
}
