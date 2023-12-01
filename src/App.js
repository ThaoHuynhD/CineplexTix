import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { userLocalStorage } from './api/localServices';
import BookTicketPage from './page/guest/BookTicketPage/BookTicketPage';
import HomePage from './page/guest/HomePage/HomePage';
import Layout from './template/Layout';
import SignInPage from './page/login/SignInPage';
import SignUpPage from './page/login/SignUpPage';
import NotFoundPage from './page/NotFoundPage';
import MainAdminPage from './page/admin/MainAdminPage/MainAdminPage';
import MovieDetailPage from './page/guest/MovieDetailPage/MovieDetailPage';
import PersonalPage from './page/PersonalPage/PersonalPage';

function App() {
  let info = userLocalStorage.get();

  let isAdmin;
  if (info !== null && info !== undefined) { isAdmin = info.maLoaiNguoiDung === 'QuanTri'; }
  const userRoutes = [
    { path: '/', element: <Layout><HomePage /></Layout> },
    { path: '/homepage', element: <Layout><HomePage /></Layout> },
    { path: '/sign-in', element: <SignInPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/detail/:maPhim', element: <Layout><MovieDetailPage /></Layout> },
    { path: '/personal', element: <Layout><PersonalPage /></Layout> },
    { path: '/purchasing/:maLichChieu', element: <Layout><BookTicketPage /></Layout> },
    { path: '/*', element: <NotFoundPage /> },
  ];

  const adminRoutes = [
    { path: '/', element: <MainAdminPage /> },
    { path: '/sign-in', element: <SignInPage /> },
    { path: '/sign-up', element: <SignUpPage /> },
    { path: '/personal', element: <PersonalPage /> },
    { path: '/*', element: <NotFoundPage /> },
    { path: '/admin', element: <MainAdminPage /> },
    { path: '/purchasing/:maLichChieu', element: <Layout><BookTicketPage /></Layout> },
  ]

  let selectedRoutes = userRoutes;
  if (isAdmin) { selectedRoutes = adminRoutes }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {selectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
