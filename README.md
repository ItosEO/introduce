# ItosEO 网站配置系统

> **Itostar 软件集合** - 基于 JSON 配置的动态网站生成系统

## 项目概述

ItosEO 是一个基于 JSON 配置文件的现代化网站系统，专为 Itostar 软件集合设计。该系统通过简单的配置文件即可动态生成包含产品展示、导航管理、联系信息等完整功能的专业网站。

### 核心特性

- 🎯 **JSON 配置驱动** - 通过配置文件轻松管理网站内容
- 🎨 **专业视觉设计** - 支持多种产品展示类型和专业徽章
- ⚡ **响应式动画** - 流畅的滚动动画和交互效果
- 🎛️ **主题系统** - 可自定义的色彩和渐变主题
- 📱 **移动适配** - 完全响应式设计
- 🚀 **性能优化** - 轻量级代码，快速加载

## 当前产品阵容

- **vivo温控引擎** - 智能温控管理，付费产品
- **系统优化Pro** - 专业级优化工具，付费产品
- **系统优化APP** - 一键优化工具，免费产品
- **X计划** - 深度定制优化，免费产品

## 项目结构

```
introduce/
├── config.json          # 主配置文件
├── config-loader.js     # 配置加载器
├── index.html          # 主页面
├── script.js           # 交互逻辑
├── style.css           # 样式文件
└── README.md           # 项目文档
```

## 配置文件详解

### 1. 网站基本信息 (`site`)

```json
{
  "site": {
    "title": "Itostar 软件集合",
    "logo": {
      "icon": "⚡",
      "text": "ItosEO & 小星星亮晶晶"
    },
    "description": "专业的系统优化解决方案，让您的设备发挥最佳性能"
  }
}
```

### 2. 导航配置 (`navigation`)

```json
{
  "navigation": [
    { "text": "首页", "href": "#home" },
    { "text": "温控引擎", "href": "#vivo-thermal" },
    { "text": "系统优化Pro", "href": "#system-pro" },
    { "text": "系统优化APP", "href": "#system-app" },
    { "text": "X计划", "href": "#x-plan" }
  ]
}
```

### 3. 首页横幅 (`hero`)

```json
{
  "hero": {
    "badge": "✨ 新一代优化技术",
    "title": {
      "line1": "重新定义",
      "line2": "移动体验",
      "gradientLine": 2
    },
    "subtitle": "专业的系统优化解决方案，让您的设备发挥最佳性能",
    "buttons": [
      {
        "text": "探索产品",
        "href": "#vivo-thermal",
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

### 4. 产品配置 (`products`)

产品是网站的核心内容，支持多种展示类型和专业徽章效果：

```json
{
  "id": "vivo-thermal",
  "badge": "付费",
  "title": "vivo温控引擎",
  "subtitle": "智能温控管理，性能与体验的完美平衡",
  "description": "通过调整系统温控参数，优化设备性能与温度管理...",
  "icon": "🌡️",
  "layout": "normal",
  "features": [
    {
      "icon": "🎯",
      "title": "精准调参",
      "description": "优化游戏&日用体验"
    }
  ],
  "stats": [
    {
      "number": "40%+",
      "label": "性能提升"
    }
  ],
  "link": {
    "text": "了解更多",
    "url": "https://app.itostar.com.cn/"
  },
  "visualType": "stats"
}
```

#### 支持的 visualType 类型：
- **`stats`** - 数据统计展示
- **`chart`** - 图表可视化
- **`ui`** - 界面预览效果
- **`advanced`** - 高级功能展示
- **`professional`** - 专业版徽章（带金色徽章和闪光动画）

#### 产品徽章样式：
- **付费产品** - 显示金色 "PRO" 徽章，带旋转和闪光动画
- **免费产品** - 显示标准徽章样式

### 5. 联系信息和备案 (`contact`)

```json
{
  "contact": {
    "title": {
      "line1": "让我们一起",
      "line2": "优化未来",
      "gradientLine": 1
    },
    "description": "专注于移动设备系统优化，致力于为用户提供最佳的设备性能体验。",
    "stats": [
      {
        "number": "4W+",
        "label": "用户选择"
      },
      {
        "number": "300+",
        "label": "设备适配"
      },
      {
        "number": "99%",
        "label": "满意度"
      }
    ],
    "copyright": "&copy; 2025 ItosEO. 保留所有权利。",
    "filing": {
      "icp": {
        "number": "蜀ICP备2025118281号-1",
        "url": "https://beian.miit.gov.cn/"
      },
      "police": {
        "number": "川公网安备51010602002603号",
        "url": "http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51010602002603"
      }
    }
  }
}
```

### 6. 动画系统 (`animations`)

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

### 7. 主题系统 (`theme`)

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

## 系统架构

### ConfigLoader 类
`config-loader.js` 提供了完整的配置管理功能：

```javascript
class ConfigLoader {
    // 加载配置文件
    async loadConfig()
    
