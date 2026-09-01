import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { PlanPage } from './pages/PlanPage';
import { ProgressPage } from './pages/ProgressPage';
import { CasesPage } from './pages/CasesPage';
import { ChatPage } from './pages/ChatPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Redirect logged-out users away from protected pages.
function RequireAuth() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const location = useLocation();
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

// Redirect logged-in users away from the login page.
function GuestOnly() {
  const currentUser = useAuthStore((s) => s.currentUser);
  if (currentUser) {
    return <Navigate to="/home" replace />;
  }
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<GuestOnly />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/plan" element={<PlanPage />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/cases" element={<CasesPage />} />
            <Route path="/chat" element={<ChatPage />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
