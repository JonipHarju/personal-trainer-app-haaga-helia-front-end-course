import { Link } from "react-router";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="flex w-full justify-center">
      {/* the Button components link variant has default text color "primary" 
         so need to overwrite here for each one rather than declaring the color above in the <nav> tag*/}
      <div className="hidden md:flex bg-foreground py-2 px-2 my-2 rounded-3xl justify-center gap-10">
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
        <Button className="text-background/90" variant={"link"}>
          <Link to="/statistics">Statistics</Link>
        </Button>
        <ThemeToggle />
      </div>
      <div className="w-full  md:hidden flex justify-end ">
        <button
          className="mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <Menu className="w-10 h-10" />
        </button>
      </div>

      {menuOpen && (
        <div className="flex fixed inset-0 bg-background z-50">
          <button
            className="absolute top-[-0.90rem] right-4 text-foreground text-6xl"
            onClick={() => setMenuOpen(false)}
          >
            x
          </button>
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold"
            >
              Frontpage
            </Link>
            <Link
              to="/customers"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold"
            >
              Customers
            </Link>
            <Link
              to="/training"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold"
            >
              Training
            </Link>
            <Link
              to="/calendar"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold"
            >
              Calendar
            </Link>
            <Link
              to="/statistics"
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold"
            >
              Statistics
            </Link>
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
