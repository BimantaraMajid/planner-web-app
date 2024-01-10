/* eslint-disable testing-library/prefer-screen-queries */

import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { store } from "../../app/store"
import { BrowserRouter } from "react-router-dom"
import { MainPage } from "../Main"

test("renders learn react link", () => {
  const { getByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    </Provider>,
  )

  expect(getByText(/today/i)).toBeInTheDocument()
  expect(getByText(/note/i)).toBeInTheDocument()
  expect(getByText(/note/i)).toBeInTheDocument()
  expect(getByText(/save/i)).toBeInTheDocument()
})
