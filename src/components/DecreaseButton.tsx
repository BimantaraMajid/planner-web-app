import { useAppDispatch } from "../app/hooks"
import { decrement } from "../features/counter/counterSlice"

export function DecreaseButton() {
  const dispatch = useAppDispatch()
  return (
    <button aria-label="Decrement value" onClick={() => dispatch(decrement())}>
      -
    </button>
  )
}
