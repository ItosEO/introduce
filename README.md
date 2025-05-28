# 动态网站生成模板

> 基于 JSON 配置的现代化网站生成系统

## 项目介绍

这是一个轻量级的动态网站生成模板，专门为产品展示网站设计。通过简单的 JSON 配置文件，您可以快速创建一个包含产品展示、导航管理、联系信息等完整功能的专业网站。

### 核心特性

- 🎯 **JSON 配置驱动** - 通过配置文件轻松管理网站内容，无需修改代码
- 🎨 **多样化展示** - 支持多种产品展示类型和专业徽章效果
- ⚡ **响应式动画** - 流畅的滚动动画和交互效果
- 🎛️ **主题系统** - 可自定义的色彩和渐变主题
- 📱 **移动优先** - 完全响应式设计，支持移动端优化
- 🚀 **性能优化** - 纯原生技术，轻量级快速加载
- 🔧 **易于部署** - 静态文件，支持各种部署平台

### 适用场景

- 产品展示网站
- 软件工具集合展示
- 公司产品介绍页面
- 个人项目展示
- SaaS产品着陆页

## 项目结构

```
introduce/
├── config.json          # 网站配置文件（核心）
├── config-loader.js     # 配置加载器
├── index.html          # 主页面模板
├── script.js           # 交互逻辑
├── style.css           # 样式文件
└── README.md           # 使用文档
```

## 快速开始

### 1. 下载模板

```bash
# 克隆或下载项目文件
git clone [repository-url]
cd introduce
```

### 2. 配置网站内容

编辑 `config.json` 文件，自定义您的网站内容：

```json
{
  "site": {
    "title": "您的网站标题",
    "logo": {
      "icon": "🌟",
      "text": "您的品牌名称"
    },
    "description": "网站描述"
  },
  "products": [
    {
      "id": "product-1",
      "title": "产品名称",
      "description": "产品描述",
      "visualType": "stats"
    }
  ]
}
```

### 3. 本地预览

使用任意 HTTP 服务器运行：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .

# 使用 Live Server (VS Code扩展)
```

浏览器访问 `http://localhost:8000` 预览效果。

### 4. 部署上线

将所有文件上传到您的服务器或托管平台即可。

## 配置文件详解

`config.json` 是整个网站的核心配置文件，通过修改此文件即可自定义网站的所有内容。

### 基本配置结构

```json
{
  "site": { /* 网站基本信息 */ },
  "navigation": [ /* 导航菜单 */ ],
  "hero": { /* 首页横幅 */ },
  "products": [ /* 产品列表 */ ],
  "contact": { /* 联系信息 */ },
  "animations": { /* 动画设置 */ },
  "theme": { /* 主题配置 */ }
}
```

### 1. 网站基本信息 (`site`)

设置网站的基本信息：

```json
{
  "site": {
    "title": "您的网站标题",
    "logo": {
      "icon": "🌟",
      "text": "您的品牌名称"
    },
    "description": "网站描述文字"
  }
}
```

### 2. 导航菜单 (`navigation`)

配置顶部导航菜单：

```json
{
  "navigation": [
    { "text": "首页", "href": "#home" },
    { "text": "产品一", "href": "#product-1" },
    { "text": "产品二", "href": "#product-2" },
    { "text": "联系我们", "href": "#contact" }
  ]
}
```

### 3. 首页横幅 (`hero`)

设置首页的主要展示区域：

```json
{
  "hero": {
    "badge": "✨ 新产品发布",
    "title": {
      "line1": "创新",
      "line2": "改变世界",
      "gradientLine": 2
    },
    "subtitle": "产品的详细介绍文字",
    "buttons": [
      {
        "text": "立即体验",
        "href": "#products",
        "type": "primary"
      },
      {
        "text": "了解更多",
        "href": "#contact",
        "type": "secondary"
      }
    ]
  }
}
```

### 4. 产品展示 (`products`)

这是网站的核心部分，展示您的产品或服务：

```json
{
  "id": "product-1",
  "badge": "付费",
  "title": "产品名称",
  "subtitle": "产品副标题",
  "description": "产品的详细描述文字...",
  "icon": "🎯",
  "layout": "normal",
  "features": [
    {
      "icon": "⚡",
      "title": "特性标题",
      "description": "特性描述"
    }
  ],
  "stats": [
    {
      "number": "99%",
      "label": "满意度"
    }
  ],
  "link": {
    "text": "了解更多",
    "url": "https://example.com"
  },
  "visualType": "stats"
}
```

#### 重要配置项说明：

**visualType 展示类型**：
- `stats` - 数据统计展示
- `chart` - 图表
- `opt` - 优化界面预览（移动端按钮自动隐藏）
- `advanced`
- `professional` - 专业版徽章（金色PRO徽章动画）

**产品徽章 (badge)**：
- `付费` - 显示金色样式
- `免费` - 显示绿色样式

**布局样式 (layout)**：
- `normal` - 标准布局
- `reverse` - 反向布局

