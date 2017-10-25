var throttleAndDebounce=require('./throttleAndDebounce');

var _id=1;
// it's important that guid returns something that isn't an integer-looking string
// so JS VM treats registry like a map
var guid=function guid(){return'r'+_id++;};

var THROTTLE_MS=150;
var DEBOUNCE_MS=16;

var registry={};

function triggerAll(){
Object.keys(registry).forEach(function(key){
var instance=registry[key];
instance.handleOnLayout();
});
}

function safeOverride(original,next){
if(original){
return function prototypeOverride(){
original.call(this);
next.call(this);
};
}
return next;
}

if(global.document&&global.addEventListener){
global.addEventListener(
'resize',
throttleAndDebounce(triggerAll,THROTTLE_MS,DEBOUNCE_MS),
false);

}

module.exports=function(Component){
/* eslint-disable no-param-reassign */
Component.prototype.handleOnLayout=function handleOnLayout(){var _this=this;
var prev=this._prevLayout;

this.measure(function(x,y,width,height){
if(_this._isUnmounted)return;
if(
prev.width!==width||
prev.height!==height||
prev.x!==x||
prev.y!==y)
{
// eslint-disable-next-line no-param-reassign
_this._prevLayout={x:x,y:y,width:width,height:height};

if(_this.props.onLayout){
_this.props.onLayout({
nativeEvent:{
layout:_this._prevLayout}});


}
}
});
};

Component.prototype.applyOnLayoutIfNeeded=function applyOnLayoutIfNeeded(){
/* eslint-disable no-param-reassign */
// on server side, do nothing.
if(!global.document)return;
// we only need to apply this to the instance once.
if(this._hasOnLayoutApplied)return;

this._hasOnLayoutApplied=true;
this._prevLayout={};
this._onLayoutId=guid();
this._isUnmounted=false;
// add instance to registry so that it gets called on window resizes
registry[this._onLayoutId]=this;

this.componentDidMount=safeOverride(
this.componentDidMount,
function componentDidMount(){
this.handleOnLayout();
});


this.componentDidUpdate=safeOverride(
this.componentDidUpdate,
function componentDidUpdate(){
this.handleOnLayout();
});


this.componentWillUnmount=safeOverride(
this.componentWillUnmount,
function componentWillUnmount(){
this._isUnmounted=true;
delete registry[this._onLayoutId];
});

};
};