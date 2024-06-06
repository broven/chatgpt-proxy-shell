const { app, BrowserWindow, session, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: false,
        }
    });
  //   // create setting window
  //     const settingWindow = new BrowserWindow({
  //   // 设置窗口的配置项
  //   frame: false,  // 不显示窗口边框
  //   transparent: false,  // 设置窗口背景透明
  //   width: 300,
  //   height: 200,
  //   x: mainWindow.getBounds().width - 300,  // 窗口位于主窗口的右下角
  //   y: mainWindow.getBounds().height - 200,
  //   parent: mainWindow,  // 将设置窗口作为主窗口的子窗口
  //   modal: true,  // 设置为模态窗口
  //   show: false  // 初始化时不显示设置窗口
  // })
  // // 创建一个按钮，点击时打开设置窗口
  // const btnSetting = new BrowserWindow({
  //   // 按钮配置项
  //   width: 80,
  //   height: 30,
  //   x: mainWindow.getBounds().width,  // 按钮位于主窗口的右下角
  //   y: mainWindow.getBounds().height,
  //   parent: mainWindow,  // 将按钮作为主窗口的子窗口
  //   frame: false,  // 不显示按钮边框
  //   alwaysOnTop: true,  // 按钮始终在最上层
  //   transparent: true,  // 设置按钮背景透明
  //   backgroundColor: '#00000000',  // 设置按钮背景颜色透明
  //   hasShadow: false,  // 去除按钮的阴影
  //   webPreferences: {
  //     nodeIntegration: true
  //   }
  // })

    // 加载网页
    // btnSetting.loadFile('setting-entry.html')
    mainWindow.loadURL('https://chatgpt.com/');

    // 设置代理
    const proxyRules = 'http://127.0.0.1:6152';

    console.log('Setting proxy with following rules:', proxyRules);

    const filter = {
        urls: ['*://*/*']
    };

    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
        details.requestHeaders['Proxy'] = proxyRules;
        callback({ requestHeaders: details.requestHeaders });
    });

    session.defaultSession.setProxy({ proxyRules })
        .then(() => {
            console.log('Proxy has been set successfully.');
        })
        .catch((err) => {
            console.error('Failed to set proxy:', err);
        });
}

// Electron 启动时调用
app.on('ready', createWindow);

// 当所有窗口都被关闭时退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
