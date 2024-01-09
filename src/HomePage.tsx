import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import moment, { Moment } from "moment";
import { useLayoutEffect, useState } from "react";

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
  width = 0,
}: {
  toggleSidebar: () => void;
  baseDate: Moment;
  setToday: () => void;
  increaseMonth: () => void;
  decreaseMonth: () => void;
  width?: number;
}) {
  return (
    <Row className="col p-2 border-bottom">
      <Stack gap={3} direction="horizontal">
        <div style={{ minWidth: "100px" }}>Logo</div>
        <Button size="sm" variant="outline-secondary" onClick={setToday}>
          Today
        </Button>
        <div className="text-nowrap">
          <Button
            size="sm"
            className="bi bi-chevron-left rounded-circle border border-0"
            variant="light"
            onClick={decreaseMonth}
          ></Button>
          <Button
            size="sm"
            className="bi bi-chevron-right rounded-circle border border-0"
            variant="light"
            onClick={increaseMonth}
          ></Button>
        </div>
        <div className="text-nowrap">{baseDate.format("MMMM Y")}</div>
        <div className="ms-auto">user</div>
        {width > 570 && (
          <Button size="sm" variant="light" className="rounded-circle" onClick={toggleSidebar}>
            <i className="bi bi-list"></i>
          </Button>
        )}
      </Stack>
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
  const today = moment().startOf("day");
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
  ));
}

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

function HomePage() {
  const [width] = useWindowSize();
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
        width={width}
      ></Header>
      <Row
        className="mx-2"
        style={{
          flexWrap: "unset",
        }}
      >
        <Col
          className="border-start border-top"
          style={{ marginTop: "-1px" }}
        >
          <Calendar
            monthMatrix={monthMatrix}
            indexMonth={baseDate.month()}
            indexYear={baseDate.year()}
          ></Calendar>
        </Col>

        {showSidebar && width > 570 && (
          <Col xs={2}>
            <Sidebar></Sidebar>
          </Col>
        )}
      </Row>
    </>
  );
}

export default HomePage;
