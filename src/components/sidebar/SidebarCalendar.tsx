import { Button, FloatingLabel, Form, Stack } from "react-bootstrap"

export function SidebarCalendar() {
  return (
    <Stack gap={2}>
      <FloatingLabel label="Note">
        <Form.Control
          className="bg-warning"
          as="textarea"
          placeholder="Type your note here"
          style={{ height: "150px" }}
        />
      </FloatingLabel>
      <Button>Save</Button>
    </Stack>
  )
}
