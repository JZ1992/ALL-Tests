const path = require('path'); //nodejs的语法，引入路径模块，为了输出的时候找绝对路径
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    // entry:'./src/main.js',  //入口文件为main.js  
    // output:{    //输出
    //     path:path.resolve(__dirname,'dist'),    //path.resolve为nodejs的固定语法，用于找到当前文件的绝对路径
    //     filename:'bundle.js'    //输出的文件名
    // },



    // entry: {
    //     one: './src/1.js',
    //     two: './src/2.js'
    // },
    // output: {
    //     filename: '[name].bundle.js', //可以以name/id/hash放在中括号里区分文件名
    //     path: path.resolve(__dirname, 'dist'),
    // }


    // entry: ['./src/1.js', './src/2.js'],
    // output: {
    //     filename: '[name].bundle.js', //可以以name/id/hash放在中括号里区分文件名
    //     path: path.resolve(__dirname, 'dist'),
    // },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: './src/template.html', //模板文件地址
    //         customName:'自定义的文件名字'
    //     })
    // ],

    // entry: {
    //     one: './src/1.js',
    //     two: './src/2.js'
    // },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].bundle.js'
    // },
    // plugins: [
    //     // new HtmlWebpackPlugin()


    //     // new CleanWebpackPlugin(['./dist']),  //这个一定要放在最上面，

    //     new HtmlWebpackPlugin({
    //         title: '周满001',    /*这个值对应html里的title*/
    //         template: './src/template.html', //模板文件地址
    //         filename: 'test1.html',  //文件名，默认为index.html（路径相对于output.path的值）
    //         inject: true,    //script标签的位置，true/body为在</body>标签前，head为在<head>里，false表示页面不引入js文件
    //         hash: true,  //是否为引入的js文件添加hash值
    //         chunks: ['one'], //页面里要引入的js文件，值对应的是entry里的key。省略参数会把entry里所有文件都引入
    //         //excludeChunks:['one'],//页面里不能引入的js文件，与chunks刚好相反
    //         minify: {    //html-webpack-plugin内部集成了html-minifier
    //             collapseWhitespace: true,    //压缩空格
    //             removeAttributeQuotes: true, //移除引号
    //             removeComments: true,        //移除注释
    //         },
    //     }),
    //     //生成两个文件，分别引入两个js文件（现在是一个文件里引入了两个js）
    //     new HtmlWebpackPlugin({
    //         title: '周满002',
    //         template: './src/template.html',
    //         hash: true,
    //         filename: 'test2.html',
    //         chunks: ['two']
    //     })
    // ]



    // entry: {
    //     index: './src/main.js',
    // },
    // output: {
    //     path: path.resolve(__dirname, 'dist'),
    //     filename: '[name].bundle.js'
    // },
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         title: 'zzz',
    //         template: './src/template.html',
    //         filename: 'index.html',
    //     }),
    //     // new webpack.HotModuleReplacementPlugin()    //引入热更新插件
    // ],
    // devServer: {
    //     host: 'localhost',   //服务器的ip地址
    //     port: 9946,  //端口
    //     open: true,  //自动打开页面

    //     // hot:true,   //开启热更新
    // }



    entry: {
        index: './src/js/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'zzz',
            template: './src/template.html',
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/index.css'    //文件目录会放入output.path里
        }),
        new webpack.ProvidePlugin({ //它是一个插件，所以需要按插件的用法new一个
            $:'jquery', //接收名字:模块名
        }),
    ],
    devServer: {
        host: 'localhost',
        port: 9968,
        open: true,
    },
    module: {
        rules: [
            // {
            //     test:/\.css$/,  //以点开始css结尾的文件
            //     use:['style-loader','css-loader']   //顺序不能搞错
            // }
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]  //代替style-loader
            },
            {
                test:/\.scss$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },

    optimization:{  //优化
        splitChunks:{
            cacheGroups:{//缓存组，一个对象。它的作用在于，可以对不同的文件做不同的处理
                commonjs:{
                    name:'vender',      //输出的名字（提出来的第三方库）
                    test: /\.js/,       //通过条件找到要提取的文件
                    chunks:'initial'    //只对入口文件进行处理
                }
            }
        }
    }


};