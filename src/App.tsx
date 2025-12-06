import { Outlet } from "react-router";
import PageWrapper from "./components/PageWrapper";
import Navbar from "./components/Navbar";

function App() {
  return (
    <PageWrapper>
      {/* <nav>
        <Link to="/">Frontpage</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/training">Training</Link>
      </nav> */}
      <Navbar />
      <Outlet />
      <p>Moi</p>
    </PageWrapper>
  );
}

export default App;
