import { start } from '@sveltech/routify';
import App from './App.svelte';
import manifest from '../static/manifest.json';

const app = start({
  target: document.body,
  props: {
    app: App
  }
});

if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

// Add the link to the manifest.json file
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister().then(() => {
        registration.update();
      });
    });
  });
}

const head = document.head;
const link = document.createElement('link');
link.rel = 'manifest';
link.href = manifest.src;
head.appendChild(link);

export default app;