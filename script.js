// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检测移动端设备
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // 为移动端设备添加特殊类名
    if (isMobile || isTouch) {
        document.body.classList.add('mobile-device');
    }
    
    // 移动端性能优化
    if (isMobile) {
        // 减少动画和特效
        document.body.classList.add('reduced-motion');
        
        // 禁用粒子效果以提高性能
        const particlesCanvas = document.getElementById('particles-canvas');
        if (particlesCanvas) {
            particlesCanvas.style.display = 'none';
        }
    }
    
    // 移除加载屏幕
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                // 恢复滚动功能
                document.body.style.overflow = '';
            }, 500);
        }
    }, 1500);
});

// 粒子系统
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const config = window.configLoader?.getAnimations() || {};
    
    if (!config.particles?.enabled) return;
    
    const particleConfig = config.particles;
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const particleCount = particleConfig.count || 50;
    const particleColor = particleConfig.color || '102, 126, 234';
    const maxDistance = particleConfig.maxDistance || 100;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        });
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor}, ${particle.opacity})`;
            ctx.fill();
        });
        
        // 绘制连接线
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(${particleColor}, ${0.1 * (1 - distance / maxDistance)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// 滚动动画
function initScrollAnimations() {
    const config = window.configLoader?.getAnimations() || {};
    
    if (!config.scrollAnimations) return;
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // 观察所有带有data-aos属性的元素
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
}

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    const sections = document.querySelectorAll('.page-section');
    const navbar = document.querySelector('.navbar');
    const main = document.querySelector('main');
    
    // 平滑滑动到指定页面
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 滚动时导航栏样式变化和导航高亮
    function updateNavbar() {
        const scrollTop = main.scrollTop || window.pageYOffset;
        
        // 导航栏背景变化
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // 导航高亮
        let activeIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                activeIndex = index;
            }
        });
        
        navLinks.forEach((link, index) => {
            link.classList.remove('active');
            if (index === activeIndex) {
                link.classList.add('active');
            }
        });
    }
    
    // 使用适中的更新频率
    main.addEventListener('scroll', throttle(updateNavbar, 50));
    window.addEventListener('scroll', throttle(updateNavbar, 50));
    
    // 初始化导航状态
    updateNavbar();
    
    // 移动端菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        // 汉堡菜单点击切换
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // 点击菜单项时关闭菜单
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // 点击页面其他地方关闭菜单
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
        
        // ESC键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    const main = document.querySelector('main');
    
    function toggleBackToTop() {
        const scrollTop = main.scrollTop || window.pageYOffset;
        if (scrollTop > window.innerHeight * 0.3) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    main.addEventListener('scroll', throttle(toggleBackToTop, 100));
    window.addEventListener('scroll', throttle(toggleBackToTop, 100));
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 滚动进度条
function initScrollProgress() {
    const progressBar = document.querySelector('.progress-bar');
    const main = document.querySelector('main');
    
    function updateProgress() {
        const scrollTop = main.scrollTop || window.pageYOffset;
        const documentHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = documentHeight - windowHeight;
        const scrollPercent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
        
        progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
    }
    
    main.addEventListener('scroll', throttle(updateProgress, 50));
    window.addEventListener('scroll', throttle(updateProgress, 50));
}

// 滚动位置指示器
function initScrollIndicator() {
    const sections = document.querySelectorAll('.page-section');
    const main = document.querySelector('main');
    
    // 创建位置指示器
    const indicator = document.createElement('div');
    indicator.className = 'scroll-position-indicator';
    
    sections.forEach((section, index) => {
        const dot = document.createElement('div');
        dot.className = 'position-dot';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            section.scrollIntoView({
                behavior: 'smooth'
            });
        });
        
        indicator.appendChild(dot);
    });
    
    document.body.appendChild(indicator);
    
    // 更新指示器状态
    function updateIndicator() {
        let activeIndex = 0;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2) {
                activeIndex = index;
            }
        });
        
        indicator.querySelectorAll('.position-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }
    
    main.addEventListener('scroll', throttle(updateIndicator, 100));
    window.addEventListener('scroll', throttle(updateIndicator, 100));
}

// 滚动视觉反馈
function initScrollVisualFeedback() {
    const sections = document.querySelectorAll('.page-section');
    const main = document.querySelector('main');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    function updateVisualFeedback() {
        const scrollTop = main.scrollTop || window.pageYOffset;
        let activeIndex = 0;
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            section.classList.remove('scrolling-past', 'scrolling-active');
            
            if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                section.classList.add('scrolling-active');
                activeIndex = index;
            } else if (rect.bottom > 0 && rect.top < window.innerHeight) {
                section.classList.add('scrolling-past');
            }
        });
        
        // 在第一个页面之外隐藏滚动指示器
        if (scrollIndicator) {
            scrollIndicator.classList.toggle('hidden', activeIndex > 0);
        }
    }
    
    main.addEventListener('scroll', throttle(updateVisualFeedback, 50));
    window.addEventListener('scroll', throttle(updateVisualFeedback, 50));
    
    // 初始状态
    updateVisualFeedback();
}


// 性能优化：节流函数
function throttle(func, wait) {
    let timeout;
    let previous = 0;
    
    return function executedFunction(...args) {
        const now = Date.now();
        const remaining = wait - (now - previous);
        
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            previous = now;
            func.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                previous = Date.now();
                timeout = null;
                func.apply(this, args);
            }, remaining);
        }
    };
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});