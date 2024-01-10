import { Container } from "react-bootstrap"
import { BaseLogin } from "../../components/login/BaseLogin"

export function LoginPage() {
  return (
    <Container
      // className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <BaseLogin />
    </Container>
  )
}
