const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf8');

const templateMatch = html.match(/<div id="app">([\s\S]*?)<\/div>\s*<!-- ════════════════════════════════════════════ -->/);
const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/);
const cssMatch = html.match(/<style>([\s\S]*?)<\/style>/);

let template = templateMatch ? templateMatch[1] : '';
let script = scriptMatch ? scriptMatch[1] : '';
let css = cssMatch ? cssMatch[1] : '';

// Convert script to script setup
script = script.replace(/const { createApp, ref, computed, watch, onMounted, nextTick } = Vue/g, 
  "import { ref, computed, watch, onMounted, nextTick } from 'vue'\nimport Chart from 'chart.js/auto'");
script = script.replace(/createApp\({[\s\S]*?setup\(\) {/g, "");
script = script.replace(/return {[\s\S]*?}\s*}\s*}\)\.mount\('#app'\)/g, "");

const vueFile = `<template>\n${template}\n</template>\n\n<script setup>\n${script}\n</script>\n`;

fs.writeFileSync('src/App.vue', vueFile);

// Rewrite index.html
const indexHtml = `<!DOCTYPE html>
<html lang="km">
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>ចំណូល & ចំណាយ</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>`;
fs.writeFileSync('index.html', indexHtml);
