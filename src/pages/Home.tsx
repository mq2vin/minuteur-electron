import {useState} from "react";

type time = "hour" | "minute" | "second"

export function Home() {
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const handleHourChange = (newHour: number) => {
        if (newHour < 0){
            setHour(23)
        }
        else if (newHour > 23){
            setHour(0)
        }
        else{
            setHour(newHour)
        }
    }

    const handleMinuteAndSecondChange = (newMinute: number, time: time) => {
        if (newMinute < 0){
            if (time == "minute") setMinute(59); else setSeconds(59)
        }
        else if (newMinute > 59){
            if (time == "minute") setMinute(0); else setSeconds(0)
        }
        else{
            if (time == "minute") setMinute(newMinute); else setSeconds(newMinute)
        }
    }

    return (
        <div>
            <div style={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className={"timer-parent"} style={{textAlign: 'center', margin: '10px'}}>
                    <button onClick={()=> handleHourChange(hour + 1)}>▲</button>
                    <button onClick={()=> handleMinuteAndSecondChange(minute + 1, "minute")}>▲</button>
                    <button onClick={()=> handleMinuteAndSecondChange(seconds + 1, "second")}>▲</button>
                    <div><h1>{hour}</h1> h</div>
                    <div><h1>{minute}</h1> m</div>
                    <div><h1>{seconds}</h1> s</div>
                    <button onClick={()=> handleHourChange(hour - 1)}>▼</button>
                    <button onClick={()=> handleMinuteAndSecondChange(minute - 1, "minute")}>▼</button>
                    <button onClick={()=> handleMinuteAndSecondChange(seconds - 1, "second")}>▼</button>
                </div>
            </div>
            <div style={{textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
                <button
                    disabled={hour == 0 && minute == 0 && seconds == 0}
                    onClick={() => {
                        window.electronAPI.openWindow(`/timer/${hour * 3600 + minute * 60 + seconds}`)
                        window.electronAPI.close()
                    }}
                >Lancer</button>
            </div>
        </div>

    )
}