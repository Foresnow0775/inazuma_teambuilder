// defaultImageHandler.js

document.addEventListener("DOMContentLoaded", () => {
  const defaultImageUrl = "TB用/99999.png"; // ← ここにデフォルト画像のパスを指定

  const dropZones = [
    ...Array.from({ length: 11 }, (_, i) => `starting-member${i + 1}`),
    ...Array.from({ length: 7 }, (_, i) => `bench-member${i + 1}`),
  ];

  dropZones.forEach(className => {
    const zone = document.querySelector(`.${className}`);
    if (!zone) return;

    // デフォルト画像を表示する関数
    const showDefaultImage = () => {
      const wrapper = document.createElement("div");
      wrapper.className = "image-wrapper default-image";

      const img = document.createElement("img");
      img.src = defaultImageUrl;
      img.classList.add("dropped-image");

      wrapper.appendChild(img);
      zone.appendChild(wrapper);
    };

    // 初期表示：デフォルト画像を追加
    if (!zone.querySelector(".image-wrapper")) {
      showDefaultImage();
    }

    // MutationObserverでDOM変化を監視（選手が配置されたらデフォルト画像を消す）
    const observer = new MutationObserver(() => {
      const wrappers = zone.querySelectorAll(".image-wrapper");
      const hasPlayer = Array.from(wrappers).some(wrapper => {
        return !wrapper.classList.contains("default-image");
      });

      const defaultWrapper = zone.querySelector(".image-wrapper.default-image");

      if (hasPlayer && defaultWrapper) {
        defaultWrapper.remove();
      }

      if (!hasPlayer && !defaultWrapper) {
        showDefaultImage();
      }
    });

    observer.observe(zone, { childList: true });
  });
});
