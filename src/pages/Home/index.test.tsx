/* eslint-disable testing-library/prefer-screen-queries */
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../app/store"
import HomePage from "."
import { BrowserRouter } from "react-router-dom"

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>,
  )

  expect(getByText(/learn/i)).toBeInTheDocument()
})