    // 获取各部分配置
    getSiteInfo()      // 网站信息
    getNavigation()    // 导航数据
    getHero()          // 首页横幅
    getProducts()      // 产品列表
    getContact()       // 联系信息
    getAnimations()    // 动画配置
    getTheme()         // 主题设置
}
```

### 核心功能模块

1. **动态内容渲染** - 基于配置文件动态生成页面内容
2. **响应式导航** - 自动高亮当前页面导航项
3. **专业徽章系统** - 付费产品显示 PRO 徽章动画
4. **滚动动画** - 平滑的页面滚动和内容出现动画
5. **主题定制** - 可配置的色彩方案和渐变效果

## 快速开始

1. **克隆项目**：
   ```bash
   git clone [repository-url]
   cd introduce
   ```

2. **配置网站内容**：
   编辑 `config.json` 文件，修改网站信息、产品列表等

3. **启动网站**：
   使用任意 HTTP 服务器运行，例如：
   ```bash
   # 使用 Python
   python -m http.server 8000
   
   # 使用 Node.js
   npx serve .
   
   # 使用 VS Code Live Server 扩展
   ```

4. **访问网站**：
   在浏览器中打开 `http://localhost:8000`

## 自定义指南

### 添加新产品

1. 在 `config.json` 的 `products` 数组中添加新对象
2. 在 `navigation` 数组中添加对应导航项
3. 选择合适的 `visualType` 展示效果

### 修改产品徽章

- **付费产品**：设置 `"badge": "付费"` 会自动显示 PRO 徽章
- **免费产品**：设置 `"badge": "免费"` 显示标准徽章

### 自定义主题

修改 `theme` 配置中的颜色和渐变：
- `primaryColor`: 主要颜色
- `secondaryColor`: 次要颜色  
- `gradients`: 各种渐变效果

### 调整动画效果

在 `animations` 配置中：
- 禁用粒子效果：`"particles.enabled": false`
- 调整粒子数量：修改 `particles.count`
- 关闭滚动动画：`"scrollAnimations": false`

## 技术特性

- ✅ **纯原生技术** - HTML5 + CSS3 + JavaScript ES6+
- ✅ **无框架依赖** - 轻量级，快速加载
- ✅ **移动优先** - 响应式设计，完美适配各种设备
- ✅ **SEO 友好** - 语义化 HTML 结构
- ✅ **可维护性** - 模块化代码结构，易于扩展

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 更新日志

### v2.0.0 (2025-01-27)
- 🎉 重构配置系统，支持完整的 JSON 驱动
- ✨ 新增专业徽章系统（PRO 徽章动画）
- 🎨 优化视觉效果，支持多种产品展示类型
- 📱 完善响应式设计
- 🔧 新增备案信息展示
- ⚡ 性能优化和代码重构

### v1.0.0 (2024)
- 🎯 初始版本发布
- 📝 基础配置文件支持
- 🎨 基本主题系统

## 许可证

Copyright &copy; 2025 ItosEO. 保留所有权利。

---

> 📧 如有问题或建议，请通过项目页面联系我们

*最后更新时间：2025年5月25日*