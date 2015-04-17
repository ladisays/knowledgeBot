'use strict';

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    exclude: [],


    ngHtml2JsPreprocessor: {
      stripPrefix: 'public/',
      moduleName: 'appTemplates'
    },

    preprocessors: {
      '**/*.html': ['ng-html2js']
    },

    jshintPreprocessor: {},
    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-jshint-preprocessor',
      'karma-ng-html2js-preprocessor'
    ],

    singleRun: false
  });
};
