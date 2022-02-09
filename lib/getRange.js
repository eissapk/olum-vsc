const vscode = require("vscode");
const { isUpper } = require("./helpers");
function getRange(line, index, type) {
  let arr = [];
  if (type === "comp") {
    const startIndex = line.indexOf("<");
    const char = line[startIndex + 1];
    let compName = line.match(/<([A-Z][^\/>]+)\/>/g);
    compName = Array.isArray(compName) && compName.length ? compName[0].trim() : false;
    if (startIndex != -1 && isUpper(char) && compName) {
      compName = compName.split(" ");
      compName = compName.length === 1 ? compName[0].replace(/\<|\>|\//g, "").trim() : compName[0].slice(1).trim();
      const start = startIndex + 1;
      const end = startIndex + compName.length + 1;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
  } else if (type === "comp2") {
    // opening
    const startIndex = line.indexOf("<");
    const char = line[startIndex + 1];
    let compName = line.match(/<([A-Z][^\/>]+)>/g);
    compName = Array.isArray(compName) && compName.length ? compName[0].trim() : false;
    if (startIndex != -1 && isUpper(char) && compName) {
      compName = compName.split(" ");
      compName = compName.length === 1 ? compName[0].replace(/\<|\>/g, "").trim() : compName[0].slice(1).trim();
      const start = startIndex + 1;
      const end = startIndex + compName.length + 1;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
    // closing
    const startIndex2 = line.indexOf("</");
    const char2 = line[startIndex2 + 1];
    let compName2 = line.match(/<\/([A-Z][^\/>]+)>/g);
    compName2 = Array.isArray(compName2) && compName2.length ? compName2[0].trim() : false;
    if (startIndex2 != -1 && isUpper(char2) && compName2) {
      compName2 = compName2.split(" ");
      compName2 = compName2.length === 1 ? compName2[0].replace(/\<|\>|\//g, "").trim() : compName2[0].slice(1).trim();
      const start2 = startIndex2 + 2;
      const end2 = startIndex2 + compName2.length + 2;
      const range2 = new vscode.Range(new vscode.Position(index, start2), new vscode.Position(index, end2));
      arr.push(range2);
    }
  } else if (type === "if") {
    const openTagIndex = line.indexOf("<if");
    const closeTagIndex = line.indexOf("/if");
    if (openTagIndex != -1) {
      const start = openTagIndex + 1;
      const end = start + 2;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
    if (closeTagIndex != -1) {
      const start = closeTagIndex + 1;
      const end = start + 2;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
  } else if (type === "else-if") {
    const openTagIndex = line.indexOf("<else-if");
    const closeTagIndex = line.indexOf("/else-if");
    if (openTagIndex != -1) {
      const start = openTagIndex + 1;
      const end = start + 7;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
    if (closeTagIndex != -1) {
      const start = closeTagIndex + 1;
      const end = start + 7;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
  } else if (type === "else") {
    const openTagIndex = line.indexOf("<else");
    const closeTagIndex = line.indexOf("/else");
    if (openTagIndex != -1) {
      const start = openTagIndex + 1;
      const end = start + 4;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
    if (closeTagIndex != -1) {
      const start = closeTagIndex + 1;
      const end = start + 4;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
  } else if (type === "for") {
    const openTagIndex = line.indexOf("<for");
    const closeTagIndex = line.indexOf("/for");
    if (openTagIndex != -1) {
      const start = openTagIndex + 1;
      const end = start + 3;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
    if (closeTagIndex != -1) {
      const start = closeTagIndex + 1;
      const end = start + 3;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
  } else if (type === "show") {
    const openTagIndex = line.indexOf("<show");
    const closeTagIndex = line.indexOf("/show");
    if (openTagIndex != -1) {
      const start = openTagIndex + 1;
      const end = start + 4;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
    if (closeTagIndex != -1) {
      const start = closeTagIndex + 1;
      const end = start + 4;
      const range = new vscode.Range(new vscode.Position(index, start), new vscode.Position(index, end));
      arr.push(range);
    }
  }
  return arr.length ? arr : false;
}

module.exports = getRange;
