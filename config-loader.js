class ConfigLoader {
    constructor() {
        this.config = null;
        this.isLoaded = false;
    }

    async loadConfig() {
        try {
            const response = await fetch('config.json');
            this.config = await response.json();
            this.isLoaded = true;
            return this.config;
        } catch (error) {
            console.error('配置文件加载失败:', error);
            return null;
        }
    }

    getConfig() {
        return this.config;
    }

    getSiteInfo() {
        return this.config?.site || {};
    }

    getNavigation() {
        return this.config?.navigation || [];
    }

    getHero() {
        return this.config?.hero || {};
    }

    getProducts() {
        return this.config?.products || [];
    }

    getContact() {
        return this.config?.contact || {};
    }

    getAnimations() {
        return this.config?.animations || {};
    }

    getTheme() {
        return this.config?.theme || {};
    }
}

// 页面渲染器
class PageRenderer {
    constructor(configLoader) {
        this.configLoader = configLoader;
    }

    renderNavigation() {
        const site = this.configLoader.getSiteInfo();
        const navigation = this.configLoader.getNavigation();

        // 渲染Logo
        const logoElement = document.querySelector('.nav-logo');
        if (logoElement && site.logo) {
            logoElement.innerHTML = `
                <span class="logo-icon">${site.logo.icon}</span>
                ${site.logo.text}
            `;
        }

        // 渲染导航菜单
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu && navigation.length > 0) {
            navMenu.innerHTML = navigation.map(item => 
                `<li><a href="${item.href}" data-text="${item.text}">${item.text}</a></li>`
            ).join('');
        }
    }

    renderHero() {
        const hero = this.configLoader.getHero();
        
        // 渲染徽章
        const badgeElement = document.querySelector('.badge-text');
        if (badgeElement && hero.badge) {
            badgeElement.textContent = hero.badge;
        }

        // 渲染标题
        const titleElement = document.querySelector('.hero-title');
        if (titleElement && hero.title) {
            const line1Class = hero.title.gradientLine === 1 ? ' gradient-text' : '';
            const line2Class = hero.title.gradientLine === 2 ? ' gradient-text' : '';
            
            titleElement.innerHTML = `
                <span class="title-line${line1Class}">${hero.title.line1}</span>
                <span class="title-line${line2Class}">${hero.title.line2}</span>
            `;
        }

        // 渲染副标题
        const subtitleElement = document.querySelector('.hero-subtitle');
        if (subtitleElement && hero.subtitle) {
            subtitleElement.textContent = hero.subtitle;
        }

        // 渲染按钮
        const buttonsContainer = document.querySelector('.hero-buttons');
        if (buttonsContainer && hero.buttons) {
            buttonsContainer.innerHTML = hero.buttons.map(button => 
                `<a href="${button.href}" class="cta-button ${button.type}">
                    <span>${button.text}</span>
                    ${button.type === 'primary' ? '<div class="button-bg"></div>' : ''}
                </a>`
            ).join('');
        }
    }

    renderProducts() {
        const products = this.configLoader.getProducts();
        const container = document.querySelector('main') || document.body;

        products.forEach((product, index) => {
            const section = this.createProductSection(product, index);
            container.appendChild(section);
        });
    }

    createProductSection(product, index) {
        const section = document.createElement('section');
        section.className = `page-section product-section${product.background === 'alt' ? ' alt-bg' : ''}`;
        section.id = product.id;

        const contentClass = product.layout === 'reverse' ? 'product-content reverse' : 'product-content';
        const textAos = product.layout === 'reverse' ? 'fade-left' : 'fade-right';
        const visualAos = product.layout === 'reverse' ? 'fade-right' : 'fade-left';

        section.innerHTML = `
            ${this.createSectionBackground()}
            <div class="container">
                <div class="${contentClass}">
                    ${this.createProductText(product, textAos)}
                    <div class="product-bottom-section">
                        ${this.createProductFeatures(product)}
                        ${this.createProductVisual(product, visualAos)}
                    </div>
                </div>
            </div>
        `;

        return section;
    }

    createSectionBackground() {
        return `
            <div class="section-bg">
                <div class="floating-shapes">
                    <div class="shape shape-1"></div>
                    <div class="shape shape-2"></div>
                    <div class="shape shape-3"></div>
                </div>
            </div>
        `;
    }

    createProductText(product, aos) {
        // 根据badge内容确定样式类
        const badgeClass = product.badge === '免费' ? 'free' : 'paid';

        const linkHtml = product.link ? `
            <div class="product-link">
                <a href="${product.link.url}" target="_blank" class="link-button">
                    <span>${product.link.text}</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M6 12L10 8L6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </a>
            </div>
        ` : '';

        return `
            <div class="product-text" data-aos="${aos}">
                <div class="product-badge ${badgeClass}">${product.badge}</div>
                <h2 class="product-title">${product.title}</h2>
                <p class="product-subtitle">${product.subtitle}</p>
                <p class="product-description">${product.description}</p>
                ${linkHtml}
            </div>
        `;
    }

    createProductFeatures(product) {
        const featuresHtml = product.features.map(feature => `
            <div class="feature-item">
                <div class="feature-icon">
                    <span>${feature.icon}</span>
                </div>
                <div class="feature-content">
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                </div>
            </div>
        `).join('');

        return `
            <div class="product-features">
                ${featuresHtml}
            </div>
        `;
    }

    createProductVisual(product, aos) {
        let visualContent = '';

        switch (product.visualType) {
            case 'stats':
                visualContent = this.createStatsVisual(product);
                break;
            case 'chart':
                visualContent = this.createChartVisual(product);
                break;
            case 'ui':
                visualContent = this.createUIVisual(product);
                break;
            case 'advanced':
                visualContent = this.createAdvancedVisual(product);
                break;
            case 'professional':
                visualContent = this.createProfessionalVisual(product);
                break;
            default:
                visualContent = this.createDefaultVisual(product);
        }

        return `
            <div class="product-visual" data-aos="${aos}">
                <div class="product-card">
                    <div class="card-glow"></div>
                    <div class="product-icon-large">${product.icon}</div>
                    ${visualContent}
                </div>
            </div>
        `;
    }

    createStatsVisual(product) {
        if (!product.stats) return '';
        
        return `
            <div class="card-stats">
                ${product.stats.map(stat => `
                    <div class="stat-item">
                        <span class="stat-number">${stat.number}</span>
                        <span class="stat-label">${stat.label}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    createChartVisual(product) {
        return `
            <div class="performance-chart">
                <div class="chart-bar" style="height: 60%"></div>
                <div class="chart-bar" style="height: 80%"></div>
                <div class="chart-bar" style="height: 95%"></div>
                <div class="chart-bar" style="height: 70%"></div>
            </div>
        `;
    }

    createUIVisual(product) {
        return `
            <div class="simple-ui-preview">
                <div class="ui-button active">一键优化</div>
                <div class="ui-progress">
                    <div class="ui-progress-bar"></div>
                </div>
                <div class="ui-status">优化完成 ✓</div>
            </div>
        `;
    }

    createAdvancedVisual(product) {
        return `
            <div class="advanced-features">
                <div class="feature-dot active"></div>
                <div class="feature-dot"></div>
                <div class="feature-dot active"></div>
                <div class="feature-dot active"></div>
                <div class="feature-line"></div>
            </div>
        `;
    }

    createProfessionalVisual(product) {
        return `
            <div class="professional-display">
                <div class="pro-badge">
                    <span class="pro-text">PRO</span>
                </div>
            </div>
        `;
    }

    createDefaultVisual(product) {
        return '';
    }

    renderContact() {
        const contact = this.configLoader.getContact();
        
        // 渲染联系区域标题
        const titleElement = document.querySelector('.contact-content .section-title');
        if (titleElement && contact.title) {
            const line1Class = contact.title.gradientLine === 1 ? ' gradient-text' : '';
            const line2Class = contact.title.gradientLine === 2 ? ' gradient-text' : '';
            
            titleElement.innerHTML = `
                <span class="${line1Class.trim()}">${contact.title.line1}</span>
                <span class="${line2Class.trim()}">${contact.title.line2}</span>
            `;
        }

        // 渲染描述
        const descElement = document.querySelector('.contact-description');
        if (descElement && contact.description) {
            descElement.textContent = contact.description;
        }

        // 渲染统计数据
        const statsContainer = document.querySelector('.contact-stats');
        if (statsContainer && contact.stats) {
            statsContainer.innerHTML = contact.stats.map((stat, index) => `
                <div class="stat-card" data-aos="fade-up" data-aos-delay="${400 + (index * 100)}">
                    <div class="stat-number">${stat.number}</div>
                    <div class="stat-label">${stat.label}</div>
                </div>
            `).join('');
        }

        // 渲染版权信息
        const copyrightElement = document.querySelector('.contact-info .copyright');
        if (copyrightElement && contact.copyright) {
            copyrightElement.innerHTML = contact.copyright;
        }

        // 渲染备案信息
        const filingElement = document.querySelector('.contact-info .filing-info');
        if (filingElement && contact.filing) {
            const { icp, police } = contact.filing;
            filingElement.innerHTML = `
                <div class="filing-links">
                    <a href="${icp.url}" target="_blank" rel="noopener noreferrer" class="filing-link icp-link">
                        ${icp.number}
                    </a>
                    <span class="filing-separator">|</span>
                    <a href="${police.url}" target="_blank" rel="noopener noreferrer" class="filing-link police-link">
                        <img src="https://beian.mps.gov.cn/img/logo01.dd7ff50e.png" alt="公安备案图标" class="police-icon">
                        ${police.number}
                    </a>
                </div>
            `;
        }
    }

    renderPage() {
        this.renderNavigation();
        this.renderHero();
        this.renderContact();
        
        // 动态创建产品区域
        const existingProducts = document.querySelectorAll('.product-section');
        existingProducts.forEach(section => section.remove());
        
        const contactSection = document.getElementById('contact');
        const products = this.configLoader.getProducts();
        
        products.forEach((product, index) => {
            const section = this.createProductSection(product, index);
            contactSection.parentNode.insertBefore(section, contactSection);
        });
    }

    applyTheme() {
        const theme = this.configLoader.getTheme();
        if (!theme) return;

        const root = document.documentElement;
        
        // 应用主题色
        if (theme.primaryColor) {
            root.style.setProperty('--primary-color', theme.primaryColor);
        }
        
        if (theme.secondaryColor) {
            root.style.setProperty('--secondary-color', theme.secondaryColor);
        }

        // 应用渐变
        if (theme.gradients) {
            Object.keys(theme.gradients).forEach(key => {
                root.style.setProperty(`--gradient-${key}`, theme.gradients[key]);
            });
        }
    }
}

// 全局配置加载器实例
const configLoader = new ConfigLoader();
const pageRenderer = new PageRenderer(configLoader);

// 页面初始化
async function initializePage() {
    await configLoader.loadConfig();
    
    if (configLoader.isLoaded) {
        pageRenderer.applyTheme();
        pageRenderer.renderPage();
        
        // 更新页面标题
        const siteInfo = configLoader.getSiteInfo();
        if (siteInfo.title) {
            document.title = siteInfo.title;
        }
        
        console.log('页面配置加载完成');
    } else {
        console.error('配置文件加载失败，使用默认内容');
    }
}

// 导出供外部使用
window.configLoader = configLoader;
window.pageRenderer = pageRenderer;
window.initializePage = initializePage;