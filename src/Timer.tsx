import {useTimer} from "react-timer-hook";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

/*
interface TimerProps {
    durationSeconds: number
}
*/

export function Timer() {
    const { duration } = useParams();


    const [expiry, setExpiry] = useState(() => {
        const t = new Date();
        t.setSeconds(t.getSeconds() + Number(duration));
        return t;
    });

    const {
        seconds,
        minutes,
        hours,
        isRunning,
        pause,
        resume,
        restart,
    } = useTimer({ expiryTimestamp: expiry, onExpire: () => console.warn('onExpire called'),  interval: 20 });


    const [totalDuration, setTotalDuration] = useState(Number(duration));


    const remaining = hours * 3600 + minutes * 60 + seconds;
    const percentage = Math.min(100, Math.max(0, (1 - remaining / totalDuration) * 100));


    const handleRestart = (newSeconds: number) => {
        const t = new Date();
        t.setSeconds(t.getSeconds() + newSeconds);
        setExpiry(t);
        setTotalDuration(newSeconds);
        restart(t);
    };

    const toggleTimer = () => {
        if (isRunning) {
            pause();
        } else {
            resume();
        }
    }

    useEffect(()=>{
        if(percentage==100){
            //juste pour tester
            //window.electronAPI.close()
        }
    })

    if (!duration) {
        return <div>{duration} Invalid duration</div>;
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1> Minuteur </h1>
            <p>Tic Tac</p>
            <div style={{fontSize: '100px'}}>
                {/*<span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>:<span>{milliseconds}</span>*/}
                <span>{hours} h </span>:<span> {minutes} min </span>:<span> {seconds} s</span>
            </div>
            <p>{isRunning ? 'Running' : 'Not running'}</p>
            <button onClick={toggleTimer}>{isRunning ? "Pause" : "Resume"}</button>
            <button onClick={() => handleRestart(Number(duration))}>Restart
            </button>

            <div role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={80} style={{margin: '30px 50px 0px 50px'}}>
                <div style={{width:  percentage + "%" }}></div>
            </div>
        </div>
    )
}