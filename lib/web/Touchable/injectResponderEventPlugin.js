/* eslint max-len:0 */
// based on https://github.com/facebook/react/pull/4303/files and
// https://github.com/necolas/react-native-web/blob/master/src/apis/PanResponder/injectResponderEventPlugin.js

var EventConstants=require('react-dom/lib/EventConstants');
var EventPluginRegistry=require('react-dom/lib/EventPluginRegistry');
var ResponderEventPlugin=require('react-dom/lib/ResponderEventPlugin');
var ResponderTouchHistoryStore=require('react-dom/lib/ResponderTouchHistoryStore');
var normalizeNativeEvent=require('./normalizeNativeEvent');
var keyMirror=require('../util/keyMirror');var _keyMirror=











keyMirror(EventConstants.topLevelTypes);var topMouseDown=_keyMirror.topMouseDown;var topMouseMove=_keyMirror.topMouseMove;var topMouseUp=_keyMirror.topMouseUp;var topScroll=_keyMirror.topScroll;var topSelectionChange=_keyMirror.topSelectionChange;var topTouchCancel=_keyMirror.topTouchCancel;var topTouchEnd=_keyMirror.topTouchEnd;var topTouchMove=_keyMirror.topTouchMove;var topTouchStart=_keyMirror.topTouchStart;

var endDependencies=[topTouchCancel,topTouchEnd,topMouseUp];
var moveDependencies=[topTouchMove,topMouseMove];
var startDependencies=[topTouchStart,topMouseDown];

/**
 * Setup ResponderEventPlugin dependencies
 */
ResponderEventPlugin.eventTypes.responderMove.dependencies=moveDependencies;
ResponderEventPlugin.eventTypes.responderEnd.dependencies=endDependencies;
ResponderEventPlugin.eventTypes.responderStart.dependencies=startDependencies;
ResponderEventPlugin.eventTypes.responderRelease.dependencies=endDependencies;
ResponderEventPlugin.eventTypes.responderTerminationRequest.dependencies=[];
ResponderEventPlugin.eventTypes.responderGrant.dependencies=[];
ResponderEventPlugin.eventTypes.responderReject.dependencies=[];
ResponderEventPlugin.eventTypes.responderTerminate.dependencies=[];
ResponderEventPlugin.eventTypes.moveShouldSetResponder.dependencies=moveDependencies;
ResponderEventPlugin.eventTypes.selectionChangeShouldSetResponder.dependencies=[topSelectionChange];
ResponderEventPlugin.eventTypes.scrollShouldSetResponder.dependencies=[topScroll];
ResponderEventPlugin.eventTypes.startShouldSetResponder.dependencies=startDependencies;

var originalRecordTouchTrack=ResponderTouchHistoryStore.recordTouchTrack;

ResponderTouchHistoryStore.recordTouchTrack=function(topLevelType,nativeEvent){
// Filter out mouse-move events when the mouse button is not down
if(topLevelType===topMouseMove&&!ResponderTouchHistoryStore.touchHistory.touchBank.length){
return;
}
originalRecordTouchTrack.call(ResponderTouchHistoryStore,topLevelType,normalizeNativeEvent(nativeEvent));
};

EventPluginRegistry.injectEventPluginsByName({
ResponderEventPlugin:ResponderEventPlugin});