<script>
  import { onMount } from "svelte";
  import hljs from "highlight.js/lib/common";
  import "highlight.js/styles/github.css";

  export let content = "";
  let processedContent = "";

  onMount(() => {
    processContent();
  });

  function processContent() {
    const parts = content.split(/(```[\s\S]*?```|`[\s\S]*?`)/g);
    processedContent = parts
      .map((part) => {
        if (part.startsWith("```") && part.endsWith("```")) {
          const code = part.slice(3, -3).trim();
          const result = hljs.highlightAuto(code);
          return `<pre><code class="hljs ${result.language}">${result.value}</code></pre>`;
        } else if (part.startsWith("`") && part.endsWith("`")) {
          const code = part.slice(1, -1);
          return `<code class="inline-code">${hljs.highlightAuto(code).value}</code>`;
        } else {
          return part;
        }
      })
      .join("");
  }

  $: {
    if (content) {
      processContent();
    }
  }
</script>

<div class="codeBlock">
  {@html processedContent}
</div>

<style>
  :global(pre) {
    background-color: #282c34;
    border-radius: 6px;
    padding: 16px;
    overflow: auto;
    font-size: 85%;
    line-height: 1.45;
    margin-bottom: 16px;
  }

  :global(pre code.hljs) {
    background-color: transparent;
    padding: 0;
    margin: 0;
    white-space: pre-wrap;
    word-break: break-word;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  }

  :global(code.inline-code) {
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 3px;
    font-size: 85%;
    margin: 0;
    padding: 0.2em 0.4em;
    font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
  }

  /* Custom syntax highlighting */
  :global(.hljs-keyword) {
    color: #c678dd;
  }
  :global(.hljs-built_in) {
    color: #e6c07b;
  }
  :global(.hljs-type) {
    color: #e6c07b;
  }
  :global(.hljs-literal) {
    color: #56b6c2;
  }
  :global(.hljs-number) {
    color: #d19a66;
  }
  :global(.hljs-regexp) {
    color: #98c379;
  }
  :global(.hljs-string) {
    color: #98c379;
  }
  :global(.hljs-subst) {
    color: #e06c75;
  }
  :global(.hljs-symbol) {
    color: #61aeee;
  }
  :global(.hljs-class) {
    color: #e6c07b;
  }
  :global(.hljs-function) {
    color: #61aeee;
  }
  :global(.hljs-title) {
    color: #61aeee;
  }
  :global(.hljs-params) {
    color: #d19a66;
  }
  :global(.hljs-comment) {
    color: #5c6370;
    font-style: italic;
  }
  :global(.hljs-doctag) {
    color: #c678dd;
  }
  :global(.hljs-meta) {
    color: #e06c75;
  }
  :global(.hljs-section) {
    color: #e06c75;
  }
  :global(.hljs-tag) {
    color: #e06c75;
  }
  :global(.hljs-name) {
    color: #e06c75;
  }
  :global(.hljs-attr) {
    color: #d19a66;
  }
  :global(.hljs-attribute) {
    color: #98c379;
  }
  :global(.hljs-variable) {
    color: #d19a66;
  }

  /* HTML-specific styles */
  :global(.hljs-tag) {
    color: #e06c75;
  }
  :global(.hljs-name) {
    color: #e06c75;
  }
  :global(.hljs-attr) {
    color: #d19a66;
  }
  :global(.hljs-string) {
    color: #98c379;
  }

  :global(.hljs) {
    color: #abb2bf; /* Light gray color for better readability */
  }

  /* Modify the general rule for identifiers and variables */
  :global(.hljs-attr),
  :global(.hljs-property),
  :global(
      .hljs
        *:not(.hljs-keyword):not(.hljs-built_in):not(.hljs-type):not(
          .hljs-literal
        ):not(.hljs-number):not(.hljs-regexp):not(.hljs-string):not(
          .hljs-subst
        ):not(.hljs-symbol):not(.hljs-class):not(.hljs-function):not(
          .hljs-title
        ):not(.hljs-params):not(.hljs-comment):not(.hljs-doctag):not(
          .hljs-meta
        ):not(.hljs-section):not(.hljs-tag):not(.hljs-name):not(.hljs-attr):not(
          .hljs-attribute
        )
    ) {
    color: inherit; /* This will make it use the color from the parent (.hljs) */
  }
</style>
