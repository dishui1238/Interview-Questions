## webpack 的作用

- 模块打包。可以将不同模块的文件打包整合在一起，并且保证它们之间的引用正确，执行有序。利用打包我们就可以在开发的时候根据我们自己的业务自由划分文件模块，保证项目结构的清晰和可读性。

- 编译兼容。在前端的“上古时期”，手写一堆浏览器兼容代码一直是令前端工程师头皮发麻的事情，而在今天这个问题被大大的弱化了，通过 webpack 的 Loader 机制，不仅仅可以帮助我们对代码做 polyfill，还可以编译转换诸如.less, .vue, .jsx 这类在浏览器无法识别的格式文件，让我们在开发的时候可以使用新特性和新语法做开发，提高开发效率。

- 能力扩展。通过 webpack 的 Plugin 机制，我们在实现模块化打包和编译兼容的基础上，可以进一步实现诸如按需加载，代码压缩等一系列功能，帮助我们进一步提高自动化程度，工程效率以及打包输出的质量。

## 常见 loader

- file-loader：把⽂件输出到⼀个⽂件夹中，在代码中通过相对 URL 去引⽤输出的⽂件
- url-loader：和 file-loader 类似，但是能在⽂件很⼩的情况下以 base64 的⽅式把⽂件内容注⼊到代码中去
- source-map-loader：加载额外的 Source Map ⽂件，以⽅便断点调试
- image-loader：加载并且压缩图⽚⽂件
- babel-loader：把 ES6 转换成 ES5
- css-loader：加载 CSS，⽀持模块化、压缩、⽂件导⼊等特性
- style-loader：把 CSS 代码注⼊到 JavaScript 中，通过 DOM 操作去加载 CSS。
- eslint-loader：通过 ESLint 检查 JavaScript 代码

## 常见 plugin

- ProvidePlugin：自动加载模块，代替 require 和 import
- html-webpack-plugin 可以根据模板自动生成 html 代码，并自动引用 css 和 js 文件
- extract-text-webpack-plugin  将 js 文件中引用的样式单独抽离成 css 文件
- DefinePlugin  编译时配置全局变量，这对开发模式和发布模式的构建允许不同的行为非常有用。
- HotModuleReplacementPlugin  热更新
- optimize-css-assets-webpack-plugin  不同组件中重复的 css 可以快速去重
- webpack-bundle-analyzer  一个 webpack 的 bundle 文件分析工具，将 bundle 文件以可交互缩放的 treemap 的形式展示。
- compression-webpack-plugin  生产环境可采用 gzip 压缩 JS 和 CSS
- happypack：通过多进程模型，来加速代码构建
- clean-wenpack-plugin  清理每次打包下没有使用的文件
- speed-measure-webpack-plugin:可以看至 U 每个 Loader 和 Plugin 执行耗时（整个扌丁包耗时、每个 Plugin 和 Loader 耗时）
- webpack-bundle-analyzer:可视化 Webpack 输出文件的体积（业务组件、依赖第三方模块

## webpack 打包运行原理

1. 初始化参数：读取 webpack 的配置参数；
2. 开始编译：启动 webpack，创建 Compiler 对象并开始解析项目；
3. 确定入口：从入口文件（entry）开始解析，并且找到其导入的依赖模块，递归遍历分析，形成依赖关系树；
4. 编译模块：对不同文件类型的依赖模块文件使用对应的 Loader 进行编译，最终转为 Javascript 文件；
5. 整个过程中 webpack 会通过发布订阅模式，向外抛出一些 hooks，而 webpack 的插件即可通过监听这些关键的事件节点，执行插件任务进而达到干预输出结果的目的。
6. 输出：将编译后的 Module 组合成 Chunk，将 Chunk 转换成文件，输出到文件系统中

## source map 是什么？生产环境怎么用？

source map 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。

map 文件只要不打开开发者工具，浏览器是不会加载的。
线上环境一般有三种处理方案：

- hidden-source-map：借助第三方错误监控平台 Sentry 使用
- nosources-source-map：只会显示具体行数以及查看源代码的错误栈。安全性比 sourcemap 高
- sourcemap：通过 nginx 设置将 .map 文件只对白名单开放(公司内网)

在 development 模式下，是默认开启 SourceMap 的

