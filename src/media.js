export function photosFor(id, images) {
  const main=images[id];
  return main ? [main,...(main.gallery||[])] : [];
}
export function imageVariants(photo,large=false){
 const variants=photo?.variants||[];
 return large?variants:variants.filter(v=>Math.max(v.width,v.height)<=640);
}
export function imageSourceSet(photo, webp=false,large=true) {
  if(!photo?.variants?.length)return undefined;
  return imageVariants(photo,large).map(v=>`${webp?v.webp:v.src} ${v.width}w`).join(', ');
}
