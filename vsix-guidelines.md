# HTML to React Converter VS Code Extension

This extension converts HTML code to React JSX in VS Code.

## How to Package as a VSIX File

Follow these steps to package this project as a `.vsix` file for installation or distribution:

### 1. Prerequisites

- Node.js and npm installed
- VS Code Extension Manager (`vsce`) installed globally

```sh
npm install -g vsce
```

### 2. Set PowerShell Execution Policy (Windows Only)

If you get a script execution error, run PowerShell as Administrator and execute:

```sh
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

This allows running scripts like `vsce.ps1`.

### 3. Ensure Required Files and Fields

- Make sure your `package.json` includes:
  - `"categories"` (e.g., `"Formatters"`)
  - `"repository"` field
- Add a license file (`LICENSE.md`, `LICENSE.txt`, or `LICENSE`)
- Ensure your extension entry point is correct (e.g., `main: "./src/extension.js"` in `package.json`)
- Webpack config should have `entry: './src/extension.js'`

### 4. Install Dependencies

```sh
npm install
```

### 5. Build the Extension

```sh
npm run compile
```

### 6. Package as VSIX

```sh
vsce package
```

This will generate a `.vsix` file in your project directory.

### 7. Install the VSIX in VS Code

- Open VS Code
- Go to Extensions view
- Click the three-dot menu > "Install from VSIX..."
- Select your `.vsix` file

## Troubleshooting

- **Script execution error:** See step 2 above.
- **Missing license warning:** Add a license file.
- **Missing repository warning:** Add `"repository"` to `package.json`.
- **Webpack entry error:** Ensure `webpack.config.js` uses the correct entry point.

## Resources

- [VSCE Documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [About Execution Policies](https://go.microsoft.com/fwlink/?LinkID=135170)
