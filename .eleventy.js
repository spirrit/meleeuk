module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget("./src/sass/");
  eleventyConfig.addPassthroughCopy("./css");

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
};