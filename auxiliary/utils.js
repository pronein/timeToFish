
module.exports = {
  replaceWsWith: replaceWhiteSpaceWith
};

function replaceWhiteSpaceWith(src, replacement) {
  if(typeof src !== 'string') return src;
  
  return src.replace(/\s+/g, replacement || '_');
}