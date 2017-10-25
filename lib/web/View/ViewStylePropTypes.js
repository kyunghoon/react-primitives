var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var PropTypes=require('prop-types');
var BorderPropTypes=require('../propTypes/BorderPropTypes');
var ColorPropType=require('../propTypes/ColorPropType');
var LayoutPropTypes=require('../propTypes/LayoutPropTypes');
var TransformPropTypes=require('../propTypes/TransformPropTypes');
var ShadowPropTypes=require('../propTypes/ShadowPropTypes');var

number=PropTypes.number;var oneOf=PropTypes.oneOf;var string=PropTypes.string;
var autoOrHiddenOrVisible=oneOf(['auto','hidden','visible','scroll']);
var hiddenOrVisible=oneOf(['hidden','visible']);

module.exports=_extends({},
BorderPropTypes,
LayoutPropTypes,
TransformPropTypes,
ShadowPropTypes,{
// RN-only styles
elevation:number,

backfaceVisibility:hiddenOrVisible,
backgroundColor:ColorPropType,
opacity:number,
overflow:autoOrHiddenOrVisible,
// TODO(lmr): we probably want to shim the RN stylesheet or something to strip
// these styles, or else it will trigger a redbox in RN.
/* @platform web */
WebkitOverflowScrolling:string,
backgroundAttachment:string,
backgroundClip:string,
backgroundImage:string,
backgroundPosition:string,
backgroundOrigin:oneOf([
'border-box',
'content-box',
'padding-box']),

backgroundRepeat:string,
backgroundSize:string,
cursor:string,
outline:string,
overflowX:autoOrHiddenOrVisible,
overflowY:autoOrHiddenOrVisible,
userSelect:string,
visibility:hiddenOrVisible,
zIndex:number});