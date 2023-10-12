import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import FlashCard from "./components/FlashCard";

function App() {

  return (
    <div className="container">
      <div className="py-3">
        <h1 className="text-center text-2xl">Korean Vocab Practice</h1>
      </div>
      <FlashCard />
    </div>
  )
}

library.add(fab, fas, far);
export default App;