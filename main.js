const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'img/favicon.png'), // Icono de la ventana
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });

    // Carga tu archivo principal. 
    // Apunta a la carpeta api/ donde tienes tus HTMLs
    win.loadFile('api/index.html'); 
    
    // Opcional: Ocultar la barra de menú predeterminada (Archivo, Editar, etc.)
    win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
    createWindow();
    
    // Buscar actualizaciones automáticamente al iniciar (solo en producción)
    if (app.isPackaged) {
        autoUpdater.checkForUpdatesAndNotify();
    }

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// --- EVENTOS DEL AUTO-UPDATER ---

autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox({
        type: 'info',
        title: 'Actualización lista',
        message: `La versión ${info.version} se ha descargado. ¿Quieres reiniciar ahora para instalarla?`,
        buttons: ['Reiniciar', 'Más tarde']
    }).then((result) => {
        if (result.response === 0) { // Si pulsa "Reiniciar"
            autoUpdater.quitAndInstall();
        }
    });
});