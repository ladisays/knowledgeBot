exports.config = {
  allScriptsTimeout: 10000,

  capabilities: {
    'browserName': 'chrome'
  },

  seleniumServerJar: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-2.44.0.jar',

  chromeDriver: './node_modules/chromedriver/bin/chromedriver',

  framework: 'jasmine',

  onPrepare: function() {
    browser.driver.manage().window().maximize();
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};