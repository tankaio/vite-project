module.exports = {
    // 设置我们的运行环境为浏览器 + es2021 + node ,否则eslint在遇到 Promise，window等全局对象时会报错
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    // 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
    "extends": [
        // 全部规则默认是关闭的，这个配置项开启推荐规则，推荐规则参照文档
        "eslint:recommended",
        // ts语法规则
        "plugin:@typescript-eslint/recommended",
        // vue3语法规则
        "plugin:vue/vue3-essential",
        // eslint 的规则有时会和 prettier 相冲突，保存时先启用了 eslint --fix 修复了，然后又运行了 prettier 格式化，所以屏幕一闪又回到了这个状态。
        // 冲突的本质在于 eslint既负责了代码质量检测，又负责了一部分的格式美化工作,格式化部分的部分规则和 prettier不兼容。 能不能让eslint只负责代码质量检测而让prettier负责美化呢? 好在社区有了非常好的成熟方案，即 eslint-config-prettier + eslint-plugin-prettier。
        // eslint-config-prettier 的作用是关闭eslint中与prettier相互冲突的规则。
        // eslint-plugin-prettier 的作用是赋予eslint用prettier格式化代码的能力，用eslint-plugin-prettier来使eslint使用prettier的规则来美化代码。 安装好这两个依赖，并修改.eslintrc文件如下。
        // 新增 plugin:prettier/recommended 这个规则
        "plugin:prettier/recommended" // 新增，必须放在最后面
    ],
    // 要为特定类型的文件指定处理器
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    // 默认情况下，ESLint 使用 Espree 作为其解析器。
    // 你可以在使用 parser 选项指定 npm 模块作为解析器。例如，下面指定使用 Esprima 而不是 Espree：
    // "parser": "esprima",
    // 解析器选项
    "parserOptions": {
        "ecmaVersion": "latest",
        // Babel-ESlint babel解析器
        "parser": "@typescript-eslint/parser", // ts解析器
        "sourceType": "module"
    },
    // Eslint支持使用第三方插件
    // 添加vue和@typescript-eslint插件，增强eslint的能力
    // eslint-plugin-前缀可以从插件名称中被省略
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    /*
    * "off" 或 0    ==>  关闭规则
    * "warn" 或 1   ==>  打开的规则作为警告（不影响代码执行）
    * "error" 或 2  ==>  规则作为一个错误（代码不能执行，界面报错）
    */
   "rules": {
    // eslint（https://eslint.bootcss.com/docs/rules/）
    "quotes": [2, 'single'],
    "semi": [2, 'never'],
    'no-var': 'error', // 要求使用 let 或 const 而不是 var
    'no-multiple-empty-lines': ['warn', { max: 1 }], // 不允许多个空行
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unexpected-multiline': 'error', // 禁止空余的多行
    'no-useless-escape': 'off', // 禁止不必要的转义字符
    'no-undef': 'off',

    // typeScript (https://typescript-eslint.io/rules)
    '@typescript-eslint/no-unused-vars': 'error', // 禁止定义未使用的变量
    '@typescript-eslint/prefer-ts-expect-error': 'error', // 禁止使用 @ts-ignore
    '@typescript-eslint/no-explicit-any': 'off', // 禁止使用 any 类型
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off', // 禁止使用自定义 TypeScript 模块和命名空间。
    '@typescript-eslint/semi': 'off',

    // eslint-plugin-vue (https://eslint.vuejs.org/rules/)
    'vue/multi-word-component-names': 'off', // 要求组件名称始终为 “-” 链接的单词
    'vue/script-setup-uses-vars': 'error', // 防止<script setup>使用的变量<template>被标记为未使用
    'vue/no-mutating-props': 'off', // 不允许组件 prop的改变
    'vue/attribute-hyphenation': 'off', // 对模板中的自定义组件强制执行属性命名样式
  },
}
