const fs = require('fs')
const path = require('path')
const markdownShortcode = require("eleventy-plugin-markdown-shortcode");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const scTable = require("./src/_utils/scTable.js");
const sampleImage = require("./src/_utils/sampleImage.js");
const scUri = require("./src/_utils/scUri.js");
const scName = require("./src/_utils/scName.js");
const scLevel = require("./src/_utils/scLevel.js");
const slugify = require("./src/_utils/slugify.js");

const reportsFolderRelative = 'src/reports';
const reportsFolder = path.join(__dirname, reportsFolderRelative)

const reports = fs.readdirSync(reportsFolder)
  .filter(reportName => {
    const reportPath = path.join(reportsFolder, reportName)
    return fs.existsSync(reportPath) && fs.lstatSync(reportPath).isDirectory()
  })

const sanitizeNumber = (numberWithDots) => {
  const numberString = numberWithDots.split('.').map(numb => numb = Number(numb) < 10 ? '0' + numb : numb).join('');
  return Number(numberString);
}

module.exports = (function(eleventyConfig) {
  eleventyConfig.addFilter("sc_uri", scUri);
  eleventyConfig.addFilter("sc_name", scName);
  eleventyConfig.addFilter("sc_level", scLevel);
 
  eleventyConfig.addFilter("slugify", slugify);

  eleventyConfig.addNunjucksShortcode('sc_table', scTable);
  eleventyConfig.addNunjucksShortcode('sample_image', sampleImage);

  eleventyConfig.addLayoutAlias("report", "report.njk");

  eleventyConfig.addPlugin(markdownShortcode);
  eleventyConfig.addPlugin(syntaxHighlight);
  
  // create a collection of issues specific to each report, sorted by success criterion
  for (let i=0; i < reports.length; i++) {
    eleventyConfig.addCollection(reports[i], function (collectionApi) {
      return collectionApi
      .getFilteredByGlob(`${reportsFolderRelative}/${reports[i]}/issues/**/*.md`)
      .filter(item => !(item.data.sc === "none") && !(item.data.sc === undefined))
      .sort((a, b) => {
        const numbA = sanitizeNumber(a.data.sc);
        const numbB = sanitizeNumber(b.data.sc);
        if (numbA < numbB) return -1;
        if (numbA > numbB) return 1;
        return 0;
      });
    });
  }

  // create a collection of issues specific to each report, by keyboard group
  for (let i=0; i < reports.length; i++) {
    eleventyConfig.addCollection(`${reports[i]}-keyboard`, function (collectionApi) {
      return collectionApi
      .getFilteredByGlob(`${reportsFolderRelative}/${reports[i]}/issues/**/*.md`)
      .filter(item => (item.data.group === "keyboard"))
      .filter(item => !(item.data.sc === "none") && !(item.data.sc === undefined)) 
      .sort((a, b) => {
        const numbA = sanitizeNumber(a.data.sc);
        const numbB = sanitizeNumber(b.data.sc);
        if (numbA < numbB) return -1;
        if (numbA > numbB) return 1;
        return 0;
      });
    });
  }

    // create a collection of issues specific to each report, by magnification group
    for (let i=0; i < reports.length; i++) {
      eleventyConfig.addCollection(`${reports[i]}-magnification`, function (collectionApi) {
        return collectionApi
        .getFilteredByGlob(`${reportsFolderRelative}/${reports[i]}/issues/**/*.md`)
        .filter(item => (item.data.group === "magnification"))
        .filter(item => !(item.data.sc === "none") && !(item.data.sc === undefined)) 
        .sort((a, b) => {
          const numbA = sanitizeNumber(a.data.sc);
          const numbB = sanitizeNumber(b.data.sc);
          if (numbA < numbB) return -1;
          if (numbA > numbB) return 1;
          return 0;
        });
      });
    }
  // create a collection of issues specific to each report, by screenreader group
  for (let i=0; i < reports.length; i++) {
    eleventyConfig.addCollection(`${reports[i]}-screenreader`, function (collectionApi) {
      return collectionApi
      .getFilteredByGlob(`${reportsFolderRelative}/${reports[i]}/issues/**/*.md`)
      .filter(item => (item.data.group === "screenreader"))
      .filter(item => !(item.data.sc === "none") && !(item.data.sc === undefined)) 
      .sort((a, b) => {
        const numbA = sanitizeNumber(a.data.sc);
        const numbB = sanitizeNumber(b.data.sc);
        if (numbA < numbB) return -1;
        if (numbA > numbB) return 1;
        return 0;
      });
    });
  }
  // create a collection of issues specific to each report, by keyboard group
  for (let i=0; i < reports.length; i++) {
    eleventyConfig.addCollection(`${reports[i]}-cognitive`, function (collectionApi) {
      return collectionApi
      .getFilteredByGlob(`${reportsFolderRelative}/${reports[i]}/issues/**/*.md`)
      .filter(item => (item.data.group === "cognitive"))
      .filter(item => !(item.data.sc === "none") && !(item.data.sc === undefined)) 
      .sort((a, b) => {
        const numbA = sanitizeNumber(a.data.sc);
        const numbB = sanitizeNumber(b.data.sc);
        if (numbA < numbB) return -1;
        if (numbA > numbB) return 1;
        return 0;
      });
    });
  }
  
  // create a collection of “best practice” specific to each report (all issues with sc set to "none")
  for (let i=0; i < reports.length; i++) {
    eleventyConfig.addCollection(`${reports[i]}-bestpractice`, function (collectionApi) {
      return collectionApi
        .getFilteredByGlob(`${reportsFolderRelative}/${reports[i]}/best-practice/**/*.md`)
      });
  }

  // Base Config
  return {
    dir: {
        input: "src",
        output: "dist",
        includes: "_includes",
        layouts: "_layouts",
        data: "_data"
    },
    templateFormats: ["njk", "md", "css", "png", "jpg", "svg"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  }
});
