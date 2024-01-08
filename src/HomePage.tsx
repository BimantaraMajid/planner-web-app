import { Badge, Button, Col, Container, Row, Stack } from "react-bootstrap";
import moment, { Moment } from "moment";
import { useState } from "react";

interface GetMatrixCalendarParams {
  _month?: number;
  _year?: number;
}

function getMatrixCalendar({
  _month = 0,
  _year = moment().year(),
}: GetMatrixCalendarParams): Array<Array<Moment>> {
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

function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <Stack
      direction="horizontal"
      className="sticky-top bg-white p-2 border-bottom"
    >
      <Stack gap={2} direction="horizontal">
        <Button variant="light" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </Button>
        Logo
      </Stack>
      <div className="ms-auto">user</div>
    </Stack>
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
  indexMonth,
}: {
  monthMatrix: Array<Array<Moment>>;
  indexMonth: number;
}) {
  return monthMatrix.map((week, wIndex) => (
    <Row key={wIndex}>
      {week.map((day, dIndex) => (
        <Col
          key={`${wIndex} ${dIndex}`}
          className="border-end border-bottom p-1"
          style={{
            minHeight: "200px",
          }}
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
              {!isThisMonth(day, indexMonth) && day.format("MMM")}
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
  const [indexMonth] = useState(moment().month());
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const monthMatrix = getMatrixCalendar({ _month: indexMonth });

  return (
    <>
      <Header toggleSidebar={toggleSidebar}></Header>
      <Container fluid>
        <Row className="">
          {showSidebar && (
            <Col xs={2}>
              <Sidebar></Sidebar>
            </Col>
          )}
          <Col className="border-start border-top" style={{ margin: "-1px" }}>
            <Calendar
              monthMatrix={monthMatrix}
              indexMonth={indexMonth}
            ></Calendar>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
