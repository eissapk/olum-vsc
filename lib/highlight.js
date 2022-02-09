const vscode = require("vscode");
const { isObj, isFullArr, isHTML, isDef } = require("../lib/helpers");
const getRange = require("../lib/getRange");
const regex = require("../lib/regex");
const colors = require("../lib/colors");

// must be global for acurate coloring
const decType = vscode.window.createTextEditorDecorationType({ color: colors.comp });

const highlight = () => {
  const editor = vscode.window.activeTextEditor;
  if (isHTML(editor)) {
    let chars = [];
    const content = editor.document.getText();
    const lines = content.split("\n");
    if (isFullArr(lines)) {
      // console.log({ lines });
      lines.forEach((line, index) => {
        // regex must be inside the loop
        const ifRegex = new RegExp("<(if)([\\s\\S]*?)>|<\\/(if)>", "g");
        const elseIfRegex = new RegExp("<(else-if)([\\s\\S]*?)>|<\\/(else-if)>", "g");
        const elseRegex = new RegExp("<(else)([\\s\\S]*?)>|<\\/(else)>", "g");
        const forRegex = new RegExp("<(for)([\\s\\S]*?)>|<\\/(for)>", "g");
        const showRegex = new RegExp("<(show)([\\s\\S]*?)>|<\\/(show)>", "g");
        const compRegex = new RegExp("<([A-Z][^\\/>]+)\\/>", "g");
        const compRegex2 = new RegExp("<([A-Z][^\\/>]+)>|<\\/([A-Z][^\\/>]+)>", "g");
        
        if (compRegex.test(line)) {
          const range = getRange(line, index, "comp");
          if (range) chars = chars.concat(range);
        }
        if (compRegex2.test(line)) {
          const range = getRange(line, index, "comp2");
          if (range) chars = chars.concat(range);
        }
        if (ifRegex.test(line)) {
          const range = getRange(line, index, "if");
          if (range) chars = chars.concat(range);
        }
        if (elseIfRegex.test(line)) {
          const range = getRange(line, index, "else-if");
          if (range) chars = chars.concat(range);
        }
        if (elseRegex.test(line)) {
          const range = getRange(line, index, "else");
          if (range) chars = chars.concat(range);
        }
        if (forRegex.test(line)) {
          const range = getRange(line, index, "for");
          if (range) chars = chars.concat(range);
        }
        if (showRegex.test(line)) {
          const range = getRange(line, index, "show");
          if (range) chars = chars.concat(range);
        }
      });
    }

    editor.setDecorations(decType, chars);
  }
};

module.exports = highlight;
