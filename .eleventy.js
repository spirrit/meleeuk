module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/assets/");
  eleventyConfig.addPassthroughCopy("_redirects");

  return {
    dir: {
      input: "src",
      output: "dist"
    },
  }
};