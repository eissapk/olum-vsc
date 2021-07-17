const vscode = require("vscode");

// helper
let color = "#f3b959"; // component tag color e.g. <App/> or <App-Nav/>
const decType = vscode.window.createTextEditorDecorationType({ color }); // must be global for acurate coloring
const isObj = obj => !!(obj !== null && typeof obj === "object");
const isFullArr = arr => !!(isObj(arr) && Array.isArray(arr) && arr.length);
const isDef = val => !!(val !== undefined && val !== null);
const isHTML = editor => editor && editor.document && (/html/i.test(editor.document.languageId) ? true : false);

const highlighter = () => {
  const editor = vscode.window.activeTextEditor;
  if (isHTML(editor)) {
    const src = editor.document.getText();
    let chars = [];
    let linesArr = src.split("\n");

    // detect template tag
    let delimiters = [];
    const openTempRegex = new RegExp(`<template>`, "gi");
    const endTempRegex = new RegExp(`<\\/template>`, "gi");
    linesArr.find((item, index) => (openTempRegex.test(item) ? delimiters.push(index) : null));
    linesArr.find((item, index) => (endTempRegex.test(item) ? delimiters.push(index) : null));
    // console.warn(linesArr);
    // console.warn(delimiters);

    // if we are inside template tag
    if (delimiters.length === 2) {
      const [ind1, ind2] = delimiters;
      const newLinesArr = linesArr.map((item, index) => {
        if (index >= ind1 && index <= ind2) return item;
        else return (item = null);
      });
      // console.warn(newLinesArr);

      if (isFullArr(newLinesArr)) {
        newLinesArr.forEach((lineStr, lineNum) => {
          const regex = new RegExp(`(?<=<)[A-Z]([^/>]+)(?=\\/>)`, `g`); // detect <App/> or <App-Nav/>

          if (isDef(lineStr) && regex.test(lineStr)) {
            const totalLength = lineStr.replace(/\s+$/gm, "").length; // remove right space
            const actualStrLength = lineStr.trim().length;
            const tagNameLength = lineStr.replace(/\<|\>|\//g, "").trim().length;
            const start = lineStr[totalLength - actualStrLength];
            const startIndex = lineStr.indexOf(start) + 1;
            let endIndex = startIndex + tagNameLength;
            const range = new vscode.Range(new vscode.Position(lineNum, startIndex), new vscode.Position(lineNum, endIndex));
            chars.push(range);

            // console.warn({ lineStr, lineNum });
            // console.warn({totalLength});
            // console.warn({actualStrLength});
            // console.warn({tagNameLength});
            // console.warn({start});
            // console.warn({startIndex});
            // console.warn({endIndex});
            // console.warn({chars});
          }
        });
      }
    }

    editor.setDecorations(decType, chars);
  }
};

const activate = context => {
  highlighter();
  // EVENTS
  vscode.window.onDidChangeActiveTextEditor(() => highlighter(), null, context.subscriptions);
  vscode.workspace.onDidChangeTextDocument(() => highlighter(), null, context.subscriptions);
};

const deactivate = () => {};
exports.activate = activate;
exports.deactivate = deactivate;