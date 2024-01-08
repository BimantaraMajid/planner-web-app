import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import moment, { Moment } from "moment";
import { useState } from "react";

interface GetMatrixCalendarParams {
  _month?: number;
  _year?: number;
}

function getMatrixCalendar({
  _month = moment().month(),
  _year = moment().year(),
}: GetMatrixCalendarParams): Array<Array<Moment>> {
  const dateMatrix = moment().year(_year).month(_month);
  const startWeekOfMonth = dateMatrix.startOf("month").week();
  const rangeWeek = Array(5)
    .fill(undefined)
    .map((_, idx) =>
      dateMatrix
        .clone()
        .week(startWeekOfMonth + idx)
        .week()
    );
  const matrixCalendar = rangeWeek.map((week) => {
    return Array(7)
      .fill(undefined)
      .map((_, idx) => {
        const startOfWeek = moment()
          .year(_year)
          .week(week)
          .startOf("date")
          .subtract(1, "day");
        return startOfWeek.add(idx, "day");
      });
  });
  return matrixCalendar;
}

function isThisMonth(date: Moment, _month = 0) {
  if (date.month() === _month) return true;
  return false;
}

function Header({
  toggleSidebar,
  baseDate = moment(),
  setToday,
  increaseMonth,
  decreaseMonth,
}: {
  toggleSidebar: () => void;
  baseDate: Moment;
  setToday: () => void;
  increaseMonth: () => void;
  decreaseMonth: () => void;
}) {
  return (
    <Row
      className="sticky-top bg-white p-2 border-bottom"
      style={{
        flexWrap: "unset",
      }}
    >
      <Col>
        <Stack direction="horizontal" gap={2}>
          <span style={{ minWidth: "100px" }}>Logo</span>
          <Button variant="outline-secondary" onClick={setToday}>
            Today
          </Button>
          <Button
            className="bi bi-chevron-left bg-white  border border-0"
            variant="light"
            onClick={decreaseMonth}
          ></Button>
          <Button
            className="bi bi-chevron-right bg-white border border-0"
            variant="light"
            onClick={increaseMonth}
          ></Button>
          <span>{baseDate.format("MMMM Y")}</span>
        </Stack>
      </Col>
      <Col xs={2}>
        <Stack gap={2} direction="horizontal">
          <span className="ms-auto">user</span>
          <Button variant="light" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </Button>
        </Stack>
      </Col>
    </Row>
  );
}

function Sidebar() {
  return (
    <Stack className="py-2">
      <Button>add</Button>
    </Stack>
  );
}

function Calendar({
  monthMatrix,
  indexMonth = moment().month(),
  indexYear = moment().year(),
}: {
  monthMatrix: Array<Array<Moment>>;
  indexMonth: number;
  indexYear: number;
}) {
  const oneDayBefore = moment()
    .year(indexYear)
    .month(indexMonth)
    .startOf("month")
    .subtract(1, "day");
  const oneDayAfter = moment()
    .year(indexYear)
    .month(indexMonth + 1)
    .startOf("month");
  return monthMatrix.map((week, wIndex) => (
    <Row
      key={wIndex}
      style={{
        flexWrap: "unset",
      }}
    >
      {week.map((day, dIndex) => (
        <Col
          key={`${wIndex} ${dIndex}`}
          className="border-end border-bottom p-1"
        >
          <Stack
            gap={0}
            style={{
              opacity: isThisMonth(day, indexMonth) ? 1 : 0.5,
            }}
          >
            {/*  */}
            {wIndex === 0 && (
              <span className="text-center">{day.format("ddd")}</span>
            )}
            <span className="text-center">
              {(day.isSame(oneDayBefore) || day.isSame(oneDayAfter)) &&
                day.format("MMM")}
              &nbsp;
              {day.format("D")}
            </span>
            <Badge bg="success" className="text-start">
              activity
            </Badge>
          </Stack>
        </Col>
      ))}
    </Row>
  ));
}

function HomePage() {
  const [showSidebar, setShowSidebar] = useState(true);
  const [isoDate, setIsoDate] = useState(
    moment().startOf("month").toISOString()
  );
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const baseDate = moment(isoDate);
  const monthMatrix = getMatrixCalendar({
    _month: baseDate.month(),
    _year: baseDate.year(),
  });

  const setToday = () => {
    setIsoDate(moment().startOf("month").toISOString());
  };

  const increaseMonth = () => {
    setIsoDate((prevMonth) => moment(prevMonth).add(1, "month").toISOString());
  };

  const decreaseMonth = () => {
    setIsoDate((prevMonth) =>
      moment(prevMonth).subtract(1, "month").toISOString()
    );
  };

  return (
    <>
      <Header
        toggleSidebar={toggleSidebar}
        baseDate={baseDate}
        setToday={setToday}
        increaseMonth={increaseMonth}
        decreaseMonth={decreaseMonth}
      ></Header>
      <Row
        style={{
          flexWrap: "unset",
        }}
      >
        <Col
          className="border-start border-top ms-2"
          style={{ marginTop: "-1px" }}
        >
          <Calendar
            monthMatrix={monthMatrix}
            indexMonth={baseDate.month()}
            indexYear={baseDate.year()}
          ></Calendar>
        </Col>
        {showSidebar && (
          <Col xs={2}>
            <Sidebar></Sidebar>
          </Col>
        )}
      </Row>
    </>
  );
}

export default HomePage;
