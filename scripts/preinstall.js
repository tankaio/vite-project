/**
 * 限制多人开发时统一使用统一个包管理工具
 */
// 当时用除npm之外的包管理工具（如yarn，pnpm）时，就会报错。原理就是在install时会触发preinstall（npm提供的生命周期钩子）这个文件里的代码。
if (!/npm/.test(process.env.npm_execpath || '')) {
  console.warn(
    '\u001b[33mThis repository must using npm as the package manager for scripts to work properly.\u001b[39m\n',
  )
  process.exit(1)
}
