module.exports = function (config) {
  var headless = process.env.CI === 'true'
  var preprocessors = {}
  preprocessors['./*.js'] = ['coverage']
  preprocessors['./tests/**/*.js'] = ['browserify']

  var browsers = headless ? ['PhantomJS'] : ['Chrome']

  config.set({
    basePath: '.',
    reporters: ['progress', 'coverage'],
    frameworks: ['browserify', 'mocha', 'chai'],
    browsers: browsers,
    preprocessors: preprocessors,
    files: [
      './tests/*.js'
    ],
    browserify: {
      debug: true,
      transform: ['babelify', 'browserify-istanbul'],
      configure: function (bundle) {
        bundle.on('prebundle', function () {})
      }
    },
    client: {
      mocha: {
        reporter: 'html'
      }
    },
    junitReporter: {
      outputFile: '_karma.xml',
      suite: ''
    },
    coverageReporter: {
      dir: 'coverage',
      reporters: [
        { type: 'lcov',
          subdir: 'report-lcov'
        },
        {
          type: 'cobertura',
          subdir: '.',
          file: 'cobertura.xml'
        }, {
          absolutePath: true,
          type: 'html',
          subdir: '.'
        }
      ]
    },
    phantomjsLauncher: {
      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },
    singleRun: headless
  // logLevel: 'DEBUG'
  })
}
