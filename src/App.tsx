import PageWrapper from "./components/PageWrapper";
import { Button } from "./components/ui/button";

function App() {
  return (
    <PageWrapper>
      <div className="flex mt-52 w-full flex-col items-center justify-center">
        <Button variant={"default"} size={"lg"}>
          Start training
        </Button>
      </div>
    </PageWrapper>
  );
}

export default App;
