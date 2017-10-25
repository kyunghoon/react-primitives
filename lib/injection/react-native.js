var ReactPrimitives=require('../ReactPrimitives');var _require=









require('react-native');var Animated=_require.Animated;var View=_require.View;var Text=_require.Text;var Image=_require.Image;var StyleSheet=_require.StyleSheet;var Platform=_require.Platform;var Easing=_require.Easing;var Dimensions=_require.Dimensions;

ReactPrimitives.inject({
StyleSheet:StyleSheet,
View:View,
Text:Text,
Image:Image,
Easing:Easing,
Animated:Animated,
Platform:{
OS:Platform.OS,
Version:Platform.Version},

Dimensions:Dimensions,
Touchable:require('../modules/Touchable')(Animated,StyleSheet,Platform)});