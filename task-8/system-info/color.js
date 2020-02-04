function toColorText(color, text) {
  return `${color}${text}${'\x1b[0m'}`;
}

module.exports = {
  toColorText,
};
