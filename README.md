# ItosEO 配置文件编辑指南

## 概述

本文档详细说明如何编辑 `config.json` 配置文件，以自定义 ItosEO 网站的各项设置。配置文件采用 JSON 格式，包含网站基本信息、导航、产品展示、联系信息等多个部分。

## 配置文件结构

### 1. 网站基本信息 (`site`)

```json
{
  "site": {
    "title": "网站标题",
    "logo": {
      "icon": "图标emoji",
      "text": "Logo文字"
    },
    "description": "网站描述"
  }
}
```

**可编辑项：**
- `title`: 网站标题，显示在浏览器标签页
- `logo.icon`: Logo图标，使用emoji或图标字符
- `logo.text`: Logo文字
- `description`: 网站简介

### 2. 导航栏配置 (`navigation`)

```json
{
  "navigation": [
    { "text": "导航文字", "href": "#锚点" }
  ]
}
```

**编辑说明：**
- 数组形式，每个对象代表一个导航项
- `text`: 导航显示文字
- `href`: 链接地址，使用 `#` 开头表示页面内锚点

### 3. 首页横幅 (`hero`)

```json
{
  "hero": {
    "badge": "顶部标签",
    "title": {
      "line1": "标题第一行",
      "line2": "标题第二行",
      "gradientLine": 2
    },
    "subtitle": "副标题",
    "buttons": [
      {
        "text": "按钮文字",
        "href": "链接地址",
        "type": "primary|secondary"
      }
    ]
  }
}
```

**编辑说明：**
- `badge`: 顶部装饰标签
- `title.gradientLine`: 指定哪一行使用渐变效果（1或2）
- `buttons`: 按钮数组，`type` 可选 `primary`（主按钮）或 `secondary`（次按钮）

### 4. 产品展示 (`products`)

每个产品包含以下结构：

```json
{
  "id": "产品ID",
  "badge": "产品标签",
  "title": "产品标题",
  "subtitle": "产品副标题",
  "description": "产品详细描述",
  "icon": "产品图标",
  "layout": "normal|reverse",
  "background": "default|alt",
  "features": [
    {
      "icon": "功能图标",
      "title": "功能标题",
      "description": "功能描述"
    }
  ],
  "stats": [
    {
      "number": "数据数值",
      "label": "数据说明"
    }
  ],
  "link": {
    "text": "链接文字",
    "url": "外部链接"
  },
  "visualType": "stats|chart|ui|advanced"
}
```

**编辑说明：**
- `layout`: 布局方式，`normal`（图左文右）或 `reverse`（图右文左）
- `background`: 背景样式，`default` 或 `alt`（替代背景色）
- `visualType`: 视觉展示类型，影响右侧图表样式
- `link`: 可选的外部链接（如社区链接）
- `stats`: 可选的数据展示

### 5. 联系信息 (`contact`)

```json
{
  "contact": {
    "title": {
      "line1": "标题第一行",
      "line2": "标题第二行",
      "gradientLine": 1
    },
    "description": "描述文字",
    "stats": [
      {
        "number": "统计数字",
        "label": "统计说明"
      }
    ],
    "copyright": "版权信息"
  }
}
```

### 6. 动画配置 (`animations`)

```json
{
  "animations": {
    "particles": {
      "enabled": true,
      "count": 50,
      "color": "RGB颜色值",
      "maxDistance": 100
    },
    "loadingDuration": 2000,
    "scrollAnimations": true
  }
}
```

**编辑说明：**
- `particles.enabled`: 是否启用粒子动画
- `particles.count`: 粒子数量
- `particles.color`: 粒子颜色（RGB格式，如 "102, 126, 234"）
- `loadingDuration`: 加载动画持续时间（毫秒）
- `scrollAnimations`: 是否启用滚动动画

### 7. 主题配置 (`theme`)

```json
{
  "theme": {
    "primaryColor": "#007aff",
    "secondaryColor": "#5856d6",
    "gradients": {
      "primary": "CSS渐变代码",
      "button": "按钮渐变代码",
      "text": "文字渐变代码"
    }
  }
}
```

**编辑说明：**
- 使用标准的 CSS 颜色值和渐变语法
- 渐变格式：`linear-gradient(角度, 颜色1 位置%, 颜色2 位置%)`

## 编辑注意事项

1. **JSON 语法**：确保所有字符串使用双引号，对象和数组的语法正确
2. **编码格式**：文件使用 UTF-8 编码保存
3. **颜色值**：支持十六进制（#ffffff）、RGB、HSL等CSS颜色格式
4. **图标建议**：推荐使用 emoji 作为图标，兼容性好且美观
5. **链接格式**：
   - 内部锚点：`#section-id`
   - 外部链接：`https://example.com`

## 常见修改示例

### 修改网站标题和Logo
```json
{
  "site": {
    "title": "我的优化工具",
    "logo": {
      "icon": "🔧",
      "text": "MyTool"
    }
  }
}
```

### 添加新的产品
在 `products` 数组中添加新对象：
```json
{
  "id": "new-product",
  "badge": "新产品",
  "title": "新产品名称",
  "subtitle": "产品简介",
  "description": "详细描述...",
  "icon": "🎯",
  "layout": "normal",
  "features": [...],
  "visualType": "stats"
}
```

### 修改主题色彩
```json
{
  "theme": {
    "primaryColor": "#ff6b6b",
    "secondaryColor": "#4ecdc4",
    "gradients": {
      "primary": "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)"
    }
  }
}
```

## 测试和验证

修改配置文件后，建议：

1. 使用 JSON 验证工具检查语法正确性
2. 在浏览器中重新加载页面查看效果
3. 检查所有链接是否正常工作
4. 验证动画和交互效果

## 备份建议

在进行重大修改前，建议备份原始 `config.json` 文件，以便在出现问题时快速恢复。

---

*最后更新时间：2025年5月25日*