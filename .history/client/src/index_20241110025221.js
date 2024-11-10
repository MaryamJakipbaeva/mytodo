import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UserProvider from './context/UserProvider';
import Authentication, { AuthenticationMode } from './screens/Authentication';
import Home from './screens/Home';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './screens/ErrorPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Authentication mode={AuthenticationMode.Login} />} />
          <Route path="/signup" element={<Authentication mode={AuthenticationMode.Register} />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
