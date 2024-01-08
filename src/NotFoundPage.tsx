import { Container } from "react-bootstrap";

const NotFoundPage = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <h1 className="text-danger">404 : Page Not Found</h1>
    </Container>
  );
};

export default NotFoundPage;
