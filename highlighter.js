const vscode = require("vscode");

// highlight these components tags <App/> or <App-Nav/> in html files only 
const regex = new RegExp("(?<=<)[A-Z]([^/>]+)(?=\/>)", "g");
const color = "#f3b959";
const isHTML = editor => {
  const arr = editor.document.fileName.trim().split(".");
  if (arr.length) {
    const ext = arr[arr.length - 1];
    if (/html/i.test(ext)) return true;
  }
  return false;
};

const highlighter = () => {
  const editor = vscode.window.activeTextEditor;
  if (isHTML(editor)) {
    const src = editor.document.getText();
    let match;
    const tagInfo = {
      decChar: {
        chars: [],
        decorator: vscode.window.createTextEditorDecorationType({ color }),
      },
    };
    vscode.window.setStatusBarMessage("");

    while (match = regex.exec(src)) {
      const splited = match[0].split('"');
      let single_lengths = 0;
      if (splited.length) {
        splited.forEach((single, i) => {
          if (i % 2 === 0) {
            const doc = editor.document;
            const start = doc.positionAt(match.index + single_lengths);
            const end = doc.positionAt(match.index + single_lengths + single.length);
            const range = new vscode.Range(start, end);
            tagInfo.decChar.chars.push(range);
          }
          single_lengths += single.length + 1;
        });
      }
    }

    editor.setDecorations(tagInfo.decChar.decorator, tagInfo.decChar.chars);
  }
};

const activate = context => {
  // init
  highlighter();

  // EVENTS
  vscode.window.onDidChangeActiveTextEditor(editor => highlighter(), null, context.subscriptions);
  vscode.workspace.onDidChangeTextDocument(e => highlighter(), null, context.subscriptions);
};

const deactivate = () => {};
exports.activate = activate;
exports.deactivate = deactivate;