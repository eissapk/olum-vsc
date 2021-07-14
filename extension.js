// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const tagInfos = [
	{decChar: undefined, tagName: "template", tagColor: "#f3b959"},
];

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Also trigger an update on changing the editor
    vscode.window.onDidChangeActiveTextEditor(editor => {
        decorate();
    }, null, context.subscriptions);
    // And when modifying the document
    vscode.workspace.onDidChangeTextDocument(event => {
        decorate();
    }, null, context.subscriptions);
    decorate();
    // functions
    function decorate() {
		var editor = vscode.window.activeTextEditor;
        var src = editor.document.getText();
        tagInfos.forEach(function(tagInfo){
            decorate_inner(tagInfo, editor, src);
        });
	}
	function decorate_inner(tagInfo, editor, src) {
		vscode.window.setStatusBarMessage('');
		if (tagInfo.decChar != undefined) {
			tagInfo.decChar.decorator.dispose();
		}
		var regex = new RegExp('(?<=<)[A-Z]([^\/>]+)(?=\/>)', 'g');
		var match;
		var inComment = false;
		tagInfo.decChar = {
			'chars': [],
			'decorator': vscode.window.createTextEditorDecorationType({
				'color': tagInfo.tagColor
			})
		};
		while (match = regex.exec(src)) {
			var startPos = editor.document.positionAt(match.index);
			var endPos = editor.document.positionAt(match.index + match[0].length);
			var range = new vscode.Range(startPos, endPos);
			var splited = match[0].split('"');
			//コメントだったら飛ばす
			if(match[0] === "<!--"){
				//console.log("コメント開始");
				inComment = true;
				continue;
			}
			if(match[0] === "-->"){
				//console.log("コメント終了");
				inComment = false;
				continue;
			}
			if(inComment === true){
				continue;
			}
			var single_lengths = 0;
			if(splited.length){
				splited.forEach(function(single, i){
					//偶数だったら
					if(i % 2 === 0){
						var startPos2 = editor.document.positionAt(match.index + single_lengths);
						var endPos2 = editor.document.positionAt(match.index + single_lengths + single.length);
						var range2 = new vscode.Range(startPos2, endPos2);
						tagInfo.decChar.chars.push(range2);
					}
					single_lengths += single.length + 1;
				});
			}
		}
		editor.setDecorations(tagInfo.decChar.decorator, tagInfo.decChar.chars);
	}
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;