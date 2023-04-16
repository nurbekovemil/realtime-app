import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

const Private: FC = () => {
  const isAuth = useAppSelector(state => state.auth.isAuthenticated)
  return (
    <>
      {
        isAuth ? <Outlet /> : <Navigate to="/auth" />
      }

    </>
  )
}

export default Private