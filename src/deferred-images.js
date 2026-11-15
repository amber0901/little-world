let observer;
const callbacks=new WeakMap();
export function observeImage(node,ready){
 if(typeof IntersectionObserver==='undefined'){ready();return ()=>{};}
 observer ||= new IntersectionObserver(items=>{for(const item of items)if(item.isIntersecting){observer.unobserve(item.target);const callback=callbacks.get(item.target);callbacks.delete(item.target);callback?.();}},{rootMargin:'140px'});
 callbacks.set(node,ready);observer.observe(node);
 return ()=>{callbacks.delete(node);observer.unobserve(node);};
}
