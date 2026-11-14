export function photosFor(id, images) {
  const main=images[id];
  return main ? [main,...(main.gallery||[])] : [];
}
export function imageSourceSet(photo, webp=false) {
  if(!photo?.variants?.length)return undefined;
  return photo.variants.map(v=>`${webp?v.webp:v.src} ${v.width}w`).join(', ');
}
