import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useState } from "react"
import { Alert, Button, Form, Spinner } from "react-bootstrap"
import {
  actionLogin,
  getAuthError,
  getAuthLoading,
} from "../../features/auth/authSlice"

export function BaseLogin() {
  const dispatch = useAppDispatch()
  const error = useAppSelector(getAuthError)
  const loading = useAppSelector(getAuthLoading)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [validated, setValidated] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
    } else {
      dispatch(actionLogin({ username, password }))
    }
    setValidated(true)
  }

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <h1 className="text-center mb-4">Login</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter email / username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Please type valid email / username
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Form.Control.Feedback type="invalid">
          Password is required
        </Form.Control.Feedback>
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100 mt-3"
        disabled={loading}
      >
        {loading ? <Spinner animation="border" size="sm" /> : "Login"}
      </Button>
    </Form>
  )
}
