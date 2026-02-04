/**
 * 疍音流转 - 数据库交互逻辑
 * 功能：方言切换、动态介绍更新、字卡渲染、音频播放
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. 核心数据库（包含介绍与发音人信息）
    const dialectData = {
        hailing: {
            name: "阳江海陵岛",
            desc: "海陵疍语保留了较多古粤语底层音韵，受阳江方言影响，语调沉降，充满了赶海人的力量感。其独特的底层词汇记录了南海疍民数百年的迁徙痕迹。",
            words: [
                { char: "海", pinyin: "[hǎi]", meaning: "指代生存的水域，疍家人的根。", speaker: "梁金保 (72岁)", audio: "assets/audio/hailing/hai.mp3" },
                { char: "归", pinyin: "[guī]", meaning: "船只回港，亦指游子回到水上的家。", speaker: "梁金保 (72岁)", audio: "assets/audio/hailing/gui.mp3" },
                { char: "水", pinyin: "[shui]", meaning: "万物之源，亦指代财富与流动的生命。", speaker: "林素芳 (65岁)", audio: "assets/audio/hailing/shui.mp3" }
            ]
        },
        lingshui: {
            name: "海南陵水",
            desc: "陵水疍家语受到闽语与黎语交叉影响，声调轻盈上扬。词汇中保留了极高比例的航海专业术语，是研究南海航行史的活化石。",
            words: [
                { char: "海", pinyin: "[hái]", meaning: "广阔的深蓝，生命之母。", speaker: "郑石喜 (68岁)", audio: "assets/audio/lingshui/hai.mp3" },
                { char: "归", pinyin: "[gūi]", meaning: "疍民定居落脚的港湾，带有安稳之意。", speaker: "郑石喜 (68岁)", audio: "assets/audio/lingshui/gui.mp3" },
                { char: "浪", pinyin: "[long]", meaning: "海上的波动，也象征命运的起伏。", speaker: "吴老四 (70岁)", audio: "assets/audio/lingshui/lang.mp3" }
            ]
        }
    };

    // 2. 获取 DOM 元素
    const dialectBtns = document.querySelectorAll('.dialect-btn');
    const wordGrid = document.getElementById('wordGrid');
    const pointName = document.getElementById('pointName');
    const pointDesc = document.getElementById('pointDesc');

    /**
     * 执行渲染逻辑
     * @param {string} point - 方言点 Key (hailing/lingshui)
     */
    function renderContent(point) {
        const data = dialectData[point];
        if (!data) return;

        // A. 更新左侧文字介绍
        pointName.style.opacity = 0; // 简单的切换动效
        pointDesc.style.opacity = 0;
        
        setTimeout(() => {
            pointName.innerText = data.name;
            pointDesc.innerText = data.desc;
            pointName.style.opacity = 1;
            pointDesc.style.opacity = 1;
        }, 200);

        // B. 更新右侧字卡列表
        wordGrid.innerHTML = ""; // 清空当前列表
        
        data.words.forEach(item => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML = `
                <div class="card-top">
                    <span class="char">${item.char}</span>
                    <span class="pinyin">${item.pinyin}</span>
                    <button class="audio-btn" title="点击发音" onclick="playAudio('${item.audio}')">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
                <p class="meaning">${item.meaning}</p>
                <div class="speaker-tag">记录发音人：${item.speaker}</div>
            `;
            wordGrid.appendChild(card);
        });
    }

    // 3. 绑定按钮点击事件
    dialectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const point = this.getAttribute('data-point');
            
            // 切换按钮高亮状态
            dialectBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // 重新渲染内容
            renderContent(point);
        });
    });

    // 4. 页面初始化：默认显示阳江海陵
    renderContent('hailing');
});

/**
 * 全局音频播放函数
 * @param {string} src - 音频文件路径
 */
function playAudio(src) {
    const audio = new Audio(src);
    audio.play().catch(err => {
        console.warn("音频播放受阻，请检查文件路径或浏览器权限:", err);
    });
}