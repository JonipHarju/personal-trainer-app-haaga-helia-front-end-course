import { Outlet } from "react-router";
import PageWrapper from "./components/PageWrapper";
import Navbar from "./components/Navbar";

function App() {
  return (
    <PageWrapper>
      <Navbar />
      <Outlet />
    </PageWrapper>
  );
}

export default App;
