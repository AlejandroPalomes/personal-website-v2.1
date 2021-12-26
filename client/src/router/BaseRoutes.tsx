import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFound404 from '../../pages/NotFound404.page';
import ErrorPage from '../../pages/Error.page';
import { Anonymous } from './routes/Anonymous';

export const BaseRoutes: FC = ({ children }) => {
  return <Routes>
    {children}
    <Route path={Anonymous.ERROR.route} element={<ErrorPage/>}/>
    <Route path="*" element={<NotFound404/>}/>
  </Routes>;
};
