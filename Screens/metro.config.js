module.exports = {
    resolver: {
      sourceExts: ['jsx', 'js', 'ts', 'tsx'], // Add any additional extensions you're using
    },
    transformer: {
      minifierConfig: {
        keep_classnames: true,
        keep_fnames: true,
      },
    },
    server: {
        // Set the log level to 'fatal' to prevent error logs from appearing
        logLevel: 'fatal',
      },
  };
  