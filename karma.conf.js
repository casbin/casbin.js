module.exports = function(config) {
    config.set({
      frameworks: ['mocha', 'chai'],
      files: ['test/**/*.js', 'dist/**/*.js'],
      reporters: ['progress'],
      port: 9876,  // karma web server port
      colors: true,
      logLevel: config.LOG_INFO,
      browsers: ['ChromeHeadless'],
      autoWatch: false,
      // singleRun: false, // Karma captures browsers, runs the tests and exits
      concurrency: Infinity
    })
  }