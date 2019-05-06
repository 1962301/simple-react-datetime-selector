 module.exports = {
 		devtool:"eval-source-map",

        entry: {
            DateTimeSelector:'./js src/DateTimeSelector.js',
        },
        output: {
            path: __dirname+"/js src",
            filename: '[name].bundle.js',
            //publicPath:"/....."   如果设置了，那么index.html里边引用的js就需要到这个文件夹下引用，如果没设，那么引用直接和index.html同一个文件夹
        },

        devServer:{
        	contentBase:__dirname,
        	inline:true
        },
        module: {
            rules: [
                {
                    test: /(\.jsx|\.js)$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/env", "@babel/react"
                            ],
                            plugins:["@babel/plugin-proposal-class-properties"]

                        }
                    },
                    exclude: /node_modules/
                },
                {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options:{
                            modules:true,
                            localIdentName:"[name]__[local]--[hash:base64:5]"
                        }
                    }
                ]
            }
            ]
        }
    }