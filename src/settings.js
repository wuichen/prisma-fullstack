/**
 * Isomorphic settings file (hence not typescript and commonjs notation)
 */

module.exports.urls = {
  authors: 'authors',
  articles: 'articles',
  netlify: {
    preview: '/.netlify/functions/preview',
  },
  linkedin: 'https://www.linkedin.com/company/narative',
  instagram: 'http://instagram.com/narative.co',
  dribbble: 'http://dribbble.com/narativestudio',
  twitter: 'https://twitter.com/narative',
  facebook: 'https://www.facebook.com/narative.co',
};

module.exports.imageQuality = 100;

/**
 * What size do we want to cut hero images to?
 */
module.exports.heroImageDimensions = [
  ['CardPreview', 1200, 680],
  ['Article__Featured', 1200, 825],
  ['Article__Hero', 3200, 2200],
];
