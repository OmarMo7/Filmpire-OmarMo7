export default function flipIcons(theme){
  const icons = document.getElementsByClassName('icon')
  for (let icon of icons) {
    if (theme.palette.mode === "dark") {
      if (icon.id === "favicon") {
        icon.href = "/public/black/favicon.ico"
      }
      else if (icon.id === "192") {
        icon.href = "/public/black/logo192.png"
      }
      else if (icon.id === "180") {
        icon.href = "/black/apple-touch-icon.png"
      }
      else if (icon.id === "32") {
        icon.href = "/black/favicon-32x32.png"
      }
      else if (icon.id === "16") {
        icon.href = "/black/favicon-16x16.png"
      }
    } else {
      if (icon.id === "favicon") {
        icon.href = "/public/favicon.ico"
      }
      else if (icon.id === "192") {
        icon.href = "/public/logo192.png"
      }
      else if (icon.id === "180") {
        icon.href = "/apple-touch-icon.png"
      }
      else if (icon.id === "32") {
        icon.href = "/favicon-32x32.png"
      }
      else if (icon.id === "16") {
        icon.href = "/favicon-16x16.png"
      }
    }
  }
}
