document.addEventListener("DOMContentLoaded", () => {
  const formationSelect = document.querySelector(".formation-select");
  if (!formationSelect) return;

  // --- ベーシック以外のフォーメーション定義 ---
  const formations = {
    "(4-4-2)ベーシック": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)デスゾーン": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-5-1)ゴーストダンス": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left: 156, bottom: 280 },{ left: 340, bottom: 280 }, { left: 524, bottom: 280 },
      { left: 248, bottom: 420 },{ left: 432, bottom: 420 },
      { left: 340, bottom: 560 }
    ],
    "(3-4-3)ワイルドパーク": [
      { left: 340, bottom:   0 },
      { left: 110, bottom: 140 },{ left: 340, bottom: 140 },{ left: 570, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 350 },{ left: 432, bottom: 350 }, { left: 616, bottom: 350 },
      { left: 110, bottom: 560 },{ left: 340, bottom: 560 },{ left: 570, bottom: 560 }
    ],
    "(4-4-2)GRID442": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 350 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(2-3-5)スーパー☆５": [
      { left: 340, bottom:   0 },
      { left: 248, bottom: 140 },{ left: 432, bottom: 140 },
      { left: 110, bottom: 350 },{ left: 340, bottom: 350 },{ left: 570, bottom: 350 },
      { left: 100/3, bottom: 560 },{ left: 560/3, bottom: 560 },{ left: 340, bottom: 560 },{ left: 1480/3, bottom: 560 },{ left: 1940/3, bottom: 560 }
    ],
    "(4-4-2)かくよくのじん": [
      { left: 340, bottom:   0 },
      { left: 560/3, bottom: 210 },{ left: 340, bottom: 140 }, { left: 1480/3, bottom: 210 },
      { left:  64, bottom: 280 },{ left: 340, bottom: 280 },{ left: 616, bottom: 280 }, 
      { left:  10, bottom: 420 },{ left: 670, bottom: 420 },
      { left:  10, bottom: 560 },{ left: 670, bottom: 560 }
    ],
    "(4-3-2-1)むげんのかべ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left: 156, bottom: 280 },{ left: 340, bottom: 280 }, { left: 524, bottom: 280 },
      { left: 248, bottom: 420 },{ left: 432, bottom: 420 },
      { left: 340, bottom: 560 }
    ],
    "(4-3-3)ムカタ・マーチ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left: 156, bottom: 350 },{ left: 340, bottom: 350 }, { left: 524, bottom: 350 },
      { left:  64, bottom: 560 },{ left: 340, bottom: 560 }, { left: 616, bottom: 560 }
    ],
    "(4-4-2)ヘブンズゲート": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 175 },{ left: 248, bottom: 105 }, { left: 432, bottom: 105 },{ left: 616, bottom: 175 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 280 }, { left: 432, bottom: 280 },{ left: 616, bottom: 350 },
      { left: 340, bottom: 420 },{ left: 340, bottom: 560 }
    ],
    "(5-4-1)ファランクス": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 340, bottom: 170 },{ left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 110, bottom: 365 }, { left: 340, bottom: 300 },{ left: 570, bottom: 365 },{ left: 340, bottom: 430 },
      { left: 340, bottom: 560 }
    ],
    "(4-3-3)バタフライ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 175 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 175 },
      { left: 156, bottom: 400 },{ left: 340, bottom: 300 }, { left: 524, bottom: 400 },
      { left:  64, bottom: 560 },{ left: 340, bottom: 450 }, { left: 616, bottom: 560 }
    ],
    "(3-4-3)ドットプリズン": [
      { left: 340, bottom:   0 },
      { left: 110, bottom: 140 },{ left: 340, bottom: 140 },{ left: 570, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 218, bottom: 265 },{ left: 462, bottom: 265 }, { left: 616, bottom: 350 },
      { left: 160, bottom: 560 },{ left: 340, bottom: 410 },{ left: 520, bottom: 560 }
    ],
    "(3-1-3-3)ボー＆アロー": [
      { left: 340, bottom:   0 },
      { left: 210, bottom: 140 },{ left: 340, bottom: 140 }, { left: 470, bottom: 140 },
      { left: 340, bottom: 280 },
      { left:  44, bottom: 350 },{ left: 340, bottom: 420 }, { left: 636, bottom: 350 },
      { left:  90, bottom: 500 },{ left: 340, bottom: 560 }, { left: 590, bottom: 500 }
    ],
    "(3-2-2-1-2)ミドルブロック": [
      { left: 340, bottom:   0 },
      { left: 160, bottom: 140 },{ left: 340, bottom: 140 },{ left: 520, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 265 },{ left: 432, bottom: 265 }, { left: 616, bottom: 350 },
      { left: 210, bottom: 500 },{ left: 340, bottom: 410 },{ left: 470, bottom: 500 }
    ],
    "(4-3-3)フェニックス": [
      { left: 340, bottom:   0 },
      { left:  90, bottom: 210 },{ left: 340, bottom: 140 }, { left: 590, bottom: 210 },
      { left: 340, bottom: 280 },
      { left: 210, bottom: 350 },{ left: 340, bottom: 420 }, { left: 470, bottom: 350 },
      { left:  10, bottom: 500 },{ left: 340, bottom: 560 }, { left: 670, bottom: 500 }
    ],
    "(5-3-2)ジェミニ": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)ダブルドッグ": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-4-1)イプシロン": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 340, bottom: 170 },{ left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 110, bottom: 365 }, { left: 340, bottom: 300 },{ left: 570, bottom: 365 },{ left: 340, bottom: 430 },
      { left: 340, bottom: 560 }
    ],
    "(5-3-2)イージス": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)ジェネシス": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)Dエンペラー": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)カオス": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)デスゾーン2": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-3-3)スリートップ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left: 156, bottom: 350 },{ left: 340, bottom: 350 }, { left: 524, bottom: 350 },
      { left:  64, bottom: 560 },{ left: 340, bottom: 560 }, { left: 616, bottom: 560 }
    ],
    "(4-4-2)ビッグウェイブ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)Dライオン": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-3-3)NEO": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 175 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 175 },
      { left: 156, bottom: 400 },{ left: 340, bottom: 300 }, { left: 524, bottom: 400 },
      { left:  64, bottom: 560 },{ left: 340, bottom: 450 }, { left: 616, bottom: 560 }
    ],
    "(4-3-3)Fドラゴン": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left: 156, bottom: 350 },{ left: 340, bottom: 350 }, { left: 524, bottom: 350 },
      { left:  64, bottom: 560 },{ left: 340, bottom: 560 }, { left: 616, bottom: 560 }
    ],
    "(4-4-2)ナイツ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)KAGE": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)エンパイア": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)ユニコーン": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)オルフェウス": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-3-3)キングダム": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left: 156, bottom: 350 },{ left: 340, bottom: 350 }, { left: 524, bottom: 350 },
      { left:  64, bottom: 560 },{ left: 340, bottom: 560 }, { left: 616, bottom: 560 }
    ],
    "(4-4-2)アサシン": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)リトルギガント": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)マタドール": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 175 },{ left: 248, bottom: 105 }, { left: 432, bottom: 105 },{ left: 616, bottom: 175 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 280 }, { left: 432, bottom: 280 },{ left: 616, bottom: 350 },
      { left: 340, bottom: 420 },{ left: 340, bottom: 560 }
    ],
    "(4-3-3)ブレッド": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 175 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 175 },
      { left: 156, bottom: 400 },{ left: 340, bottom: 300 }, { left: 524, bottom: 400 },
      { left:  64, bottom: 560 },{ left: 340, bottom: 450 }, { left: 616, bottom: 560 }
    ],
    "(4-4-2)エッフェル": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)ブリッツ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 350 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)パンテオン": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 350 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)パンデモニウム": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-4-2)ブランゼル": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left:  64, bottom: 420 },{ left: 248, bottom: 350 }, { left: 432, bottom: 350 },{ left: 616, bottom: 420 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(5-3-2)オーガ": [
      { left: 340, bottom:   0 },
      { left: 100/3, bottom: 210 },{ left: 560/3, bottom: 140 }, { left: 1480/3, bottom: 140 },{ left: 1940/3, bottom: 210 },
      { left: 340, bottom: 250 },
      { left: 110, bottom: 405 }, { left: 340, bottom: 405 },{ left: 570, bottom: 405 },
      { left: 248, bottom: 560 },{ left: 432, bottom: 560 }
    ],
    "(4-3-3)ライモン": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left: 110, bottom: 405 },{ left: 340, bottom: 300 },{ left: 570, bottom: 405 },
      { left: 198, bottom: 560 },{ left: 340, bottom: 455 },{ left: 482, bottom: 560 }
    ],
    "(4-3-3)ダークナイツ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left: 156, bottom: 350 },{ left: 340, bottom: 350 }, { left: 524, bottom: 350 },
      { left:  99, bottom: 560 },{ left: 340, bottom: 560 }, { left: 581, bottom: 560 }
    ],
    "(4-4-2)キッズハート": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 140 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 140 },
      { left: 198, bottom: 320 },{ left: 482, bottom: 320 }, { left: 198, bottom: 440 },{ left: 482, bottom: 440 },
      { left: 340, bottom: 440 },{ left: 340, bottom: 560 }
    ],
    "(3-4-3)ミルキーウェイ": [
      { left: 340, bottom:   0 },
      { left: 160, bottom: 140 },{ left: 340, bottom: 140 },{ left: 520, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 350 },{ left: 432, bottom: 350 }, { left: 616, bottom: 350 },
      { left: 110, bottom: 560 },{ left: 340, bottom: 560 },{ left: 570, bottom: 560 }
    ],
    "(4-3-3)オムニ": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left: 228, bottom: 405 },{ left: 340, bottom: 300 }, { left: 452, bottom: 405 },
      { left:  80, bottom: 510 },{ left: 340, bottom: 560 }, { left: 600, bottom: 510 }
    ],
    "(4-3-3)ネオデスゾーン": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left: 110, bottom: 385 },{ left: 340, bottom: 240 },{ left: 570, bottom: 385 },
      { left: 198, bottom: 560 },{ left: 340, bottom: 400 },{ left: 482, bottom: 560 }
    ],
    "(3-5-2)マリンスノー": [
      { left: 340, bottom:   0 },
      { left: 160, bottom: 140 },{ left: 340, bottom: 170 },{ left: 520, bottom: 140 },
      { left: 200, bottom: 300 },{ left: 480, bottom: 300 },
      { left:  64, bottom: 420 },{ left: 340, bottom: 400 },{ left: 616, bottom: 420 },
      { left: 198, bottom: 560 },{ left: 482, bottom: 560 }
    ],
    "(4-2-1-3)ムーンライト": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 },{ left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left: 200, bottom: 325 },{ left: 340, bottom: 440 },{ left: 480, bottom: 325 },
      { left: 220, bottom: 560 },{ left: 340, bottom: 560 },{ left: 460, bottom: 560 }
    ],
    "(4-5-1)ソフトライム": [
      { left: 340, bottom:   0 },
      { left: 200, bottom: 140 },{ left: 270, bottom: 260 },{ left: 410, bottom: 260 },{ left: 480, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 200, bottom: 470 },{ left: 340, bottom: 380 },{ left: 480, bottom: 470 },{ left: 616, bottom: 350 },
      { left: 340, bottom: 560 }
    ],
    "(4-3-3)タイガストライク": [
      { left: 340, bottom:   0 },
      { left:  94, bottom: 140 },{ left: 263, bottom: 140 }, { left: 417, bottom: 140 },{ left: 586, bottom: 140 },
      { left: 220, bottom: 385 },{ left: 340, bottom: 300 },{ left: 460, bottom: 385 },
      { left:  94, bottom: 560 },{ left: 340, bottom: 470 },{ left: 586, bottom: 560 }
    ],
    "(4-3-3)ファントム": [
      { left: 340, bottom:   0 },
      { left:  64, bottom: 210 },{ left: 248, bottom: 140 }, { left: 432, bottom: 140 },{ left: 616, bottom: 210 },
      { left: 110, bottom: 405 },{ left: 340, bottom: 300 },{ left: 570, bottom: 405 },
      { left: 240, bottom: 560 },{ left: 340, bottom: 435 },{ left: 440, bottom: 560 }
    ],
    "(3-4-3)ネオクラウド": [
      { left: 340, bottom:   0 },
      { left: 130, bottom: 140 },{ left: 340, bottom: 140 },{ left: 550, bottom: 140 },
      { left:  64, bottom: 350 },{ left: 248, bottom: 350 },{ left: 432, bottom: 350 }, { left: 616, bottom: 350 },
      { left: 110, bottom: 560 },{ left: 340, bottom: 560 },{ left: 570, bottom: 560 }
    ],
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
      zone.style.left = pos.left*100/800 + "%";
      zone.style.bottom = pos.bottom*100/700 + "%";
    });
  });
});
