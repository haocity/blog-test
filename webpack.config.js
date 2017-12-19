
module.exports = {
  entry: './app/main.js',
  output: {
    filename: 'bundle.js',
    path:  __dirname + "/public"
  },devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true
  },module: {
        rules:[
            {
                test: /\.js$/,
                loader:"babel-loader",
                include: /app/,
                exclude: /node_modules/,
                options: {
                    presets: ['es2015']
                }
            },{
				test: /\.css$/,
				loader: 'style-loader!css-loader',
				include: /app/,
                exclude: /node_modules/
			}
        ]
    }
};
