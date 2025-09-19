document.querySelectorAll(".sprite").forEach(sprite => {
  sprite.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", sprite.src);
    e.dataTransfer.setData("source-zone", ""); // 新規なので元ゾーンなし
  });
});

const dropZones = [
  ...Array(11).fill(0).map((_, i) => `starting-member${i+1}`),
  ...Array(5).fill(0).map((_, i) => `bench-member${i+1}`)
];

dropZones.forEach(className => {
  const zone = document.querySelector(`.${className}`);
  if (!zone) return;

  zone.addEventListener("dragover", e => e.preventDefault());

  zone.addEventListener("drop", e => {
    e.preventDefault();
    const imageUrl = e.dataTransfer.getData("text/plain");
    const sourceZoneClass = e.dataTransfer.getData("source-zone");

    if (sourceZoneClass === className) return; // 同じ場所なら何もしない

    // --- 1. 移動元と移動先を取得 ---
    const sourceZone = sourceZoneClass ? document.querySelector(`.${sourceZoneClass}`) : null;
    const targetZone = zone;

    const sourceWrapper = sourceZone?.querySelector(".image-wrapper") || null;
    const targetWrapper = targetZone.querySelector(".image-wrapper") || null;

    // --- 2. 入れ替え用データを保存 ---
    const targetImageUrl = targetWrapper ? targetWrapper.querySelector("img").src : null;

    // --- 3. 移動先を更新 ---
    if (targetWrapper) targetWrapper.remove(); // 先にいた人は一旦消す
    addImageToZone(targetZone, imageUrl, className);

    // --- 4. 元ゾーンが存在 & 先にいた人がいたら入れ替え ---
    if (sourceZone && targetImageUrl) {
      if (sourceWrapper) sourceWrapper.remove();
      addImageToZone(sourceZone, targetImageUrl, sourceZoneClass);
    } else if (sourceWrapper) {
      // 先にいた人がいない場合は元ゾーンを空にするだけ
      sourceWrapper.remove();
    }
  });
});

function addImageToZone(zone, imageUrl, zoneClassName) {
  const wrapper = document.createElement("div");
  wrapper.className = "image-wrapper";
  wrapper.style.position = "relative";

  const newImage = document.createElement("img");
  newImage.src = imageUrl;
  newImage.draggable = true;
  newImage.addEventListener("dragstart", e => {
    e.dataTransfer.setData("text/plain", imageUrl);
    e.dataTransfer.setData("source-zone", zoneClassName);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.className = "delete-btn";
  Object.assign(deleteBtn.style, {
    position: "absolute",
    top: "5px",
    right: "5px",
    backgroundColor: "rgba(255,0,0,0.8)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "25px",
    height: "25px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "23px",
    textAlign: "center"
  });
  deleteBtn.addEventListener("click", e => {
    e.stopPropagation();
    wrapper.remove();
  });

  wrapper.appendChild(newImage);
  wrapper.appendChild(deleteBtn);
  zone.appendChild(wrapper);
}
