module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./src/assets/");

  return {
    dir: {
      input: "src",
      output: "dist"
    },
  }
};