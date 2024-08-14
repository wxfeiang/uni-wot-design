## 升级uni-app

npx @dcloudio/uvm@latest
npx @dcloudio/uvm@ 3.0.0-alpha-4000120240201002

## 类型报错提示

pnpm add -D @types/node

## 项目说明

pnpm

## 项目文档

## 发布微信

# 仅编译uni-app项目到微信小程序

cli publish --platform mp-weixin --project 项目名称

# 编译uni-app项目到微信小程序，并上传发行小程序到微信平台

cli publish --platform mp-weixin --project 项目名称 --upload true --appid 小程序appid --description 发布描述 --version 发布版本 --privatekey 小程序上传密钥文件

cli publish --platform mp-weixin --project 项目名称 --upload true --appid 小程序appid --description 发布描述 --version 发布版本 --privatekey 小程序上传密钥文件 --robot 2

## 文件说明

```
.
├── .commitlintrc.cjs
├── .editorconfig
├── .eslintignore
├── .eslintrc-auto-import.json
├── .eslintrc.cjs
├── .gitignore
├── .husky   ------ 规范化提交
│   ├── \_
│   │   ├── .gitignore
│   │   └── husky.sh
│   ├── commit-msg
│   └── pre-commit
├── .npmrc
├── .prettierignore
├── .prettierrc.cjs
├── .stylelintignore
├── .stylelintrc.cjs
├── .vscode   ---- 编辑气必备配置
│   ├── extensions.json
│   ├── settings.json
│   └── vue3.code-snippets
├── README.md
├── env    ----- 环境变量
│   ├── .env
│   ├── .env.development
│   ├── .env.production
│   └── .env.test
├── favicon.ico
├── index.html
├── manifest.config.ts
├── package.json
├── pages.config.ts
├── pnpm-lock.yaml
├── src
│   ├── App.vue
│   ├── components     -----自定义组件
│   │   ├── .gitkeep
│   │   ├── dy-title
│   │   │   └── dy-title.vue
│   │   └── dy-verify
│   │       └── dy-verify.vue
│   ├── enum   ------枚举基础类型
│   │   ├── CacheEnum.ts
│   │   ├── HttpCodeEnum.ts
│   │   ├── RouteEnum.ts
│   │   └── constant.ts
│   ├── enums  ------枚举系统类型
│   │   ├── appEnum.ts
│   │   ├── cacheEnum.ts
│   │   ├── constant.ts
│   │   ├── httpEnum.ts
│   │   ├── platformEnum.ts
│   │   └── routerEnum.ts
│   ├── env.d.ts
│   ├── hooks ---自定义hooks
│   │   ├── .gitkeep
│   │   ├── useImageVerify.ts
│   │   ├── useSystemFig.ts
│   │   ├── useUpdateApp.ts
│   │   └── useUpload.ts
│   ├── interceptors ----- 类型提示
│   │   ├── index.ts
│   │   ├── prototype.ts
│   │   ├── route.ts
│   │   └── utils.ts
│   ├── layouts ----- 根组件
│   │   ├── default.vue
│   │   └── demo.vue
│   ├── main.ts
│   ├── manifest.json
│   ├── pages ------ 页面组件
│   │   ├── index
│   │   │   └── index.vue
│   │   └── login
│   │   ├── index.vue
│   │   └── utils
│   │   └── useLogin.ts
│   ├── pages-sub ------ 所有的分包页面
│   │   ├── demo
│   │   │   └── index.vue
│   │   └── ranking
│   │   └── components
│   ├── pages.json ------- 自动生成配置文件
│   ├── service ------- 系统请求服务相关接口
│   │   ├── api
│   │   │   ├── auth.ts
│   │   │   ├── source.ts
│   │   │   ├── system.ts
│   │   │   └── user.ts
│   │   └── model ------- 请求定义类型提示
│   │   ├── authModel.d.ts
│   │   ├── baseModel.d.ts
│   │   └── userModel.d.ts
│   ├── static
│   │   ├── app ----- app logo
│   │   │   └── icons
│   │   │   ├── 1024x1024.png
│   │   │   ├── 120x120.png
│   │   │   ├── 144x144.png

│   │   ├── images
│   │   │   └── .gitkeep
│   │   ├── logo.svg
│   │   └── tabbar
│   │   ├── example.png
│   │   ├── exampleHL.png
│   │   ├── home.png
│   │   ├── homeHL.png
│   │   ├── personal.png
│   │   └── personalHL.png
│   ├── store -------- 全局数据状态管理文件
│   │   ├── index.ts
│   │   ├── modules
│   │   │   └── system.ts
│   │   └── user.ts
│   ├── style
│   │   ├── iconfont.css
│   │   └── index.scss
│   ├── types
│   │   ├── auto-import.d.ts
│   │   ├── global.d.ts
│   │   ├── shims-uni.d.ts
│   │   └── uni-pages.d.ts
│   ├── typings.ts
│   ├── uni.scss
│   ├── uni_modules
│   │   └── .gitkeep
│   └── utils
│   ├── aes ----------- 系统加解密相关
│   │   ├── aesMgr.ts
│   │   ├── base64Encode.ts
│   │   ├── encryptUtils.ts
│   │   ├── filter.ts
│   │   ├── jsencrypt.ts
│   │   └── uuid.ts
│   ├── http
│   │   ├── checkStatus.ts
│   │   └── index.ts
│   ├── index.ts
│   ├── platform.ts
│   └── uniapi
│   ├── index.ts
│   └── prompt.ts
├── tsconfig.json
├── uno.config.ts
└── vite.config.ts

```

