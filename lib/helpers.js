const isObj = obj => !!(obj !== null && typeof obj === "object");
const isFullArr = arr => !!(isObj(arr) && Array.isArray(arr) && arr.length);
const isDef = val => !!(val !== undefined && val !== null);
const isHTML = editor => editor && editor.document && (/html/i.test(editor.document.languageId) ? true : false);
function isUpper(char) {
  const upperChar = char.toUpperCase();
  const regex = new RegExp(upperChar);
  return regex.test(char);
}

module.exports.isUpper = isUpper;
module.exports.isObj = isObj;
module.exports.isFullArr = isFullArr;
module.exports.isDef = isDef;
module.exports.isHTML = isHTML;