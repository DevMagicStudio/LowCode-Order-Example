# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's Take Over mode by following these steps:

1. Run `Extensions: Show Built-in Extensions` from VS Code's command palette, look for `TypeScript and JavaScript Language Features`, then right click and select `Disable (Workspace)`. By default, Take Over mode will enable itself if the default TypeScript extension is disabled.
2. Reload the VS Code window by running `Developer: Reload Window` from the command palette.

You can learn more about Take Over mode [here](https://github.com/johnsoncodehk/volar/discussions/471).

## 项目准备
```
1、node环境 16.16.0
   npm 8.11.0
   vite 3.0.7 (vite-plugin-theme 的vite不支持3.1.0)
2、插件
  volar (禁用vetur)
  VSCodeUserSetup-x64-1.71.0.exe (别名跳转)
  EditorConfig (LF格式转换)

```

## 开发规范

```
应用级别： 项目框架（主题、导航栏模式、界面功能、国际化...）、框架级别组件（@/components）
非应用级别：后台生成模板数据

1、 本地缓存：
    key值名称  应用级别：全部大写 + 下划线
               非应用： 小写

2、枚举及类型定义
  应用级别： 全局型 /types/**.d.ts
             局部 /src/types/**.ts

  非应用级别： /src/types/modules/**.ts

3、.vue文件格式
  <script setup lang="ts">
  1、文件引用
    //依赖库相关（函数、types、enums...)

    //组件：
      //UI组件库组件
      //项目组件

    // 全局状态

    // 国际化

    // Api

    //工具类Utils

    //类型type/enums

  2、属性定义
    // props

    // inject

    //emit定义

    // 响应变量

    // 非响应变量

    //计算属性Computed

    //监听器Watch

    //生命周期钩子

    //自定义函数

    //provide

    //defineExpose

  </script>

  <template></template>

  <style lang="less" scoped>
    @prefix-cls: ~'@{namespace}-自定义后缀名';

    .@{prefix-cls} {
      ...
    }


  </style>

3、/src/types/modules/**.ts 定义接口、类及枚举, 大写开头的驼峰式命名

  // enum

  // interface

  // class

4、/src/components/** 公共组件 
  .vue文件命名 大写驼峰
  .ts文件命名 小写驼峰

```

## 对接后台模板规范
```
1、模板路径映射
  "templates": {
    "viewenum": {
      "template": "vueenum",
      "directory": "{0}.Client\\src\\types\\modules"
    },
    "viewtype": {
      "template": "vuetype",
      "directory": "{0}.Client\\src\\types\\modules"
    },
    "viewapi": {
      "template": "vueapi",
      "directory": "{0}.Client\\src\\api"
    },
    "viewpage": {
      "template": "vuepage",
      "directory": "{0}.Client\\src\\views"
    },
    "viewrouter": {
      "template": "vuerouter",
      "directory": "{0}.Client\\src\\router\\routes\\modules"
    }
  }

```

## Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

