var ReactPrimitives=require('../ReactPrimitives');var _require=








require('react-vr');var Animated=_require.Animated;var View=_require.View;var Text=_require.Text;var Image=_require.Image;var StyleSheet=_require.StyleSheet;var Easing=_require.Easing;

ReactPrimitives.inject({
StyleSheet:StyleSheet,
View:View,
Text:Text,
Image:Image,
Easing:Easing,
Animated:Animated,
Platform:{
OS:'vr',
Version:1},

Touchable:require('../vr/Touchable')(
Animated,
StyleSheet,
ReactPrimitives.Platform)});