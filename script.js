document.addEventListener('DOMContentLoaded', () => {
    // DOM 元素引用
    const photoGrid = document.getElementById('photoGrid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const downloadBtn = document.getElementById('downloadBtn');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const imageTitle = document.getElementById('imageTitle');
    const imageCounter = document.getElementById('imageCounter');
    const loading = document.getElementById('loading');

    // 全局变量
    let photos = [];
    let currentIndex = 0;

    // 初始化应用
    init();

    async function init() {
        try {
            await loadPhotos();
            createPhotoGrid();
            setupEventListeners();
            hideLoading();
        } catch (error) {
            console.error('初始化失败:', error);
            showError('加载照片失败，请刷新页面重试');
        }
    }

    // 加载照片数据
    async function loadPhotos() {
        try {
            const response = await fetch('photos.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            photos = await response.json();
        } catch (error) {
            console.error('加载照片数据失败:', error);
            throw error;
        }
    }

    // 创建照片网格
    function createPhotoGrid() {
        photoGrid.innerHTML = '';
        
        photos.forEach((photo, index) => {
            const item = createPhotoItem(photo, index);
            photoGrid.appendChild(item);
        });
    }

    // 创建单个照片项
    function createPhotoItem(photo, index) {
        const item = document.createElement('div');
        item.className = 'photo-item';
        
        // 设置占位符背景
        item.style.backgroundColor = photo.placeholder_color;
        item.style.backgroundImage = `linear-gradient(135deg, ${photo.placeholder_color}, ${adjustBrightness(photo.placeholder_color, 20)})`;

        // 创建图片元素
        const img = document.createElement('img');
        img.src = photo.thumbnail_url;
        img.alt = photo.alt;
        img.loading = 'lazy';

        // 图片加载完成处理
        img.onload = () => {
            img.classList.add('loaded');
        };

        // 图片加载失败处理
        img.onerror = () => {
            console.error(`图片加载失败: ${photo.thumbnail_url}`);
            item.style.backgroundImage = `linear-gradient(135deg, #ddd, #bbb)`;
            item.innerHTML = '<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #666;">图片加载失败</div>';
        };

        // 点击事件
        item.addEventListener('click', () => {
            openLightbox(index);
        });

        item.appendChild(img);
        return item;
    }

    // 调整颜色亮度
    function adjustBrightness(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    // 打开灯箱
    function openLightbox(index) {
        currentIndex = index;
        const photo = photos[currentIndex];
        
        lightboxImg.src = photo.high_res_url;
        lightboxImg.alt = photo.alt;
        downloadBtn.href = photo.high_res_url;
        downloadBtn.download = `photo_${index + 1}.jpg`;
        imageTitle.textContent = photo.alt;
        imageCounter.textContent = `${index + 1} / ${photos.length}`;
        
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    // 关闭灯箱
    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.style.overflow = 'auto';
    }

    // 显示上一张图片
    function showPrevImage() {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        openLightbox(currentIndex);
    }

    // 显示下一张图片
    function showNextImage() {
        currentIndex = (currentIndex + 1) % photos.length;
        openLightbox(currentIndex);
    }

    // 设置事件监听器
    function setupEventListeners() {
        // 灯箱控制按钮
        closeBtn.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);

        // 点击背景关闭灯箱
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox-overlay')) {
                closeLightbox();
            }
        });

        // 键盘控制
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('show')) return;
            
            switch(e.key) {
                case 'ArrowLeft':
                    showPrevImage();
                    break;
                case 'ArrowRight':
                    showNextImage();
                    break;
                case 'Escape':
                    closeLightbox();
                    break;
            }
        });

        // 触摸滑动支持（移动端）
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    showNextImage(); // 向左滑动，显示下一张
                } else {
                    showPrevImage(); // 向右滑动，显示上一张
                }
            }
        }
    }

    // 隐藏加载动画
    function hideLoading() {
        loading.classList.add('hidden');
    }

    // 显示错误信息
    function showError(message) {
        loading.innerHTML = `
            <div style="text-align: center; color: #e74c3c;">
                <h3>😔 出错了</h3>
                <p>${message}</p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #3498db; color: white; border: none; border-radius: 5px; cursor: pointer;">
                    重新加载
                </button>
            </div>
        `;
    }

    // 图片预加载（可选优化）
    function preloadImages() {
        photos.forEach(photo => {
            const img = new Image();
            img.src = photo.high_res_url;
        });
    }

    // 延迟预加载高清图片
    setTimeout(preloadImages, 2000);
});
