const vscode = require("vscode");
const highlight = require("../lib/highlight");

const activate = context => {
  highlight();
  vscode.window.onDidChangeActiveTextEditor(highlight, null, context.subscriptions);
  vscode.workspace.onDidChangeTextDocument(highlight, null, context.subscriptions);
};

const deactivate = () => {};
exports.activate = activate;
exports.deactivate = deactivate;
