const path = require('path');

function createMenu(app, mainWindow) {
    const template = [{
        label: 'File',
        submenu: [
            {
                label: 'New Note',
                accelerator: 'CmdOrCtrl+N',
                click: () => {
                    mainWindow.webContents.send('createNoteRequest');
                }
            }
        ]
    }, {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
            { role: 'delete' },
            { role: 'selectall' }
        ]
    }, {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click:  (item, focusedWindow) => {
                    mainWindow.loadURL(url.format({
                        pathname: path.join(__dirname, '../../dist/index.html'),
                        protocol: 'file',
                        slashes: true
                    }));
                }
            }, {
                type: 'separator'
            }, { 
                role: 'resetzoom'
            }, { 
                role: 'zoomin'
            }, { 
                role: 'zoomout'
            }, { 
                type: 'separator'
            }, { 
                role: 'togglefullscreen'
            }
        ]
    }, {
        role: 'window',
        submenu: [
            {
                role: 'minimize'
            }, {
                role: 'close'
            }
        ]
    }, {
        label: 'Dev',
        submenu: [{
            label: 'Reload UI',
            click: () => {
                mainWindow.loadURL(url.format({
                    pathname: path.join(__dirname, '../../dist/index.html'),
                    protocol: 'file',
                    slashes: true
                }));
            }
        }, {
            label: 'Toggle Developer Tools',
            accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
            click: (item, focusedWindow) => {
                if (focusedWindow) {
                    focusedWindow.webContents.toggleDevTools();
                }
            }
        }]
    }, {
      role: 'help',
      submenu: [
        {
            label: 'Learn More',
            click: () => { /* At some point open the website here. */ }
        }
      ]
    }];

    if (process.platform === 'darwin') {
        const name = app.getName();
        template.unshift({
            label: name,
            submenu: [
                { role: 'about' },
                { type: 'separator' },
                { role: 'services', submenu: [] },
                { type: 'separator' },
                { role: 'hide' },
                { role: 'hideothers' },
                { role: 'unhide' },
                { type: 'separator' },
                { role: 'quit' },
            ]
        });

        template[4].submenu = [
            {
              label: 'Close',
              accelerator: 'CmdOrCtrl+W',
              role: 'close'
            }, {
              label: 'Minimize',
              accelerator: 'CmdOrCtrl+M',
              role: 'minimize'
            }, {
              label: 'Zoom',
              role: 'zoom'
            }, {
              type: 'separator'
            }, {
              label: 'Bring All to Front',
              role: 'front'
            }
        ];
    }

    return template;
}

module.exports = {
    createMenuTemplate: createMenu
};
