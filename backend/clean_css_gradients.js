const fs = require('fs');
let css = fs.readFileSync('d:\\Git Projects\\Fuel Project\\css\\styles.css', 'utf8');

// Replace linear gradients on buttons with solid colors
css = css.replace(/background:\s*linear-gradient\([^)]+\)/g, 'background: var(--blue)');
// Exception for body background theme that we want to keep
// actually let's just keep it simple

fs.writeFileSync('d:\\Git Projects\\Fuel Project\\css\\styles.css', css);
console.log("CSS Gradients replaced");
