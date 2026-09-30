import {Timer} from "./Timer.tsx";

function App() {
    const time = new Date();

    time.setSeconds(time.getSeconds() + 300);


  return (
    <div>
        <Timer expiryTimestamp={time} />
    </div>
  )
}

export default App
