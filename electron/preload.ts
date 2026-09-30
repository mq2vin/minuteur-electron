import { contextBridge, ipcRenderer } from 'electron'

// Expose une API limitée et sécurisée au renderer (window.electronAPI)
contextBridge.exposeInMainWorld('electronAPI', {
    getVersion: () => ipcRenderer.invoke('app:getVersion'),
    minimize: () => ipcRenderer.send('window:minimize'),
    maximize: () => ipcRenderer.send('window:maximize'),
    close: () => ipcRenderer.send('window:close'),
    openWindow: (route: string) => ipcRenderer.invoke('open-window', route),
    onMaximizedChange: (callback: (isMaximized: boolean) => void) => {
        const listener = (_: unknown, isMaximized: boolean) => callback(isMaximized)
        ipcRenderer.on('window:maximized', listener)
        return () => ipcRenderer.removeListener('window:maximized', listener)
    },
})