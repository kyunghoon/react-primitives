var asap=require('asap');
var CSSPropertyOperations=require('react-dom/lib/CSSPropertyOperations');

var hasOwnProperty=Object.prototype.hasOwnProperty;

var _measureLayout=function _measureLayout(node,relativeToNativeNode,callback){
asap(function(){
var relativeNode=relativeToNativeNode||node.parentNode;
var relativeRect=relativeNode.getBoundingClientRect();var _node$getBoundingClie=
node.getBoundingClientRect();var height=_node$getBoundingClie.height;var left=_node$getBoundingClie.left;var top=_node$getBoundingClie.top;var width=_node$getBoundingClie.width;
var x=left-relativeRect.left;
var y=top-relativeRect.top;
callback(x,y,width,height,left,top);
});
};

var UIManager={
blur:function blur(node){
try{node.blur();}catch(err){/* ignore */}
},

focus:function focus(node){
try{node.focus();}catch(err){/* ignore */}
},

measure:function measure(node,callback){
_measureLayout(node,null,callback);
},

measureInWindow:function measureInWindow(node,callback){
asap(function(){var _node$getBoundingClie2=
node.getBoundingClientRect();var height=_node$getBoundingClie2.height;var left=_node$getBoundingClie2.left;var top=_node$getBoundingClie2.top;var width=_node$getBoundingClie2.width;
callback(left,top,width,height);
});
},

measureLayout:function measureLayout(node,relativeToNativeNode,onFail,onSuccess){
var relativeTo=relativeToNativeNode||node.parentNode;
_measureLayout(node,relativeTo,onSuccess);
},

updateView:function updateView(node,props,instance){
for(var prop in props){
if(!hasOwnProperty.call(props,prop)){
continue;
}
var value=props[prop];
switch(prop){
case'style':
// convert styles to DOM-styles
CSSPropertyOperations.setValueForStyles(node,value,instance);
break;
case'class':
case'className':
// prevent class names managed by React from being replaced
node.setAttribute('class',value);
break;
case'text':
case'value':
// native platforms use `text` prop to replace text input value
/* eslint no-param-reassign:0 */
node.value=value;
break;
default:
node.setAttribute(prop,value);
break;}

}
}};


module.exports=UIManager;