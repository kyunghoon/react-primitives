var prefixAll=require('inline-style-prefixer/static');// 2.4kb gzipped
var prefixedProperties=require('./prefixedProperties');
var normalizeValue=require('./normalizeValue');
var colorWithOpacity=require('../util/colorWithOpacity');
var hasOwnProperty=Object.prototype.hasOwnProperty;

var styleShortHands={
borderColor:{
borderTopColor:true,
borderRightColor:true,
borderBottomColor:true,
borderLeftColor:true},

borderRadius:{
borderTopLeftRadius:true,
borderTopRightRadius:true,
borderBottomRightRadius:true,
borderBottomLeftRadius:true},

borderStyle:{
borderTopStyle:true,
borderRightStyle:true,
borderBottomStyle:true,
borderLeftStyle:true},

borderWidth:{
borderTopWidth:true,
borderRightWidth:true,
borderBottomWidth:true,
borderLeftWidth:true},

margin:{
marginTop:true,
marginRight:true,
marginBottom:true,
marginLeft:true},

marginHorizontal:{
marginRight:true,
marginLeft:true},

marginVertical:{
marginTop:true,
marginBottom:true},

overflow:{
overflowX:true,
overflowY:true},

padding:{
paddingTop:true,
paddingRight:true,
paddingBottom:true,
paddingLeft:true},

paddingHorizontal:{
paddingRight:true,
paddingLeft:true},

paddingVertical:{
paddingTop:true,
paddingBottom:true},

textDecorationLine:{
textDecoration:true},

writingDirection:{
direction:true}};



/**
 * Alpha-sort properties, apart from shorthands – they must appear before the
 * longhand properties that they expand into. This lets more specific styles
 * override less specific styles, whatever the order in which they were
 * originally declared.
 */
var sortProps=function sortProps(propsArray){return propsArray.sort(function(a,b){
var expandedA=styleShortHands[a];
var expandedB=styleShortHands[b];
if(expandedA&&expandedA[b]){
return-1;
}else if(expandedB&&expandedB[a]){
return 1;
}
// eslint-disable-next-line no-nested-ternary
return a<b?-1:a>b?1:0;
});};

var resolveFlexStyle=function resolveFlexStyle(resolvedStyle,flex/* , style */){
// TODO(lmr): RN now supports some of these properties. look into how to handle
// eslint-disable-next-line no-param-reassign
resolvedStyle.flexGrow=flex;
// eslint-disable-next-line no-param-reassign
resolvedStyle.flexShrink=1;
// eslint-disable-next-line no-param-reassign
resolvedStyle.flexBasis='auto';
};

var resolveShadowProperty=function resolveShadowProperty(resolvedStyle,style){
var opacity=style.shadowOpacity!=null?style.shadowOpacity:1;
var color=colorWithOpacity(style.shadowColor,opacity);
var offset=style.shadowOffset||{width:0,height:0};
var x=normalizeValue('width',offset.width||0);
var y=normalizeValue('height',offset.height||0);
var r=style.shadowRadius||0;

// we multiply by 2 here because on native, the radius is in terms of
// "points" which are multiple pixels, but on the web they are in terms of
// pixels. A more same strategy might be to divide this by PizelRatio.get()
// in the react native case.
var rpx=normalizeValue('shadowRadius',r*3);

// eslint-disable-next-line no-param-reassign
resolvedStyle.boxShadow=color+' '+x+' '+y+' '+rpx;
};

// { scale: 2 } => 'scale(2)'
var mapTransform=function mapTransform(transform){
var key=Object.keys(transform)[0];
return key+'('+normalizeValue(key,transform[key])+')';
};

// mutative
var resolveTransformProperty=function resolveTransformProperty(resolvedStyle,transform){
// eslint-disable-next-line no-param-reassign
resolvedStyle.transform=transform.map(mapTransform).join(' ');
};

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
var transformToWebStyle=function transformToWebStyle(style){
if(!style)return style;

var propsArray=Object.keys(style);
var sortedProps=sortProps(propsArray);
var resolvedStyle={};
var hasResolvedShadow=false;
var needsPrefix=false;

for(var i=0;i<sortedProps.length;i++){
var key=sortedProps[i];
var value=style[key];
if(!needsPrefix&&prefixedProperties[key]){
needsPrefix=true;
}
switch(key){
case'flex':
resolveFlexStyle(resolvedStyle,value,style);
break;
case'textAlignVertical':
resolvedStyle.verticalAlign=value==='center'?'middle':value;
break;
case'transform':
resolveTransformProperty(resolvedStyle,value);
break;
case'shadowColor':
case'shadowOffset':
case'shadowOpacity':
case'shadowRadius':
if(!hasResolvedShadow){
resolveShadowProperty(resolvedStyle,style);
hasResolvedShadow=true;
}
break;
case'borderColor':
case'borderRadius':
case'borderStyle':
case'borderWidth':
case'margin':
case'marginHorizontal':
case'marginVertical':
case'overflow':
case'padding':
case'paddingHorizontal':
case'paddingVertical':
case'textDecorationLine':
case'writingDirection':{
var expandedProps=styleShortHands[key];
var normalizedVal=normalizeValue(key,value);
for(var propName in expandedProps){
if(hasOwnProperty.call(expandedProps,propName)){
resolvedStyle[propName]=normalizedVal;
}
}
}break;
case'elevation':
// ignore
break;
default:
resolvedStyle[key]=normalizeValue(key,value);
break;}

}
// micro-optimization. For simple styles that don't have properties that need to be prefixed,
// we avoid making this call all together.
if(needsPrefix){
resolvedStyle=prefixAll(resolvedStyle);
}
return resolvedStyle;
};

module.exports=transformToWebStyle;