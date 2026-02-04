document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('videoLightbox');
    const playerContainer = document.getElementById('videoPlayerContainer');
    const closeBtn = document.getElementById('closeLightbox');

    console.log("博物馆系统已启动，正在监听选集...");

    // 1. 弹窗播放逻辑
    document.querySelectorAll('.ep-tag').forEach(tag => {
        tag.addEventListener('click', function(e) {
            e.preventDefault();
            const url = this.getAttribute('data-video-url');
            
            if (url && url !== "#") {
                playerContainer.innerHTML = `
                    <video controls autoplay style="width:100%; height:100%; background:#000;">
                        <source src="${url}" type="video/mp4">
                        您的浏览器无法播放此本地视频，请检查路径大小写是否与文件夹一致。
                    </video>`;
                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // 锁定滚动
            } else {
                console.warn("此按钮未配置 data-video-url 路径");
            }
        });
    });

    // 2. 关闭弹窗逻辑
    const hideLightbox = () => {
        lightbox.style.display = 'none';
        playerContainer.innerHTML = ''; // 销毁播放器防止偷跑流量和声音
        document.body.style.overflow = 'auto'; // 恢复滚动
    };

    closeBtn.onclick = hideLightbox;

    // 点击黑色背景处也能关闭
    lightbox.onclick = (e) => {
        if (e.target === lightbox) hideLightbox();
    };

    // 3. 左侧卡片轮播逻辑
    const inner = document.getElementById('carouselInner');
    const cards = inner.querySelectorAll('.featured-mini-card');
    let idx = 0;
    
    if (cards.length > 1) {
        setInterval(() => {
            idx = (idx + 1) % cards.length;
            inner.style.transform = `translateX(-${idx * 100}%)`;
        }, 5000); // 5秒轮播一次
    }
});