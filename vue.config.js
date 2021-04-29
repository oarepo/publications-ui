const
    API_DEV = 'https://127.0.0.1:8080/',
    // API_STAGING = 'https://repozitar-test.cesnet.cz/',
    // API_PROD = 'https://repozitar.cesnet.cz/'

const fs = require('fs')
const packageJson = fs.readFileSync('./package.json')
// const version = JSON.parse(packageJson).version || '0'

module.exports = {
    devServer: {
        http2: true,
        port: 5000,
        host: '127.0.0.1',
        open: false, // opens browser window automatically
        https: true,
        // https: {
        // key: fs.readFileSync('/Users/miroslavsimek/.ssh/dev/server-key.pem'),
        // cert: fs.readFileSync('/Users/miroslavsimek/.ssh/dev/server.pem'),
        // ca: fs.readFileSync('/Users/miroslavsimek/.ssh/dev/ca.pem'),
        // },
        // vueDevtools: true,
        proxy: {
            '/': {
                target: API_DEV,
                changeOrigin: false,
                secure: false,
                debug: true,
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1 &&
                        !req.path.startsWith('/oauth') &&
                        !req.path.startsWith('/2.0') &&
                        !req.path.startsWith('/api/oauth')) {
                        console.log('Skipping proxy for browser request.')
                        return '/index.html'
                    }
                }
            }
        }
    },
    pluginOptions: {
        quasar: {
            framework: {
                cssAddon: true,
            },
            importStrategy: 'kebab',
            rtlSupport: false
        }
    },
    transpileDependencies: [
        'quasar'
    ]
}
