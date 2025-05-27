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
    
    // 屏蔽滚动操作
    document.body.style.overflow = 'hidden';
    
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
    
    // 滚动捕获优化
    let isScrolling = false;
    let scrollTimeout;
    let currentSectionIndex = 0;
    
    // 平滑滑动到指定页面
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const targetIndex = Array.from(sections).indexOf(targetSection);
                scrollToSection(targetIndex);
            }
        });
    });
    
    // 优化的滚动到指定区域函数
    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        
        currentSectionIndex = index;
        const scrollTop = index * window.innerHeight;
        
        // 使用更平滑的滚动
        main.style.scrollBehavior = 'smooth';
        main.scrollTo({
            top: scrollTop,
            behavior: 'smooth'
        });
    }
    
    // 滚动时导航栏样式变化和导航高亮
    function updateNavbar() {
        const scrollTop = main.scrollTop;
        const sectionIndex = Math.round(scrollTop / window.innerHeight);
        
        // 防抖处理
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            currentSectionIndex = sectionIndex;
        }, 100);
        
        // 导航栏背景变化
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }
        
        // 导航高亮
        navLinks.forEach((link, index) => {
            link.classList.remove('active');
            if (index === sectionIndex) {
                link.classList.add('active');
            }
        });
    }
    
    // 使用更频繁的更新频率来提高响应性
    main.addEventListener('scroll', throttle(updateNavbar, 10));
    
    // 初始化导航状态 - 设置首页为默认选中状态
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
    
    // 优化的触摸滑动支持
    let touchStartY = 0;
    let touchStartTime = 0;
    let lastTouchY = 0;
    let touchVelocity = 0;
    let isTouching = false;
    
    main.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        lastTouchY = touchStartY;
        touchStartTime = Date.now();
        touchVelocity = 0;
        isTouching = true;
        isScrolling = false;
    }, { passive: true });
    
    main.addEventListener('touchmove', function(e) {
        if (!isTouching) return;
        
        const currentTouchY = e.touches[0].clientY;
        const currentTime = Date.now();
        const deltaY = currentTouchY - lastTouchY;
        const deltaTime = currentTime - touchStartTime;
        
        // 计算滑动速度
        if (deltaTime > 0) {
            touchVelocity = deltaY / deltaTime;
        }
        
        lastTouchY = currentTouchY;
        isScrolling = true;
    }, { passive: true });
    
    main.addEventListener('touchend', function(e) {
        if (!isTouching || !isScrolling) {
            isTouching = false;
            return;
        }
        
        const endY = e.changedTouches[0].clientY;
        const totalDeltaY = touchStartY - endY;
        const totalTime = Date.now() - touchStartTime;
        
        isTouching = false;
        
        // 检测快速滑动手势或足够的距离
        const minDistance = window.innerHeight * 0.15; // 降低阈值
        const minVelocity = 0.5; // 最小速度阈值
        
        if ((Math.abs(totalDeltaY) > minDistance || Math.abs(touchVelocity) > minVelocity) && totalTime < 500) {
            let targetIndex = currentSectionIndex;
            
            if (totalDeltaY > 0 && currentSectionIndex < sections.length - 1) {
                // 向上滑动，切换到下一页
                targetIndex = currentSectionIndex + 1;
            } else if (totalDeltaY < 0 && currentSectionIndex > 0) {
                // 向下滑动，切换到上一页
                targetIndex = currentSectionIndex - 1;
            }
            
            if (targetIndex !== currentSectionIndex) {
                scrollToSection(targetIndex);
            }
        }
    }, { passive: true });
    
    // 鼠标滚轮优化
    let wheelTimeout;
    let wheelDelta = 0;
    
    main.addEventListener('wheel', function(e) {
        e.preventDefault();
        
        wheelDelta += e.deltaY;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            const threshold = 100; // 滚轮阈值
            
            if (Math.abs(wheelDelta) > threshold) {
                let targetIndex = currentSectionIndex;
                
                if (wheelDelta > 0 && currentSectionIndex < sections.length - 1) {
                    targetIndex = currentSectionIndex + 1;
                } else if (wheelDelta < 0 && currentSectionIndex > 0) {
                    targetIndex = currentSectionIndex - 1;
                }
                
                if (targetIndex !== currentSectionIndex) {
                    scrollToSection(targetIndex);
                }
            }
            
            wheelDelta = 0;
        }, 150);
    }, { passive: false });
    
    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        switch(e.key) {
            case 'ArrowDown':
            case 'PageDown':
                e.preventDefault();
                if (currentSectionIndex < sections.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                }
                break;
            case 'ArrowUp':
            case 'PageUp':
                e.preventDefault();
                if (currentSectionIndex > 0) {
                    scrollToSection(currentSectionIndex - 1);
                }
                break;
            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;
            case 'End':
                e.preventDefault();
                scrollToSection(sections.length - 1);
                break;
        }
    });
}

// 返回顶部按钮
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    const main = document.querySelector('main');
    
    function toggleBackToTop() {
        const scrollTop = main.scrollTop;
        if (scrollTop > window.innerHeight * 0.3) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }
    
    main.addEventListener('scroll', throttle(toggleBackToTop, 16));
    
    backToTopBtn.addEventListener('click', function() {
        main.scrollTo({
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
        const scrollTop = main.scrollTop;
        const maxScroll = main.scrollHeight - main.clientHeight;
        const scrollPercent = (scrollTop / maxScroll) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    }
    
    main.addEventListener('scroll', throttle(updateProgress, 16));
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
            const scrollTop = index * window.innerHeight;
            main.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
        });
        
        indicator.appendChild(dot);
    });
    
    document.body.appendChild(indicator);
    
    // 更新指示器状态
    function updateIndicator() {
        const scrollTop = main.scrollTop;
        const currentIndex = Math.round(scrollTop / window.innerHeight);
        
        indicator.querySelectorAll('.position-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    main.addEventListener('scroll', throttle(updateIndicator, 16));
}

// 滚动视觉反馈
function initScrollVisualFeedback() {
    const sections = document.querySelectorAll('.page-section');
    const main = document.querySelector('main');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    function updateVisualFeedback() {
        const scrollTop = main.scrollTop;
        const currentIndex = Math.round(scrollTop / window.innerHeight);
        
        sections.forEach((section, index) => {
            section.classList.remove('scrolling-past', 'scrolling-active');
            
            if (index === currentIndex) {
                section.classList.add('scrolling-active');
            } else if (Math.abs(index - currentIndex) === 1) {
                section.classList.add('scrolling-past');
            }
        });
        
        // 在第一个页面之外隐藏滚动指示器
        if (scrollIndicator) {
            scrollIndicator.classList.toggle('hidden', currentIndex > 0);
        }
    }
    
    main.addEventListener('scroll', throttle(updateVisualFeedback, 16));
    
    // 初始状态
    updateVisualFeedback();
}

// 页面过渡效果
function initPageTransition() {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    let isTransitioning = false;
    
    // 在滚动开始时显示过渡效果
    function showTransition() {
        if (isTransitioning) return;
        
        isTransitioning = true;
        transition.classList.add('active');
        
        setTimeout(() => {
            transition.classList.remove('active');
            setTimeout(() => {
                isTransitioning = false;
            }, 300);
        }, 150);
    }
    
    // 监听快速滚动
    const main = document.querySelector('main');
    let lastScrollTime = 0;
    
    main.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime < 100) {
            showTransition();
        }
        lastScrollTime = now;
    });
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