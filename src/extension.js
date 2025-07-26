// To test this extension locally:
// 1. Open this folder in VS Code.
// 2. Run 'npm install' in the terminal (install dependencies, e.g., prettier).
// 3. Press F5 to launch a new Extension Development Host window.
// 4. In the new window, open a file, copy some HTML, and press Ctrl+Shift+V (or run 'Paste as React' from the Command Palette).

const vscode = require('vscode');
const htmlToReact = require('./htmlToReact');

function activate(context) {
    // Paste from clipboard as React
    let pasteDisposable = vscode.commands.registerCommand('extension.pasteAsReact', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        try {
            const html = await vscode.env.clipboard.readText();
            if (!html.trim()) {
                vscode.window.showInformationMessage('Clipboard is empty.');
                return;
            }
            if (!html.trim().startsWith('<')) {
                vscode.window.showInformationMessage('Clipboard does not contain HTML.');
                return;
            }

            // Convert HTML to React
            let reactCode = htmlToReact(html);

            // Format with Prettier if available
            try {
                const prettier = require('prettier');
                reactCode = prettier.format(reactCode, { parser: "babel" });
            } catch (e) {
                vscode.window.showInformationMessage('Prettier not installed, skipping formatting.');
            }

            await editor.edit(editBuilder => {
                // Insert at cursor position
                editBuilder.insert(editor.selection.active, reactCode);
            });
            vscode.window.showInformationMessage('Pasted as React code.');
        } catch (err) {
            vscode.window.showErrorMessage('Error converting clipboard HTML: ' + err.message);
        }
    });

    // Convert selected HTML to React and replace selection
    let convertSelectionDisposable = vscode.commands.registerCommand('extension.convertSelectionToReact', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active editor found.');
            return;
        }

        // Only run in JS or JSX files
        const allowedLangs = ['javascript', 'javascriptreact'];
        const docLang = editor.document.languageId;
        if (!allowedLangs.includes(docLang)) {
            vscode.window.showInformationMessage('This command only works in JS/JSX files.');
            return;
        }

        try {
            const selection = editor.selection;
            let selectedText = editor.document.getText(selection);

            // If nothing is selected, use the current line
            if (!selectedText.trim()) {
                const lineText = editor.document.lineAt(selection.active.line).text;
                selectedText = lineText;
            }

            if (!selectedText.trim()) {
                vscode.window.showInformationMessage('No HTML code selected or at cursor.');
                return;
            }

            let reactCode = htmlToReact(selectedText);

            try {
                const prettier = require('prettier');
                reactCode = prettier.format(reactCode, { parser: "babel" });
            } catch (e) {
                vscode.window.showInformationMessage('Prettier not installed, skipping formatting.');
            }

            await editor.edit(editBuilder => {
                if (selection.isEmpty) {
                    // Replace current line if nothing selected
                    const line = editor.document.lineAt(selection.active.line);
                    editBuilder.replace(line.range, reactCode);
                } else {
                    editBuilder.replace(selection, reactCode);
                }
            });
            vscode.window.showInformationMessage('Selection converted to React code.');
        } catch (err) {
            vscode.window.showErrorMessage('Error converting selection: ' + err.message);
        }
    });

    context.subscriptions.push(pasteDisposable);
    context.subscriptions.push(convertSelectionDisposable);
}

function deactivate() { }

module.exports = {
    activate,
    deactivate
};