import { useAppDispatch } from "../../app/hooks"
import { logout } from "../../features/auth/authSlice"

interface BaseLogoutButtonProps {
  children?: React.ReactNode
  className?: string
}

export function BaseLogoutButton({
  children,
  className,
}: BaseLogoutButtonProps) {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }
  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  )
}
