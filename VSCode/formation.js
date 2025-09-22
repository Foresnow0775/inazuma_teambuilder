document.addEventListener("DOMContentLoaded", () => {
  const formationSelect = document.querySelector(".formation-select");
  if (!formationSelect) return;

  // --- ベーシック以外のフォーメーション定義 ---
  const formations = {
    "デスゾーン": [
      { left: 42.75, bottom: 0 }, { left: 8, bottom: 30 }, { left: 31, bottom: 20 }, { left: 54, bottom: 20 },
      { left: 77, bottom: 30 }, { left: 42.75, bottom: 35 }, { left: 0, bottom: 0 },
      { left: 42.75, bottom: 50 }, { left: 0, bottom: 0 },
      { left: 0, bottom: 0 }, { left: 0, bottom: 0 } // 適宜調整
    ],
    "ゴーストダンス": [
      { left: 15, bottom: 65 }, { left: 35, bottom: 70 }, { left: 65, bottom: 70 }, { left: 85, bottom: 65 },
      { left: 25, bottom: 50 }, { left: 50, bottom: 45 }, { left: 75, bottom: 50 },
      { left: 35, bottom: 30 }, { left: 65, bottom: 30 },
      { left: 50, bottom: 20 }, { left: 50, bottom: 10 }
    ],
    "スーパー☆５": [
      { left: 25, bottom: 65 }, { left: 50, bottom: 65 }, { left: 75, bottom: 65 },
      { left: 25, bottom: 45 }, { left: 50, bottom: 45 }, { left: 75, bottom: 45 },
      { left: 25, bottom: 25 }, { left: 50, bottom: 25 }, { left: 75, bottom: 25 },
      { left: 50, bottom: 10 }, { left: 50, bottom: 5 }
    ]
  };

  formationSelect.addEventListener("change", () => {
    const selected = formationSelect.value;

    if (selected === "ベーシック" || selected === "-") {
      // CSSの初期位置に戻す → JSで上書きしない
      for (let i = 1; i <= 11; i++) {
        const zone = document.querySelector(`.starting-member${i}`);
        if (zone) zone.style.left = "";
        if (zone) zone.style.bottom = "";
      }
      return;
    }

    const positions = formations[selected];
    if (!positions) return;

    positions.forEach((pos, i) => {
      const zone = document.querySelector(`.starting-member${i+1}`);
      if (!zone) return;
      zone.style.left = pos.left + "%";
      zone.style.bottom = pos.bottom + "%";
    });
  });
});document.addEventListener("DOMContentLoaded", () => {
  const formationSelect = document.querySelector(".formation-select");
  if (!formationSelect) return;

  // --- ベーシック以外のフォーメーション定義 ---
  const formations = {
    "デスゾーン": [
      { left: 42.75, bottom: 0 }, { left: 8, bottom: 30 }, { left: 31, bottom: 20 }, { left: 54, bottom: 20 },
      { left: 77, bottom: 30 }, { left: 42.75, bottom: 35 }, { left: 0, bottom: 0 },
      { left: 42.75, bottom: 50 }, { left: 0, bottom: 0 },
      { left: 0, bottom: 0 }, { left: 0, bottom: 0 } // 適宜調整
    ],
    "ゴーストダンス": [
      { left: 15, bottom: 65 }, { left: 35, bottom: 70 }, { left: 65, bottom: 70 }, { left: 85, bottom: 65 },
      { left: 25, bottom: 50 }, { left: 50, bottom: 45 }, { left: 75, bottom: 50 },
      { left: 35, bottom: 30 }, { left: 65, bottom: 30 },
      { left: 50, bottom: 20 }, { left: 50, bottom: 10 }
    ],
    "スーパー☆５": [
      { left: 25, bottom: 65 }, { left: 50, bottom: 65 }, { left: 75, bottom: 65 },
      { left: 25, bottom: 45 }, { left: 50, bottom: 45 }, { left: 75, bottom: 45 },
      { left: 25, bottom: 25 }, { left: 50, bottom: 25 }, { left: 75, bottom: 25 },
      { left: 50, bottom: 10 }, { left: 50, bottom: 5 }
    ]
  };

  formationSelect.addEventListener("change", () => {
    const selected = formationSelect.value;

    if (selected === "ベーシック" || selected === "-") {
      // CSSの初期位置に戻す → JSで上書きしない
      for (let i = 1; i <= 11; i++) {
        const zone = document.querySelector(`.starting-member${i}`);
        if (zone) zone.style.left = "";
        if (zone) zone.style.bottom = "";
      }
      return;
    }

    const positions = formations[selected];
    if (!positions) return;

    positions.forEach((pos, i) => {
      const zone = document.querySelector(`.starting-member${i+1}`);
      if (!zone) return;
      zone.style.left = pos.left + "%";
      zone.style.bottom = pos.bottom + "%";
    });
  });
});
