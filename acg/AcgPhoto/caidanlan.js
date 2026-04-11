// 主页按钮跳转事件
        document.querySelector('.home-toggle').addEventListener('click', () => {
            window.location.href = '../Acg.html'; // 或 window.scrollTo(0, 0);
        });


        // 菜单交互逻辑
        const menuToggle = document.querySelector('.menu-toggle');
        const sideMenu = document.querySelector('.side-menu');
        const menuItems = document.querySelectorAll('.menu-item');
        const content = document.querySelector('.content');
        const contentSections = document.querySelectorAll('.content-section');
        
        // 菜单按钮点击事件
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            sideMenu.classList.toggle('active');
            content.classList.toggle('menu-active');
        });
        
        // 菜单项点击事件
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                const target = this.getAttribute('data-target');
                
                // 移除所有active类
                menuItems.forEach(i => i.classList.remove('active'));
                contentSections.forEach(section => section.classList.remove('active'));
                
                // 给当前点击项添加active类
                this.classList.add('active');
                
                // 显示对应内容区域
                document.getElementById(target).classList.add('active');
                
                // 关闭菜单
                menuToggle.classList.remove('active');
                sideMenu.classList.remove('active');
                content.classList.remove('menu-active');
            });
        });
        
        // 菜单项悬浮事件
        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const target = this.getAttribute('data-target');
                contentSections.forEach(section => section.classList.remove('active'));
                document.getElementById(target).classList.add('active');
            });
        });


/* ======2. */