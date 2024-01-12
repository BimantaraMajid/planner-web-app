import moment, { Moment } from "moment"
import { Button, Row, Stack } from "react-bootstrap"
import { BaseLogoutButton } from "../logout/BaseLogoutButton"

export function HeaderCalendar({
  toggleSidebar,
  baseDate = moment(),
  setToday,
  increaseMonth,
  decreaseMonth,
  width = 0,
}: {
  toggleSidebar: () => void
  baseDate: Moment
  setToday: () => void
  increaseMonth: () => void
  decreaseMonth: () => void
  width?: number
}) {
  return (
    <Stack gap={3} direction="horizontal" className="border-bottom py-2 px-3">
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

      {/* right header */}
      <div className="ms-auto">
        <BaseLogoutButton className="btn btn-link">
          <span>logout</span>
        </BaseLogoutButton>
      </div>
      {width > 570 && (
        <Button
          size="sm"
          variant="light"
          className="rounded-circle"
          onClick={toggleSidebar}
        >
          <i className="bi bi-list"></i>
        </Button>
      )}
    </Stack>
  )
}
