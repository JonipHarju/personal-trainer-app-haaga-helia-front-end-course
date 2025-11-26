import { Button } from "./ui/button";

export default function FrontPage() {
  return (
    <div className="flex mt-52 w-full flex-col items-center justify-center">
      <Button variant={"default"} size={"lg"}>
        Start training
      </Button>
    </div>
  );
}
