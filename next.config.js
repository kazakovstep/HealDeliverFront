/** @type {import('next').NextConfig} */
module.exports = {
    target: 'server',
    // // Добавляем функцию для проксирования запросов
    // async rewrites() {
    //     return [
    //         {
    //             source: '/register',               // любые запросы к /register
    //             destination: '/register',
    //             // или, если вместо внутреннего имени сервиса используете публичный адрес:
    //             // destination: '/register'
    //         },
    //         // при необходимости можно добавить другие правила:
    //         {
    //             source: '/api/:path*',
    //             destination: '/api/:path*',
    //         }
    //     ]
    // },
    webpack(config, options) {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            loader: '@svgr/webpack',
            options: {
                prettier: false,
                svgo: true,
                svgoConfig: {
                    plugins: [{
                        name: 'preset-default',
                        params: {
                            override: {
                                removeViewBox: false
                            }
                        }
                    }],
                },
                titleProp: true,
            },
        })

        return config
    },
}
