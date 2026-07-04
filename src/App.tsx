import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "./components/Navbar/Navbar";

import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { HistoryPage } from "./pages/History/History";
import { PageTransition } from "./components/PageTransition/PageTransition";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <main className="flex-1 flex flex-col relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />
        <div className="pt-20 flex-1 flex flex-col">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/login"
          element={
            <PageTransition>
              <Login />
            </PageTransition>
          }
        />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Dashboard />
                </PageTransition>
              }
            />
            <Route
              path="/history"
              element={
                <PageTransition>
                  <HistoryPage />
                </PageTransition>
              }
            />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
