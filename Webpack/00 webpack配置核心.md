## 一、webpack 简介

官网： https://webpack.docschina.org/concepts/

本质上，webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle。

```bash
webpack -v # command not found 默认在全局环境中查找
npx webpack -v # npx帮助我们在项⽬目中的node_modules⾥里里查找webpack
./node_modules/.bin/webpack -v # 到当前的node_modules模块⾥里里指定
```

## 二、启动 webpack 执行构建

### 2.1 webpack 默认配置

- webpack 默认支持 JS 模块和 JSON 模块
- 支持 CommonJS, Es moudule, AMD 等模块类型
- webpack4 支持零配置使用,但是很弱，稍微复杂些的场景都需要额外扩展

```js
const path = require("path");
module.exports = {
  // 必填 webpack执行构建⼊口
  entry: "./src/index.js",
  output: {
    // 将所有依赖的模块合并输出到 main.js
    filename: "main.js",
    // 输出⽂文件的存放路径，必须是绝对路径
    path: path.resolve(__dirname, "./dist"),
  },
  // 模式
  // mode: 'development'
};
```

### 2.2 执行构建

```bash
npx webpack
```

## 三、webpack 配置核心概念

- 使用自定义配置文件：webpack 有默认的配置文件，叫 webpack.config.js ，我们可以对这个文件进行修改，行个性化配置

- 不使用自定义配置文件：如使用 webpack-dev.config.js，构建时执行 `webpack --config webpack-dev.config.js` 指定 webpack 使用该配置文件

### 3.1 入口(entry) & 输出(output)

```js
//单⼊口 SPA，本质是个字符串
entry:{
  main: './src/index.js'
}
// ==相当于简写===
// entry:"./src/index.js"

//多⼊口 entry是个对象
// entry:{
//   index:"./src/index.js",
//   login:"./src/login.js"
// },
output: {
  filename: "bundle.js",// 输出文件的名称
  path: path.resolve(__dirname, "dist")//输出文件到磁盘的⽬目录，必须是绝对路径
}


// 多⼊口的处理
output: {
    path: path.resolve(__dirname, 'dist'),
    // 利用占位符，⽂件名称不要重复
    filename: '[name][chunkhash:8].js'
  }
```

### 3.2 mode

> mode 用来指定当前的构建环境，设置 mode 可以自动触发 webpack 内置的函数，达到优化的效果

- development
- production
- none

### 3.3 loader

> webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效 模块，以供应用程序使用，以及被添加到依赖图中。

在 webpack 的配置中，loader 有两个属性：

1. test 属性，识别出哪些文件会被转换。
2. use 属性，定义出在进行转换时，应该使用哪个 loader

**loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)**

```js
module.exports = {
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },
      // 不对loader进行配置
      { test: /\.(png|jpe?g|gif)$/, use: ["file-loader"] },
      // 对loader进行配置
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
         {
          test: /\.(png|jpe?g|gif)$/i,
          loader: 'file-loader',
          options: {
            // 原本文件名_8位hash.原本扩展名
            name: '[name]_[hash:8].[ext]',
            outputPath: 'images/'
          },
        ]
      },
    ],
  },
};
```

- file-loader 处理图片，字体、图标 处理静态资源模块
  原理是把打包⼊口中识别出的资源模块，移动到输出目录，并且返回⼀个地址名称

  就是当我们需要模块，仅仅是从源代码挪移到打包目录，就可以使用 file-loader 来处理，txt，svg，csv，excel，图片资源等等

- url-loader file-loader 加强版本
  url-loader 内部使用了 file-loader,所以可以处理 file-loader 所有的事情，但是遇到 jpg 格式的模块，会把该图片转换成 base64 格式字符串，并打包到 js 里。对小体积的图⽚比较合适，大图片不合适。

```js
module: {
  rules: [
    {
      test: /\.(png|jpe?g|gif)$/,
      use: {
      loader: "url-loader",
      options: {
        name: "[name]_[hash].[ext]",
        outputPath: "images/",
        //⼩于2048，才转换成base64
        limit: 2048
        }
      }
    }
  ]
},
```

- style-loader, css-loader, less-loader 处理样式

Css-loader 分析 css 模块之间的关系，并合成一个 css
Style-loader 会把 css-loader 生成的内容，以 style 挂载到⻚面的 header 部分
less-load 把 less 语法转换成 css

