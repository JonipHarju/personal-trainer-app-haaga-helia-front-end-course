import { Outlet } from "react-router";
import PageWrapper from "./components/PageWrapper";
import Navbar from "./components/Navbar";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <PageWrapper>
      <Navbar />
      <Outlet />
      <Toaster position="bottom-center" />
    </PageWrapper>
  );
}

export default App;
