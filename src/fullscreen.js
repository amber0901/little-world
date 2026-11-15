export const fullscreenElement=doc=>doc.fullscreenElement||doc.webkitFullscreenElement||null;
export function enterFullscreen(doc){
 const root=doc.documentElement;
 if(root.requestFullscreen&&doc.fullscreenEnabled!==false)return root.requestFullscreen();
 const request=root.webkitRequestFullscreen||root.webkitRequestFullScreen;
 if(request&&doc.webkitFullscreenEnabled!==false)return request.call(root);
 throw Error('Fullscreen unavailable');
}
export function leaveFullscreen(doc){
 const exit=doc.exitFullscreen||doc.webkitExitFullscreen||doc.webkitCancelFullScreen;
 if(exit)return exit.call(doc);
}
