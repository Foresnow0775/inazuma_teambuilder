document.querySelectorAll(".player-card").forEach(card => {
  const infoDiv = card.querySelector(".info");

  // HTML属性を取得
  const position = card.getAttribute("position");
  const element  = card.getAttribute("element");
  const grade    = card.getAttribute("grade");
  const gender   = card.getAttribute("gender");

  // 画像ファイル名マッピング
  const positionMap = {
    "GK": "https://foresnow0775.github.io/inazuma_teambuilder/images/information/0_1_GK.PNG",
    "DF": "https://foresnow0775.github.io/inazuma_teambuilder/images/information/0_2_DF.PNG",
    "MF": "https://foresnow0775.github.io/inazuma_teambuilder/images/information/0_3_MF.PNG",
    "FW": "https://foresnow0775.github.io/inazuma_teambuilder/images/information/0_4_FW.PNG"
  };

  const elementMap = {
    "wind":     "https://foresnow0775.github.io/inazuma_teambuilder/images/information/1_1_wind.PNG",
    "forest":   "https://foresnow0775.github.io/inazuma_teambuilder/images/information/1_2_forest.PNG",
    "fire":     "https://foresnow0775.github.io/inazuma_teambuilder/images/information/1_3_fire.PNG",
    "mountain": "https://foresnow0775.github.io/inazuma_teambuilder/images/information/1_4_mountain.PNG",
  };

  const gradeMap = {
    "1st":     "https://foresnow0775.github.io/inazuma_teambuilder/images/information/2_1_1st.PNG",
    "2nd":     "https://foresnow0775.github.io/inazuma_teambuilder/images/information/2_2_2nd.PNG",
    "3rd":     "https://foresnow0775.github.io/inazuma_teambuilder/images/information/2_3_3rd.PNG",
    "adult":   "https://foresnow0775.github.io/inazuma_teambuilder/images/information/2_4_adult.PNG",
    "child":   "https://foresnow0775.github.io/inazuma_teambuilder/images/information/2_5_child.PNG",
    "unknown": "https://foresnow0775.github.io/inazuma_teambuilder/images/information/2_6_unknown.PNG",
  };

  const genderMap = {
    "male":    "https://foresnow0775.github.io/inazuma_teambuilder/images/information/3_1_male.PNG",
    "female":  "https://foresnow0775.github.io/inazuma_teambuilder/images/information/3_2_female.PNG",
    "unknown": "https://foresnow0775.github.io/inazuma_teambuilder/images/information/3_3_unknown.PNG",
  };

  // パスを決定
  const images = [
    {
      class: "position",
      src: positionMap[position], // ←positionによって切り替え
      alt: position
    },
    {
      class: "element",
      src: elementMap[element],   // ←elementによって切り替え
      alt: element
    },
    {
      class: "grade",
      src: gradeMap[grade],
      alt: grade
    },
    {
      class: "gender",
      src: genderMap[gender],
      alt: gender
    }
  ];

  // img要素を作成してinfoに追加
  images.forEach(imgData => {
    const img = document.createElement("img");
    img.className = imgData.class;
    img.src = imgData.src;
    img.alt = imgData.alt;
    infoDiv.appendChild(img);
  });
});