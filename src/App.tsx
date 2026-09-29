import {Timer} from "./Timer.tsx";

function App() {
    const time = new Date();

    time.setSeconds(time.getSeconds() + 300);


  return (
    <div>
        <Timer expiryTimestamp={time} />


        <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={80}>
            <div style={{width: "80%"}}></div>
        </div>
    </div>
  )
}

export default App
