import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import Login from '../pages/Login/index';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<h1>Dashboard (Protected Route)</h1>} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;