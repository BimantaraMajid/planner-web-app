import { Col, Row } from "react-bootstrap"
import moment from "moment"
import { useLayoutEffect, useState } from "react"
import { SidebarCalendar } from "../../components/sidebar/SidebarCalendar"
import { getMatrixCalendar } from "../../utils/calendar"
import { HeaderCalendar } from "../../components/header/HeaderCalendar"
import { GCalendar } from "../../components/calendar/Gcalendar"

function useWindowSize() {
  const [size, setSize] = useState([0, 0])
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight])
    }
    window.addEventListener("resize", updateSize)
    updateSize()
    return () => window.removeEventListener("resize", updateSize)
  }, [])
  return size
}

export function MainPage() {
  const [width] = useWindowSize()
  const [showSidebar, setShowSidebar] = useState(true)
  const [isoDate, setIsoDate] = useState(
    moment().startOf("month").toISOString(),
  )
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const baseDate = moment(isoDate)
  const monthMatrix = getMatrixCalendar({
    _month: baseDate.month(),
    _year: baseDate.year(),
  })

  const setToday = () => {
    setIsoDate(moment().startOf("month").toISOString())
  }

  const increaseMonth = () => {
    setIsoDate((prevMonth) => moment(prevMonth).add(1, "month").toISOString())
  }

  const decreaseMonth = () => {
    setIsoDate((prevMonth) =>
      moment(prevMonth).subtract(1, "month").toISOString(),
    )
  }

  return (
    <>
      <HeaderCalendar
        toggleSidebar={toggleSidebar}
        baseDate={baseDate}
        setToday={setToday}
        increaseMonth={increaseMonth}
        decreaseMonth={decreaseMonth}
        width={width}
      ></HeaderCalendar>
      <Row
        className="mx-2"
        style={{
          flexWrap: "unset",
        }}
      >
        <Col className="border-start border-top" style={{ marginTop: "-1px" }}>
          <GCalendar
            monthMatrix={monthMatrix}
            indexMonth={baseDate.month()}
            indexYear={baseDate.year()}
          ></GCalendar>
        </Col>

        {showSidebar && width > 570 && (
          <Col xs={2} className="p-0 pt-2 ps-2">
            <SidebarCalendar />
          </Col>
        )}
      </Row>
    </>
  )
}
