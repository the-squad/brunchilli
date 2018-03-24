const gridBase = 4;
const spacing = new Map();

for (let counter = 1; counter < 25; counter += 1) {
  spacing.set(`${counter}x`, `${counter * gridBase}px`);
}

export default spacing;
