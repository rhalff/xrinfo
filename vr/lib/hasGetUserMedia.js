export default function hasGetUserMedia() {
  const hasUserMedia = !!(
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  );

  console.log('has user media', hasUserMedia);

  return hasUserMedia;
}
