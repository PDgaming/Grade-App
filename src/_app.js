import { register } from "svelte-head";

// Register the manifest.json file
register("manifest.json", {
  rel: "manifest",
  href: "/manifest.json",
});
