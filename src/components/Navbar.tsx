import { Link } from "react-router";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <nav className=" bg-foreground py-2 px-5 my-2 rounded-3xl flex justify-center gap-10">
      {/* the Button components link variant has default text color "primary" 
         so need to overwrite here for each one rather than declaring the color above in the <nav> tag*/}
      <Button className="text-background/90" variant={"link"}>
        <Link to="/">Frontpage</Link>
      </Button>
      <Button variant={"link"} className="text-background/90">
        <Link to="/customers">Customers</Link>
      </Button>
      <Button className="text-background/90" variant={"link"}>
        <Link to="/training">Training</Link>
      </Button>
      <Button className="text-background/90" variant={"link"}>
        <Link to="/calendar">Calendar</Link>
      </Button>

      <ThemeToggle />
    </nav>
  );
}
