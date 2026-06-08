export function toggleFullScreen() {  
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.fullscreenElement) {
    document.exitFullscreen();
  }
}