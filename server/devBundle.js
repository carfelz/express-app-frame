import config from "../config/config";
import webpack from 'webpack'
import webpackMiddleWare from 'webpack-dev-middleware'
import webpackHotMiddleWare from 'webpack-hot-middleware'
import webpackConfig from '../webpack.config.client'

const compile = (app) =>{
    if(config.env === "development"){
        const compiler = webpack(webpackConfig)
        const middleware = webpackHotMiddleWare(compiler, {
            publickPath: webpackConfig.output.publicPath
        })
        app.use(middleware)
        app.use(webpackHotMiddleWare(compiler))
    }
}

export default {
    compile
}