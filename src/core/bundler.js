const Bundler = require('parcel');

async function runBundle(config/* : Config */) {
    // Initializes a bundler using the entrypoint location and options provided
    const bundler = new Bundler(config.entryFile, {
        outDir: config.outDir, // The out directory to put the build files in, defaults to dist
        outFile: config.outfile, // The name of the outputFile
        publicUrl: './public', // The url to server on, defaults to dist
        watch: true, // whether to watch the files and rebuild them on change, defaults to process.env.NODE_ENV !== 'production'
        cache: false, // Enabled or disables caching, defaults to true
        cacheDir: '.cache', // The directory cache gets put in, defaults to .cache
        contentHash: false, // Disable content hash from being included on the filename
        minify: false, // Minify files, enabled if process.env.NODE_ENV === 'production'
        scopeHoist: false, // turn on experimental scope hoisting/tree shaking flag, for smaller production bundles
        target: 'browser', // browser/node/electron, defaults to browser
        https: false, // Serve files over https or http, defaults to false
        logLevel: 3, // 3 = log everything, 2 = log warnings & errors, 1 = log errors
        hmrPort: 0, // The port the HMR socket runs on, defaults to a random free port (0 in node.js resolves to a random free port)
        sourceMaps: true, // Enable or disable sourcemaps, defaults to enabled (not supported in minified builds yet)
        hmrHostname: '', // A hostname for hot module reload, default to ''
        detailedReport: false // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
    });

    // Run the bundler, this returns the main bundle
    // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
    const bundle = await bundler.bundle();
    // app.use(bundler.middleware());
}

module.exports = runBundle;