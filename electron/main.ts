import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Chemins fournis par vite-plugin-electron en dev / prod
process.env.APP_ROOT = path.join(__dirname, '..')
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

let win: BrowserWindow | null = null

function createWindow(route = "/", options: Electron.BrowserWindowConstructorOptions = {}) {
    win = new BrowserWindow({
        width: 1000,
        height: 400,
        resizable: false,
        frame: false,
        transparent: true, // coins arrondis + verre Aero de 7.css
        webPreferences: {
            preload: path.join(MAIN_DIST, 'preload.mjs'),
            contextIsolation: true,
            nodeIntegration: false,
        },
        ...options
    })

    if (VITE_DEV_SERVER_URL) {
        win.loadURL(`${VITE_DEV_SERVER_URL}#${route}`)
        //win.webContents.openDevTools()
    } else {
        win.loadFile(path.join(RENDERER_DIST, 'index.html'),  { hash: route })
    }

    // On prévient le renderer quand l'état maximisé change (pour changer l'icône du bouton)
    win.on('maximize', () => win?.webContents.send('window:maximized', true))
    win.on('unmaximize', () => win?.webContents.send('window:maximized', false))
}

function getWin(e: Electron.IpcMainInvokeEvent | Electron.IpcMainEvent) {
    return BrowserWindow.fromWebContents(e.sender)
}

// Exemple d'IPC : le renderer peut demander la version de l'app
ipcMain.handle('app:getVersion', () => app.getVersion())

// Contrôles de la fenêtre, appelés depuis notre barre de titre custom
ipcMain.on('window:minimize', (event) => getWin(event)?.minimize())
ipcMain.on('window:maximize', (event) => {
    const win = getWin(event)
    if (win?.isMaximized()) {
        win.unmaximize()
    } else {
        win?.maximize()
    }
})
ipcMain.on('window:close', (event) => getWin(event)?.close())

ipcMain.handle('open-window', (_e, route: string) => {
    createWindow(route, { width: 1000, height: 400 })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
        win = null
    }
})

app.whenReady().then(() => createWindow('/', { width: 200, height: 200 }))