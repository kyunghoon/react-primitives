var normalizeValue=require('./normalizeValue');
var hyphenate=require('./hyphenate');
var mapKeyValue=require('../util/mapKeyValue');
var transformToWebStyle=require('./transformToWebStyle');

/**
 * Generates valid CSS rule bodies (sans selector) from a JS object
 *
 * Example:
 * ```
 * generateCss({ width: 20, color: 'blue' });
 * //=> 'width:20px;color:blue;'
 * ```
 *
 * @param style
 */
var generateCss=function generateCss(style){return mapKeyValue(transformToWebStyle(style),function(key,val){
var name=hyphenate(key);
var value=normalizeValue(key,val);
if(Array.isArray(val)){
return val.map(function(v){return name+':'+v+';';}).join('');
}
return name+':'+value+';';
}).join('');};

module.exports=generateCss;