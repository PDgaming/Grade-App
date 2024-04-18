export function registerServiceWorker() {
  // Check if the current environment is the browser
  if (typeof window !== "undefined") {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("Service Worker registered: ", registration);
          })
          .catch((registrationError) => {
            console.error(
              "Service Worker registration failed: ",
              registrationError
            );
          });
      });
    }
  }
}
