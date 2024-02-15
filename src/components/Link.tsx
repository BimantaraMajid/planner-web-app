import { Stack } from "react-bootstrap"
import { Link } from "react-router-dom"

export function LinkAnotherPage() {
  return (
    <Stack gap={3} direction="horizontal">
      <Link to="/">Main</Link>
      <Link to="/home">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/404">404 Page</Link>
    </Stack>
  )
}
