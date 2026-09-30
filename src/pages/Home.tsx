export function Home() {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={()=> {
                window.electronAPI.openWindow("/timer/60")
                //window.electronAPI.close()
            }}>Timer</button>
        </div>
    )
}