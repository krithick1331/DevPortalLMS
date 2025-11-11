const { app, BrowserWindow, ipcMain, protocol } = require('electron');
const path = require('path');

let mainWindow = null;

// Function to create secure practice window
function createWindow(lessonId) {
    // Create browser window with security settings
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        fullscreen: true,
        kiosk: true, // Prevents user from exiting easily
        webPreferences: {
            nodeIntegration: false, // Security: disable Node.js in renderer
            contextIsolation: true, // Security: isolate context
            sandbox: true, // Security: enable sandbox
            preload: path.join(__dirname, 'preload.js') // Optional: for IPC
        }
    });

    // CRITICAL: Enable content protection to block screenshots
    mainWindow.setContentProtection(true);

    // Remove menu to prevent developer tools and other options
    mainWindow.removeMenu();

    // Load the app - if lessonId provided, go straight to that lesson
    const url = lessonId
        ? `http://localhost:5173/practice/${lessonId}`
        : 'http://localhost:5173';

    mainWindow.loadURL(url);

    // Prevent new windows and popups
    mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));

    // Prevent navigation outside of app
    mainWindow.webContents.on('will-navigate', (e, url) => {
        if (!url.startsWith('http://localhost:5173')) {
            e.preventDefault();
        }
    });

    // Handle window close
    mainWindow.on('close', () => {
        mainWindow = null;
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
}

app.whenReady().then(() => {
    // Register custom protocol for secure app launching
    if (process.defaultApp) {
        protocol.registerFileProtocol('myapp', (request, callback) => {
            const url = request.url.substr('myapp://'.length);
            const lessonId = url.split('/')[1];
            createWindow(lessonId);
        });
    }
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        createWindow();
    }
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());