```js
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: {
        main: './src/index.js',
    },
```

- `inline-source-map`: 将不再生成 map.js 文件，而是通过 data-url 的形式直接注入到我们的 main.js 文件中
- `inline-cheap-source-map`: 其中 cheap 的意思是，当我们代码量很大的时候，一般报错会精确到第几行的第几个字符上，这样就会比较耗费性能，我们使用 cheap 字段就会省去精确到第几个字符的操作，并且，加上 cheap 字段后，sourceMap 只会帮我们映射我们的业务代码和打包文件之间的关系，将不会在去管第三方的一些引入代码的映射。这样的打包性能就会比 inline-source-map 高了。
- `cheap-module-source-map` 其中 module 的作用是我们开启对第三方模块的映射
- `eval`，我们设置了 eval 后会发现表面上是一样的，但其实看 main.js 中，eval 选项是通过 eval 的形式，注入进了打包代码代码一种映射关系，这种效率是最高的，但是，当我们遇到比较复杂的代码的时候，他提出出来的错误内容可能并不会很全面

## Webpack 热更新原理

Webpack 的热更新又称热替换（Hot Module Replacement），缩写为 HMR。 这个机制可以做到不用刷新浏览器而将新变更的模块替换掉旧的模块。

HMR 的核心就是客户端从服务端拉去更新后的文件，准确的说是 chunk diff (chunk 需要更新的部分)，实际上 WDS(webpack-dev-server) 与浏览器之间维护了一个 Websocket，当本地资源发生变化时，WDS 会向浏览器推送更新，并带上构建时的 hash，让客户端与上一次资源进行对比。客户端对比出差异后会向 WDS 发起 Ajax 请求来获取更改内容(文件列表、hash)，这样客户端就可以再借助这些信息继续向 WDS 发起 jsonp 请求获取该 chunk 的增量更新。

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");
module.exports = {
  entry: {
    app: "./src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    hot: true,
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      title: "Hot Module Replacement",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

## 如何优化 Webpack 的构建速度

- dll

  > 对于一些不常变更的静态依赖，比如我们项目中常见的 React 全家桶，亦或是用到的一些工具库，比如 lodash 等等，我们不希望这些依赖被集成进每一次构建逻辑中，因为它们真的太少时候会被变更了，所以每次的构建的输入输出都应该是相同的。因此，我们会设法将这些静态依赖从每一次的构建逻辑中抽离出去，以提升我们每次构建的构建效率

  使用 webpack-dll-plugin 的方式，在首次构建时候就将这些静态依赖单独打包，后续只需要引用这个早就被打好的静态依赖包即可，有点类似“预编译”的概念；
  <!-- 使用 DllPlugin 进行分包，使用 DllReferencePlugin(索引链接) 对 manifest.json 引用，让一些基本不会改动的代码先打包成静态资源，避免反复编译浪费时间。HashedModuleIdsPlugin 可以解决模块数字 id 问题 -->

- 充分利用缓存提升二次构建速度：

  - babel-loader 可以通过设置 cacheDirectory 来开启缓存，将 loader 的编译结果写入硬盘缓存，再次构建如果文件没有发生变化则会直接拉取缓存
  - terser-webpack-plugin 开启缓存
  - 如果 loader 不支持缓存，可以使用 cache-loader 或者 hard-source-webpack-plugin

- Tree shaking

  - 打包过程中检测工程中没有引用过的模块并进行标记，在资源压缩时将它们从最终的 bundle 中去掉(只能对 ES6 Modlue 生效) 开发中尽可能使用 ES6 Module 的模块，提高 tree shaking 效率
  - 禁用 babel-loader 的模块依赖解析，否则 Webpack 接收到的就都是转换过的 CommonJS 形式的模块，无法进行 tree-shaking

- 多核编译（happypack）

  ```js
  const HappyPack = require("happypack");
  const os = require("os");
  // 开辟一个线程池
  // 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
  const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

  module.exports = {
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "happypack/loader?id=js",
        },
      ],
    },
    plugins: [
      new HappyPack({
        id: "js",
        threadPool: happyThreadPool,
        loaders: [
          {
            loader: "babel-loader",
          },
        ],
      }),
    ],
  };
  ```
