const sections = document.querySelectorAll("section");

/* ナビのスムーズスクロール */
document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", (e) => {
        const target = document.querySelector(link.getAttribute("href"));

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

/* スクロールでセクション表示 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => {
    observer.observe(section);
});

const bars = document.querySelectorAll(".bar");

bars.forEach(bar => {
    const fill = bar.querySelector(".fill");
    const value = fill.dataset.value;

    // 初期状態は完成形にしておく
    fill.style.width = value + "%";

    bar.addEventListener("mouseenter", () => {

        // 一旦0に戻す
        fill.style.transition = "none";
        fill.style.width = "0%";

        // 強制リフロー（重要）
        fill.offsetHeight;

        // 再アニメーション開始
        fill.style.transition = "width 0.8s cubic-bezier(.2,.9,.2,1)";
        fill.style.width = value + "%";
    });

});