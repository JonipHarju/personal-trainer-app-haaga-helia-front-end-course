import { Link, Outlet } from "react-router";
import PageWrapper from "./components/PageWrapper";

function App() {
  return (
    <PageWrapper>
      <nav>
        <Link to="/">Frontpage</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/training">Training</Link>
      </nav>
      <Outlet />
    </PageWrapper>
  );
}

export default App;
