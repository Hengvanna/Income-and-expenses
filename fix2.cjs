const fs = require('fs');
const html = fs.readFileSync('old_index.html', 'utf8');

let template = html.split('<div id="app">')[1].split('<!-- ════════════════════════════════════════════ -->')[0];
template = template.replace(/<\/div>\s*$/, '');

let script = html.split('<!-- VUE 3 APP                                    -->')[1];
script = script.split('<script>')[1].split('<\/script>')[0];
script = script.replace(/const { createApp, ref, computed, watch, onMounted, nextTick } = Vue/g, 
  "import { ref, computed, watch, onMounted, nextTick } from 'vue'\nimport Chart from 'chart.js/auto'");
script = script.replace(/createApp\({[\s\S]*?setup\(\) {/g, "");
script = script.replace(/return {[\s\S]*?}\s*}\s*}\)\.mount\('#app'\)/g, "");

const vueFile = `<template>\n${template}\n</template>\n\n<script setup>\n${script}\n</script>\n`;
fs.writeFileSync('src/App.vue', vueFile);
