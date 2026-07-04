import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { Navbar } from "./components/Navbar/Navbar";

import { Dashboard } from "./pages/Dashboard/Dashboard";
import { Login } from "./pages/Login/Login";

function DashboardLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-[128px] z-0 pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-primary-blue/10 rounded-full blur-[128px] z-0 pointer-events-none" />
      
      <Sidebar />
      
      <main className="flex-1 md:pl-64 flex flex-col relative z-10 min-h-screen overflow-x-hidden">
        <Navbar />
        <div className="pt-20 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