- postcss-loader 样式自动添加前缀
  `npm i postcss-loader autoprefixer -D`
  自动补齐前缀

- ts-loader 将 Ts 转换成 js
- babel-loader 转换 ES6、7 等 js 新特性语法
- file-loader 处理图⽚片子图
- eslint-loader

## 四、plugins

plugin 可以在 webpack 运行到某个阶段的时候，帮你一些事情，类似于生命周期的概念扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
作用于整个构建过程

- HtmlWebpackPlugin

htmlwebpackplugin 会在打包结束后，自动生成⼀个 html 文件，并把打包生成的 js 模块引入到该 html 中。

```js
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  plugins: [
    new htmlWebpackPlugin({
      title: "My App",
      filename: "app.html",
      template: "./src/index.html",
    }),
  ],
};
```

- clean-webpack-plugin
  输出文件前，删除 dist 目录下文件

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
...
plugins: [
  new CleanWebpackPlugin()
]
```

- mini-css-extract-plugin

为每个引入 css 的 js 文件创建一个 css 文件

## 五、sourceMap

https://webpack.docschina.org/configuration/devtool/#devtool

源代码与打包后的代码的映射关系，通过 sourceMap 定位到源代码。在 dev 模式中，默认开启，关闭的话 可以在配置文件里`devtool:"none"`

参数：

- none
- eval
- eval-cheap-source-map

## 六、WebpackDevServer

https://webpack.docschina.org/configuration/dev-server/#devserver

### 6.1 热更新

每次改完代码都需要重新打包一次，打开浏览器，刷新一次，很麻烦我们可以安装使用 webpackdevserver 来改善这块的体验

启动服务后，会发现 dist 目录没有了，这是因为 devServer 把打包后的模块不会放在 dist 目录下，而是放到内存中，从而提升速度

### 6.2 跨域

联调期间，前后端分离，直接获取数据会跨域，上线后我们使用 nginx 转发，开发期间，webpack 就可以搞定这件事

### 6.3 Hot Module Replacement (HMR:热模块替换)

webpack 自带模块，不需要安装

用于模块刷新，不刷新浏览器窗口

_HMR 支持 style-loader css 处理方式，不支持抽离成独立文件的方式_

_注意启动 HMR 后，css 抽离会不不⽣生效，还有不不⽀支持 contenthash，chunkhash_

**HMR 处理 js 模块**

js 模块热更新，需要手动监听需要 HMR 的模块，当该模块内容发送改变，会触发回调

```js
if (module.hot) {
  module.hot.accept("./b", function () {
    // 回调函数
  });
}
```

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    proxy: {
      // 对 /api/users 的请求会将请求代理到 http://localhost:9092/users
      "/api": {
        target: "http://localhost:9092",
        // 如果不希望传递/api，则需要重写路径 不写 pathRewrite 将代理到 http://localhost:9092/api/users
        pathRewrite: { "^/api": "" },
        // 默认情况下，代理时会保留主机头的来源，可以将 changeOrigin 设置为 true 以覆盖此行为
        // 如果是域名 需要额外添加 changeOrigin
        changeOrigin: true,
        hotOnly: true,
      },
    },
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
```

## 七. babel 处理 es6

bebel -> 分析依赖 -> AST(抽象语法树) -> 生成代码

`npm i babel-loader @babel/core @babel/preset-env -D`

1. babel-loader 是 webpack 与 babel 的通信桥梁，不会做把 es6 转成 es5 的工作，这部分工作需要用到@babel/preset-env 来做
2. @babel/preset-env 里包含了 es，6，7，8 转 es5 的转换规，是面向未来的插件

```js
// Webpack.config.js
module.exports = {
  mudule: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
```

### @babel/polyfill

`npm install --save @babel/polyfill`

```js
// index.js
// 默认会把所有特性注⼊， 打包体积会增大
import "@babel/polyfill";
```

按需加载

```js
// Webpack.config.js
module.exports = {
  mudule: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    // 指定支持到哪一个浏览器版本
                    edge: "17",
                    firefox: "60",
                    chrome: "67",
                    safari: "11.1",
                  },
                  corejs: 2, //新版本需要指定核⼼心库版本
                  useBuiltIns: "usage", //按需注⼊
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
```
