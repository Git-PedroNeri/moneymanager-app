// Karma configuration file, see link for more information
<<<<<<< HEAD
// https://karma-runner.github.io/0.13/config/configuration-file.html
=======
// https://karma-runner.github.io/1.0/config/configuration-file.html
>>>>>>> ac15af8aaf74cf30c9450f5acda6854dec57680d

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
<<<<<<< HEAD
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, 'coverage'), reports: [ 'html', 'lcovonly' ],
      fixWebpackSourcePaths: true
    },
    
=======
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/moneymanager-app'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
>>>>>>> ac15af8aaf74cf30c9450f5acda6854dec57680d
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
<<<<<<< HEAD
    singleRun: false
=======
    singleRun: false,
    restartOnFileChange: true
>>>>>>> ac15af8aaf74cf30c9450f5acda6854dec57680d
  });
};
