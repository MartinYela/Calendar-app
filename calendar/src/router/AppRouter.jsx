import { Fragment, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { LoginPage } from '../auth';
import { CalendarPage } from '../calendar';
import { useAuthStore } from '../hooks';

export const AppRouter = () => {

  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken()
  }, [])


  if (status === 'checking') {
    return <h3>Cargando...</h3>
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ?
          (
            <Fragment>
              <Route path='/auth/*' element={<LoginPage />} />
              <Route path='/*' element={<Navigate to='/auth/login' />} />
            </Fragment>
          )
          :
          (
            <Fragment>
              <Route path='/' element={<CalendarPage />} />
              <Route path='/*' element={<Navigate to='/' />} />
            </Fragment>
          )
      }


    </Routes>
  )
}
