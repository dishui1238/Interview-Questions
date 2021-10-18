## webpack 生态中存在多种计算 hash 的方式

- hash
- chunkhash
- contenthash

hash 代表每次 webpack 编译中生成的 hash 值，所有使用这种方式的文件 hash 都相同。每次构建都会使 webpack 计算新的 hash。

chunkhash 基于入口文件及其关联的 chunk 形成，某个文件的改动只会影响与它有关联的 chunk 的 hash 值，不会影响其他文件

contenthash 根据文件内容创建。当文件内容发生变化时，contenthash 发生变化
