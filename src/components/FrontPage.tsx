import { Link } from "react-router";
import { Button } from "./ui/button";

export default function FrontPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8">
      <h1 className="text-4xl font-bold text-primary">
        Personal Trainer Website
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl text-center">
        Welcome! Manage your customers in the customers page. Manage trainigs in
        the training page or just look at the schedule on calendar page
      </p>
      <div className="flex flex-row gap-4 justify-center mt-8">
        <Button variant="outline" size="lg" className="w-30">
          <Link to="/customers">Customers</Link>
        </Button>
        <Button variant="default" size="lg" className="w-30">
          <Link to="/training">Training</Link>
        </Button>
        <Button className="w-30" variant="secondary" size="lg">
          <Link to="/calendar">Calendar</Link>
        </Button>
      </div>
    </div>
  );
}
