import type {PropsWithChildren} from 'react'
//import {type ReactNode} from "react";
import '7.css'

interface WindowProps {
    name: string
}

declare global {
    interface Window {
        electronAPI: {
            getVersion: () => Promise<string>
            minimize: () => void
            maximize: () => void
            close: () => void
            onMaximizedChange: (callback: (isMaximized: boolean) => void) => () => void
        }
    }
}

//export function Window({ children }: { children?: ReactNode }) {
export function Window({ children, name }: PropsWithChildren<WindowProps>) {

    return (
        <div className="window active app-window">
            <div className="title-bar">
                <div className="title-bar-text">{name}</div>
                <div className="title-bar-controls">
                    <button onClick={() => window.electronAPI.minimize()} aria-label="Minimize"></button>
                    <button onClick={() => window.electronAPI.maximize()} aria-label="Maximize"></button>
                    <button onClick={() => window.electronAPI.close()} aria-label="Close"></button>
                </div>
            </div>
            <div className="window-body has-space app-window-body">
                {children}
            </div>
        </div>
    )
}