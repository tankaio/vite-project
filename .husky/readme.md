# 配置 husky + lint-staged

- 如果是在项目中途才接入eslint + prettier,yarn run lint 或者 yarn run format势必会带来大范围地改动，甚至会造成冲突。
- 对于一些不使用vscode编辑器，或者没有安装prettier和eslint插件的用户而言，他们不能享受到插件带来的协助，而他们的代码自然大概率是不符合规范的，不该被提交到代码库。

基于上述的顾虑，社区提供了 husky + lint-staged的渐进式方案。lint-staged 是一个只检测git暂存区的lint工具，husky是一个用来给我们的项目添加git hook的工具，git hook是进行git操作会触发的脚本，例如：提交的时候会触发pre-commit钩子,输入提交信息会触发commit-msg钩子。 我们用husky安装pre-commit钩子，我们就可以在进行git commit操作的时候，运行我们的脚本来检测待提交的代码是否规范，便可以只对暂存区的文件进行检查。

首先安装依赖

```zsh
yarn add husky lint-staged -D
```

添加一个在package.json中添加一条preinstall脚本

```zsh
{
    "script":{
        "prepare": "husky install"
    }
}
```

prepare脚本会在 yarn install 之后自动运行，这样依赖你的小伙伴clone了你的项目之后会自动安装husky,这里由于我们已经运行过 yarn install 了，所以我们需要手动运行一次yarn run prepare,然后我们就会得到一个目录.husky。

接下来我们为我们git仓库添加一个pre-commit钩子,运行

```zsh
npx husky add .husky/pre-commit "npx --no-install lint-staged"
```

这会在我们的.husky目录下生成一个pre-commit的脚本

```shell
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install lint-staged
```

接下来我们配置lint-staged,在package.json中添加下面的配置信息。

```json
{
  "lint-staged": {
    "*.{js,vue,ts,jsx,tsx}": ["prettier --write", "eslint --fix"],
    "*.{html,css,less,scss,md}": ["prettier --write"]
  }
}
```

这样之后，我们后续提交到暂存区的代码也就会被eslint+prettier格式化和检查，进一步保证我们的代码规范。