## UI地址

[unibest 框架](https://codercup.github.io/unibest-docs/)

[wot-design UI库](https://wot-design-uni.pages.dev/)

## 代码提交相关

pnpm cz

# Commit Message 类型

| 类型     | 描述                                                 |
| -------- | ---------------------------------------------------- |
| feat     | 新增功能、页面                                       |
| fix      | 修补bug                                              |
| docs     | 修改文档、注释                                       |
| style    | 格式：不影响代码运行的变动、空格、格式化等等         |
| ui       | ui修改：布局、css样式等等                            |
| hotfix   | 修复线上紧急bug                                      |
| build    | 改变构建流程，新增依赖库、工具等（例如:修改webpack） |
| refactor | 代码重构，未新增任何功能和修复任何bug                |
| revert   | 回滚到上一个版本                                     |
| perf     | 优化：提升性能、用户体验等                           |
| ci       | 对CI/CD配置文件和脚本的更改                          |
| chore    | 其他不修改src或测试文件的更改                        |
| test     | 测试用例：包括单元测试、集成测试                     |
| update   | 更新：普通更新                                       |

## 请求相关

[alova.js 请求库](https://alova.js.org/zh-CN/tutorial/getting-started/method)

### Post

**注意：** 3个参数位置

```
Post(
    DOWNFILE,  // 请求地址
    {
       userId: 2,     // post 参数 JSON 格式
    },
    {
      responseType: 'arraybuffer',  // 配置参数
      params: {     // 地址栏参数  必须是key为params
        userId: 2,
      },
    },
  );

```

### Get

**注意：** 2个参数位置

```
Get(
    DOWNFILE,  // 请求地址
    {
      responseType: 'arraybuffer',  // 配置参数
      params: {     // 地址栏参数  必须是key为params
        userId: 2,
      },
    },

  );
```

```
带参数 携带额外信息  参数位置初始化空缺
export function sysLogin(params: any, config: any) {
  console.log('🌯[params]:', params)
  return useRequest(
    (newTodo) =>
      request.Post(
        LOGIN, // 地址
        newTodo, // 参数
        {
          // 其他
          responseType: 'arraybuffer', // 配置参数
          meta: {
            token: '123456',
          },
        },
      ),
    { ...config },
  )
}

```

```
export function getMessageList(data: any, config: CONFIGN) {
  const methodInstance = request.Post(
    MESSAGE_LIST, // 请求地址
    data,
  )
  const meta: METHOD_INSTANCE = {
    ignoreSign: true,
    ignorEencrypt: true,
    ignorToken: true,
    resAll: true,
  }
  methodInstance.meta = meta

  return useRequest(methodInstance, config)
}
```

## Router

**注意：** 路由方法已经按需加载

> 项目需要登录后的页面过多 , 现在 不拦截的页面 必须加入

```
needLogin: true
```

```
needLogin: false, // false 表示需要登录 默认不需要配置

```

## 自定义组件相关

**注意：** components 递进关系

- dy-(组件名) ====》文件夹名
  - dy-(组件名) ====》文件名

# 注意事项

## 本地资源

尽量避免直接使用本地资源作为背景图片

## css

采用原子类的写法 ,可以使用 @apply

尽量不要单独自定义样式

```
<wd-input
            type="text"
            label="验证码"
            center
            v-model="model.username"
            placeholder="请输入验证码"
            :rules="rules.username"
            custom-input-class="custom-input-right"
          >
<template #suffix>
<wd-button
size="small"
plain
custom-class="button"
:round="false"
@click="getCode"
:loading="sending"
:disabled="sending || countdown > 0" >
{{ loading ? '发送中...' : countdown > 0 ? `${countdown}S后获取` : '获取验证码' }}
</wd-button>
</template>
</wd-input>
```
