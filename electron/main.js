const { app, BrowserWindow } = require('electron');
const path = require('path');
# Créer electron/main.js
Set-Content -Path "electron-builder.config.js" -Value @"
{
  `"appId`": `"com.weatherpro.app`",
  `"productName`": `"WeatherPro`",
  `"directories`": {
    `"output`": `"dist`"
  },
  `"files`": [
    `"build/**/*`",
    `"electron/**/*`"
  ],
  `"win`": {
    `"target`": `"nsis`",
    `"icon`": `"public/favicon.ico`"
  }
}
"@ -Encoding UTF8