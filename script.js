document.addEventListener('DOMContentLoaded', () => {
    // 0. Мобильное меню (гамбургер)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 1. Переключение темной/светлой темы
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', currentTheme);
        themeToggle.textContent = currentTheme === 'light' ? '🌙' : '☀️';

        themeToggle.addEventListener('click', () => {
            const theme = document.body.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeToggle.textContent = newTheme === 'light' ? '🌙' : '☀️';
        });
    }

    // 2. Поиск и фильтры
    const searchInput = document.getElementById('menu-search');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.menu-row');

    function performFilter() {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
        const activeBtn = document.querySelector('.filter-btn.active');
        const activeCategory = activeBtn ? activeBtn.dataset.filter : 'all';

        rows.forEach(row => {
            const name = row.querySelector('.dish-name').textContent.toLowerCase();
            const category = row.dataset.category;

            const matchesSearch = name.includes(query);
            const matchesCategory = activeCategory === 'all' || category === activeCategory;

            row.style.display = (matchesSearch && matchesCategory) ? '' : 'none';
        });
    }

    if (searchInput) searchInput.addEventListener('input', performFilter);
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            performFilter();
        });
    });

    // 3. Активная страница в навигации
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.style.color = 'var(--accent-color)';
            link.style.fontWeight = '600';
        }
    });

    // 4. Отправка заявки в Telegram
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('client-name').value.trim();
            const phone = document.getElementById('client-phone').value.trim();
            const message = document.getElementById('client-message').value.trim();
            
            if (!name || !phone || !message) {
                alert('Пожалуйста, заполните все поля');
                return;
            }
            
            const text = `Обращение:%0AИмя: ${name}%0AТелефон: ${phone}%0AСообщение: ${message}`;
            const telegramUrl = `https://t.me/ZhannaMh?text=${text}`;
            
            window.open(telegramUrl, '_blank');
        });
    }
});