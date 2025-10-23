// ===== 最小修正版：移動＆入れ替え対応 + ハイライト追加 =====

// グローバルで「配置済みの wrapper」を一時保持
let __draggedWrapper = null;
let __draggedSourceZone = "";

// --- ドラッグ開始時 (from player list の sprite) ---
document.querySelectorAll(".sprite").forEach(sprite => {
  sprite.addEventListener("dragstart", e => {
    const card = sprite.closest(".player-card");
    const name = card.querySelector(".nickname").textContent;
    const number = card.querySelector(".number").textContent;

    __draggedWrapper = null;
    __draggedSourceZone = "";

    e.dataTransfer.setData("text/plain", sprite.src);
    e.dataTransfer.setData("player-name", name);
    e.dataTransfer.setData("player-number", number);
    e.dataTransfer.setData("source-zone", "");
  });
});

// --- ドロップゾーン ---
const dropZones = [
  ...Array(11).fill(0).map((_, i) => `starting-member${i+1}`),
  ...Array(5).fill(0).map((_, i) => `bench-member${i+1}`)
];

dropZones.forEach(className => {
  const zone = document.querySelector(`.${className}`);
  if (!zone) return;

  // --- ハイライト処理 ---
  zone.addEventListener("dragenter", () => zone.classList.add("drop-highlight"));
  zone.addEventListener("dragleave", () => zone.classList.remove("drop-highlight"));
  zone.addEventListener("drop", () => zone.classList.remove("drop-highlight"));

  zone.addEventListener("dragover", e => e.preventDefault());

  zone.addEventListener("drop", e => {
    e.preventDefault();

    const imageUrl = e.dataTransfer.getData("text/plain");
    const playerName = e.dataTransfer.getData("player-name");
    const playerNumber = e.dataTransfer.getData("player-number");
    const sourceZoneClassFromDT = e.dataTransfer.getData("source-zone");

    let sourceZoneClass = sourceZoneClassFromDT;
    let sourceWrapper = null;
    if (!sourceZoneClass && __draggedWrapper) {
      sourceWrapper = __draggedWrapper;
      sourceZoneClass = __draggedSourceZone || (sourceWrapper.parentElement ? sourceWrapper.parentElement.className : "");
    } else if (sourceZoneClass) {
      const maybeZone = document.querySelector(`.${sourceZoneClass}`);
      sourceWrapper = maybeZone ? maybeZone.querySelector(".image-wrapper") : null;
    }

    const sourceZone = sourceZoneClass ? document.querySelector(`.${sourceZoneClass}`) : null;
    const targetZone = zone;

    const targetWrapper = targetZone.querySelector(".image-wrapper");
    let targetImageUrl = null, targetName = null, targetNumber = null;
    if (targetWrapper) {
      const imgEl = targetWrapper.querySelector("img");
      const nameEl = targetWrapper.querySelector(".name-display");
      const numEl = targetWrapper.querySelector(".number-display");
      targetImageUrl = imgEl ? imgEl.src : null;
      targetName = nameEl ? nameEl.textContent : "";
      targetNumber = numEl ? numEl.textContent : "";
      targetWrapper.remove();
    }

    addImageToZone(targetZone, imageUrl, className, playerName, playerNumber);

    if (sourceZone || sourceWrapper) {
      if (sourceWrapper && sourceWrapper.parentElement) {
        sourceWrapper.remove();
      } else if (sourceZone) {
        const sw = sourceZone.querySelector(".image-wrapper");
        if (sw) sw.remove();
      }

      if (targetImageUrl) {
        const destZone = sourceZone || (sourceWrapper ? sourceWrapper.parentElement : null);
        const destZoneClass = sourceZoneClass || (destZone ? destZone.className : "");
        if (destZone) {
          addImageToZone(destZone, targetImageUrl, destZoneClass, targetName, targetNumber);
        }
      }
    }

    __draggedWrapper = null;
    __draggedSourceZone = "";
  });
});

// --- 配置関数 ---
function addImageToZone(zone, imageUrl, zoneClassName, name, number) {
  const wrapper = document.createElement("div");
  wrapper.className = "image-wrapper";
  wrapper.style.position = "relative";

  const img = document.createElement("img");
  img.src = imageUrl;
  img.draggable = true;
  img.className = "dropped-image";

  img.addEventListener("dragstart", e => {
    __draggedWrapper = wrapper;
    __draggedSourceZone = zoneClassName || (wrapper.parentElement ? wrapper.parentElement.className : "");

    e.dataTransfer.setData("text/plain", imageUrl);
    e.dataTransfer.setData("player-name", name);
    e.dataTransfer.setData("player-number", number);
    e.dataTransfer.setData("source-zone", zoneClassName);
  });

  const nameDiv = document.createElement("div");
  nameDiv.textContent = name;
  nameDiv.className = "name-display";
  Object.assign(nameDiv.style, {
    position: "absolute",
    bottom: "-20px",
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "14px",
    color: "black",
  });

  const numberDiv = document.createElement("div");
  numberDiv.textContent = number;
  numberDiv.className = "number-display";
  Object.assign(numberDiv.style, {
    position: "absolute",
    top: "2px",
    left: "2px",
    fontWeight: "bold",
    fontSize: "18px",
    color: "black",
    textShadow: "2px 2px 2px white",
    cursor: "pointer"
  });

  numberDiv.addEventListener("click", e => {
    e.stopPropagation();
    const input = document.createElement("input");
    input.type = "text";
    input.value = numberDiv.textContent;
    Object.assign(input.style, {
      position: "absolute",
      top: "0px",
      left: "0px",
      width: "30px",
      fontSize: "16px",
      fontWeight: "bold",
      textAlign: "center",
      zIndex: 20
    });

    numberDiv.parentElement.appendChild(input);
    numberDiv.style.display = "none";
    input.focus();

    const save = () => {
      numberDiv.textContent = input.value;
      numberDiv.style.display = "block";
      input.remove();
    };

    input.addEventListener("keydown", ev => {
      if (ev.key === "Enter") save();
    });
    input.addEventListener("blur", save);
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "×";
  deleteBtn.className = "delete-btn";
  deleteBtn.addEventListener("click", e => {
    e.stopPropagation();
    wrapper.remove();
  });

  wrapper.appendChild(img);
  wrapper.appendChild(nameDiv);
  wrapper.appendChild(numberDiv);
  wrapper.appendChild(deleteBtn);
  zone.appendChild(wrapper);
}

// --- 表示切替 ---
document.getElementById("toggle-name").addEventListener("change", e => {
  document.querySelectorAll(".name-display").forEach(el => {
    el.style.display = e.target.checked ? "block" : "none";
  });
});
document.getElementById("toggle-number").addEventListener("change", e => {
  document.querySelectorAll(".number-display").forEach(el => {
    el.style.display = e.target.checked ? "block" : "none";
  });
});
