// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
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
    }, 1500); // 改为1秒
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
                const targetIndex = Array.from(sections).indexOf(targetSection);
                const scrollTop = targetIndex * window.innerHeight;
                
                main.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 滚动时导航栏样式变化和导航高亮
    function updateNavbar() {
        const scrollTop = main.scrollTop;
        const currentSectionIndex = Math.round(scrollTop / window.innerHeight);
        
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
            if (index === currentSectionIndex) {
                link.classList.add('active');
            }
        });
    }
    
    main.addEventListener('scroll', throttle(updateNavbar, 16));
    
    // 移动端菜单切换
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // 添加触摸滑动支持
    let startY = 0;
    let startTime = 0;
    let isScrolling = false;
    
    main.addEventListener('touchstart', function(e) {
        startY = e.touches[0].pageY;
        startTime = Date.now();
        isScrolling = false;
    }, { passive: true });
    
    main.addEventListener('touchmove', function(e) {
        isScrolling = true;
    }, { passive: true });
    
    main.addEventListener('touchend', function(e) {
        if (!isScrolling) return;
        
        const endY = e.changedTouches[0].pageY;
        const endTime = Date.now();
        const deltaY = startY - endY;
        const deltaTime = endTime - startTime;
        
        // 检测快速滑动手势
        if (Math.abs(deltaY) > 50 && deltaTime < 300) {
            const currentScrollTop = main.scrollTop;
            const currentSectionIndex = Math.round(currentScrollTop / window.innerHeight);
            let targetIndex = currentSectionIndex;
            
            if (deltaY > 0 && currentSectionIndex < sections.length - 1) {
                // 向上滑动，切换到下一页
                targetIndex = currentSectionIndex + 1;
            } else if (deltaY < 0 && currentSectionIndex > 0) {
                // 向下滑动，切换到上一页
                targetIndex = currentSectionIndex - 1;
            }
            
            if (targetIndex !== currentSectionIndex) {
                const scrollTop = targetIndex * window.innerHeight;
                main.scrollTo({
                    top: scrollTop,
                    behavior: 'smooth'
                });
            }
        }
    }, { passive: true });
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

// 性能优化：节流函数
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
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