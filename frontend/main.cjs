const { app, BrowserWindow } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        fullscreen: true,
        kiosk: true, // for true exam lock
        webPreferences: { nodeIntegration: false, sandbox: true }
    });

    win.setContentProtection(true); // KEY: blocks PrintScreen/Snip/OBS/PowerToys
    win.removeMenu();
    win.loadURL('http://localhost:5173'); // Vite's default development server URL

    win.on('close', () => app.quit());
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());