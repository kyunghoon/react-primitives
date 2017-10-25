var ReactPrimitives=require('../ReactPrimitives');

var PixelRatio={
/**
   * Returns the device pixel density.
   */
get:function get(){
return ReactPrimitives.Dimensions.get('window').scale;
},

/**
   * No equivalent for Web
   */
getFontScale:function getFontScale(){
return ReactPrimitives.Dimensions.get('window').fontScale||PixelRatio.get();
},

/**
   * Converts a layout size (dp) to pixel size (px).
   * Guaranteed to return an integer number.
   */
getPixelSizeForLayoutSize:function getPixelSizeForLayoutSize(layoutSize){
return Math.round(layoutSize*PixelRatio.get());
},

/**
   * Rounds a layout size (dp) to the nearest layout size that corresponds to
   * an integer number of pixels. For example, on a device with a PixelRatio
   * of 3, `PixelRatio.roundToNearestPixel(8.4) = 8.33`, which corresponds to
   * exactly (8.33 * 3) = 25 pixels.
   */
roundToNearestPixel:function roundToNearestPixel(layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;
}};


module.exports=PixelRatio;