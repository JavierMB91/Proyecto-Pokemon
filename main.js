const { app, BrowserWindow, dialog } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

// --- CONFIGURACIÓN DE AUTO-UPDATE PARA REPO PRIVADO ---
// IMPORTANTE: Reemplaza 'TU_GITHUB_TOKEN' con tu token real de GitHub.
autoUpdater.requestHeaders = { 
  "Authorization": "token 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",
  "Accept": "application/vnd.github.v3.raw" 
};
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.allowPrerelease = true; // Permite actualizaciones aunque sean 'pre-releases'
autoUpdater.forceDevUpdateConfig = true; // Fuerza a la app a que use la API en lugar de las URLs directas

// Eventos de log para depuración (opcional)
autoUpdater.on('checking-for-update', () => console.log('Buscando actualizaciones...'));
autoUpdater.on('update-available', () => console.log('Actualización disponible.'));
autoUpdater.on('error', (err) => {
    console.error('Error en actualización:', err);
    dialog.showErrorBox('Error de Actualización', 'Hubo un problema buscando actualizaciones: ' + (err.message || err));
});

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        title: `PokeMMO Tracker v${app.getVersion()}`, // Muestra la versión en la barra de título
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
    
    // Evita que el título del HTML sobrescriba el título de la ventana (para que se vea la versión)
    win.on('page-title-updated', (e) => {
        e.preventDefault();
    });

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