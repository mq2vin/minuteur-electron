import {useTimer} from "react-timer-hook";
import {useEffect, useState} from "react";

export function Timer({ expiryTimestamp }: { expiryTimestamp: Date}) {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called'),  interval: 20 });

    const [percentage, setPercentage] = useState<number>(0)



    useEffect(()=>{

    })

    return (
        <div style={{textAlign: 'center'}}>
            <h1>react-timer-hook </h1>
            <p>Timer Demo</p>
            <div style={{fontSize: '100px'}}>
                {/*<span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>:<span>{milliseconds}</span>*/}
                <span>{hours} h </span>:<span> {minutes} min </span>:<span> {seconds} s</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={start}>Start</button>
            <button onClick={pause}>Pause</button>
            <button onClick={resume}>Resume</button>
            <button onClick={() => {
                // Restarts to 5 minutes timer
                const time = new Date();
                time.setSeconds(time.getSeconds() + 300);
                restart(time)
            }}>Restart
            </button>

            <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={80}>
                <div style={{width:  percentage + "%" }}></div>
            </div>
        </div>
    )
}