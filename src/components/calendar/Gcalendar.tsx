import moment, { Moment } from "moment"
import { Badge, Col, Row, Stack } from "react-bootstrap"
import { isThisMonth } from "../../utils/calendar"

export function GCalendar({
  monthMatrix,
  indexMonth = moment().month(),
  indexYear = moment().year(),
}: {
  monthMatrix: Array<Array<Moment>>
  indexMonth: number
  indexYear: number
}) {
  const oneDayBefore = moment()
    .year(indexYear)
    .month(indexMonth)
    .startOf("month")
    .subtract(1, "day")
  const oneDayAfter = moment()
    .year(indexYear)
    .month(indexMonth + 1)
    .startOf("month")
  const today = moment().startOf("day")
  return monthMatrix.map((week, wIndex) => (
    <Row
      key={wIndex}
      style={{
        flexWrap: "unset",
        minHeight: "18vh",
      }}
    >
      {week.map((day, dIndex) => (
        <Col
          key={`${wIndex} ${dIndex}`}
          className={
            "border-end border-bottom p-1" +
            (dIndex === week.length - 1 ? "order-1" : "order-2")
          }
        >
          <Stack
            gap={1}
            style={{
              opacity: isThisMonth(day, indexMonth) ? 1 : 0.5,
            }}
          >
            {/*  */}
            {wIndex === 0 && (
              <span className="text-center">{day.format("ddd")}</span>
            )}
            <div className="text-center">
              {(day.isSame(oneDayBefore) || day.isSame(oneDayAfter)) &&
                day.format("MMM")}
              &nbsp;
              <span className={day.isSame(today) ? "badge bg-primary" : ""}>
                {day.format("D")}
              </span>
            </div>
            <Badge bg="success" className="text-start">
              activity
            </Badge>
          </Stack>
        </Col>
      ))}
    </Row>
  ))
}
