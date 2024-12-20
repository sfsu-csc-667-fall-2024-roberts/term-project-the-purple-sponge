import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
dotenv.config();

// change build
const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config: webpack.Configuration = {
  entry: {
    main: path.join(process.cwd(), 'src', 'client', 'main.ts'),
    clientchat: path.join(process.cwd(), "src", "client", "clientchat.ts")
  },
  mode,
  output: {
    path: path.join(process.cwd(), 'src', 'public', 'js'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};

export default config;
