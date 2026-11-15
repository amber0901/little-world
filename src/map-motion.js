// Gesture frames paint DOM transforms; React only commits a settled viewport.
export function createMapMotion({requestFrame,cancelFrame,paint,settle}){
 let pending=null,latest=null;
 return {
  update(view){latest=view;if(pending===null)pending=requestFrame(()=>{pending=null;paint(latest);});},
  end(view){latest=view;if(pending!==null)cancelFrame(pending);pending=null;paint(view);settle(view);},
  cancel(){if(pending!==null)cancelFrame(pending);pending=null;}
 };
}
export function movedPoint(point,view){return [point.x*view.k+view.x+(point.dx||0),point.y*view.k+view.y+(point.dy||0)];}