### 5. 联系信息 (`contact`)

设置页面底部的联系信息和统计数据：

```json
{
  "contact": {
    "title": {
      "line1": "联系",
      "line2": "我们",
      "gradientLine": 1
    },
    "description": "公司或产品的简介文字",
    "stats": [
      {
        "number": "1000+",
        "label": "用户"
      },
      {
        "number": "99%",
        "label": "满意度"
      }
    ],
    "copyright": "&copy; 2025 您的公司名. 保留所有权利。"
  }
}
```

#### 备案信息配置（可选）

如果需要显示备案信息，可以添加：

```json
{
  "filing": {
    "icp": {
      "number": "ICP备案号",
      "url": "https://beian.miit.gov.cn/"
    },
    "police": {
      "number": "公安备案号",
      "url": "公安备案链接"
    }
  }
}
```

### 6. 动画配置 (`animations`)

自定义网站的动画效果：

```json
{
  "animations": {
    "particles": {
      "enabled": true,
      "count": 50,
      "color": "102, 126, 234",
      "maxDistance": 100
    },
    "loadingDuration": 2000,
    "scrollAnimations": true
  }
}
```

**配置说明**：
- `particles.enabled` - 是否启用粒子背景
- `particles.count` - 粒子数量
- `particles.color` - 粒子颜色（RGB格式）
- `loadingDuration` - 加载动画时长（毫秒）
- `scrollAnimations` - 是否启用滚动动画

### 7. 主题配置 (`theme`)

自定义网站的色彩主题：

```json
{
  "theme": {
    "primaryColor": "#007aff",
    "secondaryColor": "#5856d6",
    "gradients": {
      "primary": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      "button": "linear-gradient(135deg, #007aff, #5856d6)",
      "text": "linear-gradient(45deg, #ffffff, #e0e7ff)"
    }
  }
}
```

## 部署指南

本模板是纯静态网站，支持多种部署方式：

### 1. 传统服务器部署

将所有文件上传到您的服务器根目录：

```bash
# 上传文件到服务器
scp -r ./* user@your-server.com:/var/www/html/

# 设置文件权限
chmod -R 755 /var/www/html/
```

### 2. GitHub Pages 部署

1. 将项目推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择主分支作为源
4. 访问 `https://yourusername.github.io/repository-name`

### 3. Netlify 部署

1. 连接 GitHub 仓库到 Netlify
2. 构建设置：
   - Build command: 留空
   - Publish directory: `./`
3. 自动部署完成

### 4. Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### 5. CDN 部署

支持任何支持静态文件的CDN服务：
- 阿里云OSS
- 腾讯云COS
- 七牛云
- 又拍云

## 自定义开发

### 添加新的产品展示类型

1. 在 `config-loader.js` 中添加新的视觉类型处理
2. 在 `style.css` 中添加对应样式
3. 在 `config.json` 中使用新的 `visualType`

### 修改页面样式

主要样式文件为 `style.css`，包含：
- 响应式布局
- 动画效果
- 主题颜色变量
- 移动端优化

### 扩展功能

- 修改 `script.js` 添加新的交互功能
- 编辑 `index.html` 调整页面结构
- 更新 `config-loader.js` 扩展配置处理逻辑

## 技术规格

### 浏览器兼容性
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### 技术栈
- **前端**: HTML5 + CSS3 + JavaScript ES6+
- **无框架依赖**: 纯原生实现
- **响应式**: 移动优先设计
- **SEO**: 语义化HTML结构

### 性能特性
- 📱 移动端优化（动态导航、触摸优化）
- ⚡ 懒加载和资源优化
- 🎯 防抖节流处理
- 💫 硬件加速动画

## 常见问题

**Q: 如何修改网站标题？**
A: 编辑 `config.json` 中的 `site.title` 字段。

**Q: 如何添加新产品？**
A: 在 `config.json` 的 `products` 数组中添加新对象，并在 `navigation` 中添加对应导航项。

**Q: 如何禁用动画效果？**
A: 在 `config.json` 中设置 `animations.scrollAnimations: false` 和 `animations.particles.enabled: false`。

**Q: 移动端按钮为什么隐藏？**
A: `opt` 类型的产品在移动端会自动隐藏操作按钮，这是为了优化移动体验。

## 版本历史

### v2.1.0 (2025-05-28)
- 🔄 重构优化界面类型命名
- 📱 增强移动端体验
- 📝 完善配置文档

### v2.0.0 (2025-01-27)  
- 🎉 JSON 配置驱动重构
- ✨ 专业徽章系统
- 🎨 多样化产品展示
- 📱 响应式设计完善

### v1.0.0 (2024)
- 🎯 初始版本发布

## 开源协议

MIT License - 详见 LICENSE 文件

---

💡 **提示**: 修改配置后刷新浏览器即可看到效果，无需重新部署。

📧 如有问题或建议，欢迎提交 Issue 或 Pull Request。