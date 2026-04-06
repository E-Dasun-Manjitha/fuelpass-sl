const fs = require('fs');
let html = fs.readFileSync('d:\\Git Projects\\Fuel Project\\index.html', 'utf8');

// The mapping of ugly emojis to sleek Lucide data attributes
const emojiMap = {
  '⛽': '<i data-lucide="fuel" class="icon-lucide"></i>',
  '🔥': '<i data-lucide="flame" class="icon-lucide"></i>',
  '📍': '<i data-lucide="map-pin" class="icon-lucide"></i>',
  '🪪': '<i data-lucide="credit-card" class="icon-lucide"></i>',
  '🚛': '<i data-lucide="truck" class="icon-lucide"></i>',
  '🇱🇰': '<i data-lucide="shield-check" class="icon-lucide"></i>',
  '⚖️': '<i data-lucide="scale" class="icon-lucide"></i>',
  '📅': '<i data-lucide="calendar" class="icon-lucide"></i>',
  '📊': '<i data-lucide="bar-chart-2" class="icon-lucide"></i>',
  '📝': '<i data-lucide="file-edit" class="icon-lucide"></i>',
  '💰': '<i data-lucide="coins" class="icon-lucide"></i>',
  '⚙️': '<i data-lucide="settings" class="icon-lucide"></i>',
  '🔑': '<i data-lucide="key" class="icon-lucide"></i>',
  '🚪': '<i data-lucide="log-out" class="icon-lucide"></i>',
  '🏛️': '<i data-lucide="landmark" class="icon-lucide"></i>',
  '🔍': '<i data-lucide="search" class="icon-lucide"></i>',
  '🔙': '<i data-lucide="arrow-left" class="icon-lucide"></i>',
  '📡': '<i data-lucide="radio" class="icon-lucide"></i>',
  '👥': '<i data-lucide="users" class="icon-lucide"></i>',
  '🏪': '<i data-lucide="store" class="icon-lucide"></i>',
  '⏱️': '<i data-lucide="clock" class="icon-lucide"></i>',
  '🚗': '<i data-lucide="car" class="icon-lucide"></i>',
  '🏍️': '<i data-lucide="motorcycle" class="icon-lucide"></i>',
  '🛺': '<i data-lucide="car" class="icon-lucide"></i>', // fallback
  '🚐': '<i data-lucide="truck" class="icon-lucide"></i>', // fallback
  '🚙': '<i data-lucide="car" class="icon-lucide"></i>',
  '🚌': '<i data-lucide="bus" class="icon-lucide"></i>',
  '🏫': '<i data-lucide="school" class="icon-lucide"></i>',
  '🚚': '<i data-lucide="truck" class="icon-lucide"></i>',
  '🚜': '<i data-lucide="tractor" class="icon-lucide"></i>',
  '🚘': '<i data-lucide="car" class="icon-lucide"></i>',
  '✅': '<i data-lucide="check-circle" class="icon-lucide"></i>',
  '⚠️': '<i data-lucide="alert-triangle" class="icon-lucide"></i>',
  '❌': '<i data-lucide="x-circle" class="icon-lucide"></i>',
  'ℹ️': '<i data-lucide="info" class="icon-lucide"></i>',
  '🗺️': '<i data-lucide="map" class="icon-lucide"></i>'
};

// Replace all emojis
for (const [emoji, lucideHtml] of Object.entries(emojiMap)) {
  const safeEmoji = emoji.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // Though it's just characters
  const re = new RegExp(emoji, 'g');
  html = html.replace(re, lucideHtml);
}

// Inject Lucide script into the <head>
if (!html.includes('lucide@latest')) {
  html = html.replace('</head>', '  <script src="https://unpkg.com/lucide@latest"></script>\n  <style>.icon-lucide { width: 1.1em; height: 1.1em; vertical-align: middle; stroke-width: 2.5; }</style>\n</head>');
}
if (!html.includes('lucide.createIcons()')) {
  html = html.replace('</body>', '  <script>lucide.createIcons();</script>\n</body>');
}

fs.writeFileSync('d:\\Git Projects\\Fuel Project\\index.html', html);
console.log("Replaced emojis with Lucide SVGs in index.html");
