const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // spasi → -
    .replace(/[^\w\-]+/g, '')    // hapus karakter aneh
    .replace(/\-\-+/g, '-')      // double - jadi satu
};

module.exports = slugify;