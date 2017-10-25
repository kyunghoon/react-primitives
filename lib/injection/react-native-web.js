var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var ReactPrimitives=require('../ReactPrimitives');var _require=










require('react-native-web');var Animated=_require.Animated;var StyleSheet=_require.StyleSheet;var View=_require.View;var Text=_require.Text;var Image=_require.Image;var Platform=_require.Platform;var Touchable=_require.Touchable;var Dimensions=_require.Dimensions;var Easing=_require.Easing;
var StyleRegistry=require('react-native-web/dist/apis/StyleSheet/registry');

var emptyObject={};

var resolve=function resolve(style){
return StyleRegistry.resolve(style)||emptyObject;
};

ReactPrimitives.inject({
View:View,
Text:Text,
Image:Image,
Easing:Easing,
Animated:Animated,
StyleSheet:_extends({},
StyleSheet,{
resolve:resolve}),

Platform:{
OS:Platform.OS,
Version:Platform.Version},

Dimensions:Dimensions});


ReactPrimitives.inject({
Touchable:require('../modules/Touchable')(
Animated,
StyleSheet,
ReactPrimitives.Platform,
Touchable.Mixin)});