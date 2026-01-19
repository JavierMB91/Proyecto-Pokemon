const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, 'img/favicon.png'), // Icono de la ventana
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false // IMPORTANTE: Permite cargar nav.html y footer.html localmente
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