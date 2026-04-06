const fs = require('fs');
const files = ['d:\\Git Projects\\Fuel Project\\js\\ui.js', 'd:\\Git Projects\\Fuel Project\\js\\app.js'];

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
  '🛺': '<i data-lucide="car" class="icon-lucide"></i>', 
  '🚐': '<i data-lucide="truck" class="icon-lucide"></i>', 
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
  '🗺️': '<i data-lucide="map" class="icon-lucide"></i>',
  '📞': '<i data-lucide="phone" class="icon-lucide"></i>',
  '🕐': '<i data-lucide="clock" class="icon-lucide"></i>',
  '🔵': '',
  '🟡': '',
  '💡': ''
};

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  for (const [emoji, lucideHtml] of Object.entries(emojiMap)) {
    const safeEmoji = emoji.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const re = new RegExp(emoji, 'g');
    content = content.replace(re, ''); // In JS files, we shouldn't inject HTML tags if they are used as raw string literals. Wait, actually `ui.js` generates innerHTML! So injecting HTML is fine IF it's innerHTML, but it breaks string templates if it has quotes? `lucideHtml` has double quotes. Inside a string template it's fine! But for safety I'll just use single quotes in JS replacements.
  }
}

// Actually, I'll write a safer replacement for JS:
// We just remove emojis in JS files, or replace with text.
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  for (const emoji of Object.keys(emojiMap)) {
    const re = new RegExp(emoji, 'g');
    content = content.replace(re, ''); // Just strip them out of JS strings to be safe!
  }
  fs.writeFileSync(file, content);
}
