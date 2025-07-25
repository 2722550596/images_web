# 照片墙⭐ - 极简优雅的照片展示网页

一个现代化、响应式的照片墙网页，具有美观的加载动画和沉浸式的灯箱查看体验。

## ✨ 特性

- 🎨 **极简设计** - 清爽的界面，专注于照片展示
- 📱 **响应式布局** - 完美适配桌面端和移动端
- 🌈 **颜色占位符** - 加载时显示与照片主色调一致的占位符
- 🔍 **灯箱查看** - 全屏高清查看，支持键盘和触摸操作
- ⬇️ **一键下载** - 直接下载高清原图
- ⚡ **懒加载** - 优化加载性能
- 🎭 **平滑动画** - 优雅的过渡效果

## 📁 项目结构

```
照片墙项目/
├── index.html          # 网页主文件
├── style.css           # 样式文件
├── script.js           # 交互逻辑
├── photos.json         # 照片数据配置
├── README.md           # 说明文档
└── images/
    ├── thumbnails/     # 缩略图文件夹
    └── originals/      # 高清原图文件夹
```

## 🚀 快速开始

### 1. 准备照片

将您的照片按以下方式组织：
- **缩略图**：放入 `images/thumbnails/` 文件夹，建议尺寸 400x400px
- **高清原图**：放入 `images/originals/` 文件夹，保持原始分辨率

### 2. 配置照片信息

编辑 `photos.json` 文件，添加您的照片信息：

```json
[
  {
    "thumbnail_url": "images/thumbnails/your_photo_thumb.jpg",
    "high_res_url": "images/originals/your_photo_hd.jpg",
    "alt": "照片描述",
    "placeholder_color": "#c5a691"
  }
]
```

**获取占位符颜色的方法：**
- 使用在线取色器工具
- 在Photoshop中使用吸管工具
- 使用浏览器开发者工具的取色器

### 3. 本地预览

使用任意HTTP服务器运行项目：

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx serve .

# 使用PHP
php -S localhost:8000
```

然后在浏览器中访问 `http://localhost:8000`

## 🌐 部署到Gitee Pages

1. **创建Gitee仓库**
   - 登录Gitee，创建新的公开仓库
   - 将所有文件上传到仓库

2. **启用Gitee Pages**
   - 进入仓库页面，点击"服务" → "Gitee Pages"
   - 选择部署分支（通常是master或main）
   - 点击"启动"

3. **访问网站**
   - 部署完成后，通过 `https://你的用户名.gitee.io/仓库名` 访问

## 🎮 使用说明

### 桌面端操作
- **查看照片**：点击任意照片进入灯箱模式
- **切换照片**：使用左右箭头按钮或键盘方向键
- **下载照片**：点击"下载原图"按钮
- **关闭灯箱**：点击×按钮、按ESC键或点击背景区域

### 移动端操作
- **查看照片**：轻触照片进入灯箱模式
- **切换照片**：左右滑动屏幕
- **下载照片**：点击下载按钮
- **关闭灯箱**：轻触背景区域

## 🛠️ 自定义配置

### 修改网格布局
在 `style.css` 中调整 `.photo-grid` 的 `grid-template-columns` 属性：

```css
.photo-grid {
    /* 最小宽度280px，自动填充 */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px; /* 调整间距 */
}
```

### 修改颜色主题
在 `style.css` 中修改相关颜色变量：

```css
/* 主背景渐变 */
body {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* 下载按钮颜色 */
.download-btn {
    background: linear-gradient(45deg, #3498db, #2980b9);
}
```

## 📝 注意事项

1. **图片格式**：支持 JPG、PNG、WebP 等常见格式
2. **文件大小**：缩略图建议控制在100KB以内，原图可以更大
3. **浏览器兼容**：支持现代浏览器（Chrome、Firefox、Safari、Edge）
4. **HTTPS部署**：某些功能在HTTPS环境下体验更佳

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 📄 许可证

MIT License - 可自由使用和修改
