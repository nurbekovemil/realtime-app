import { FC } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
const Public: FC = () => {
  const location = useLocation();
  const isAuth = useAppSelector(state => state.auth.isAuthenticated)

  return (
    <>

      {
        location.pathname == '/auth' && isAuth ? <Navigate to="/chat" /> : <Outlet />
      }
    </>
  )
}

export default Public