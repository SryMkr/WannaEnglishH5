# WannaEnglishH5

WannaEnglish 外部 H5 玩家中心。

## 目录

- `index.html`: 玩家中心入口。
- `questionnaire/index.html`: 问卷页占位，后续迁移游戏内问卷。
- `vocabulary-contribution/index.html`: 词条贡献原型页。
- `shared/`: 后续放共享样式、API 客户端和 token/session 逻辑。

## 部署关系

- H5 前端可部署到 `https://app.lyzlearn.com` 或服务器静态目录。
- 后端继续复用现有 `WannaEnglishserver`。
- 数据库继续复用现有 WannaEnglish 数据库。
- 游戏内入口后续生成带短期 token 的 H5 链接或二维码。
