document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('search-toggle-btn');
  const searchWindow = document.querySelector('.search-window');
  const searchHeader = document.getElementById('search-header');
  const seriesFilterContainer = document.getElementById('series-filters'); // シリーズ選択ボタン群の親要素

  toggleBtn.textContent = '+';
  searchWindow.classList.add('collapsed');

  const teams = document.querySelectorAll('.team-section');

  teams.forEach(team => {
    const players = team.querySelector('.team-players');
    const header = team.querySelector('.team-header');
    const btn = header.querySelector('.toggle-btn');

    // 初期状態は最小化（折りたたみ）
    players.classList.add('collapsed');
    btn.textContent = '+';

    // チームヘッダークリックで開閉
    header.addEventListener('click', () => {
      players.classList.toggle('collapsed');
      btn.textContent = players.classList.contains('collapsed') ? '+' : '−';
    });
  });

  // シリーズ選択ボタンとチームヘッダーの表示切替
  function updateUIForSearchWindow() {
    const isCollapsed = searchWindow.classList.contains('collapsed');
    if (isCollapsed) {
      seriesFilterContainer.style.display = 'flex';
      teams.forEach(team => {
        const header = team.querySelector('.team-header');
        const players = team.querySelector('.team-players');
        const btn = header.querySelector('.toggle-btn');
        if (header) header.style.display = 'flex';

        // 最小化状態なので選手リストは collapsed にし、ボタンは「+」
        if (players) players.classList.add('collapsed');
        if (btn) btn.textContent = '+';
      });
    } else {
      seriesFilterContainer.style.display = 'none';
      teams.forEach(team => {
        const header = team.querySelector('.team-header');
        if (header) header.style.display = 'none';
      });
    }
  }

  // 全チーム展開（検索時用）
  function expandAllTeams() {
    teams.forEach(team => {
      const players = team.querySelector('.team-players');
      const btn = team.querySelector('.toggle-btn');
      players.classList.remove('collapsed');
      if (btn) btn.textContent = '−';
    });
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    searchWindow.classList.toggle('collapsed');
    toggleBtn.textContent = searchWindow.classList.contains('collapsed') ? '+' : '−';

    updateUIForSearchWindow();

    if (!searchWindow.classList.contains('collapsed')) {
      expandAllTeams();
    }
  });

  searchHeader.addEventListener('click', () => {
    searchWindow.classList.toggle('collapsed');
    toggleBtn.textContent = searchWindow.classList.contains('collapsed') ? '+' : '−';

    updateUIForSearchWindow();

    if (!searchWindow.classList.contains('collapsed')) {
      expandAllTeams();
    }
  });

  const nameInput = document.getElementById('player-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const seriesButtons = document.querySelectorAll('.series-btn');
  let selectedSeries = '1';

  seriesButtons.forEach(btn => {
    if (btn.dataset.series === selectedSeries) {
      btn.classList.add('selected');
    }
    btn.addEventListener('click', () => {
      if (selectedSeries === btn.dataset.series) return;
      seriesButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSeries = btn.dataset.series;
      filterPlayers();
    });
  });

  function getSelectedFilters() {
    const filters = {
      element: [],
      position: [],
      grade: [],
      gender: []
    };
    filterButtons.forEach(btn => {
      if (btn.classList.contains('selected')) {
        const type = btn.dataset.filterType;
        const val = btn.dataset.filterValue;
        if (type !== 'series') {
          filters[type].push(val);
        }
      }
    });
    return filters;
  }

  function isUsingFilters(filters, searchValue) {
    if (searchValue.trim() !== '') return true;
    for (const key in filters) {
      if (filters[key].length > 0) return true;
    }
    return false;
  }

  function filterPlayers() {
    const searchValue = nameInput.value.toLowerCase();
    const filters = getSelectedFilters();

    const players = document.querySelectorAll('.player-card');
    const isFiltered = isUsingFilters(filters, searchValue);
    const isSearchWindowExpanded = !searchWindow.classList.contains('collapsed');

    players.forEach(player => {
      const name = player.querySelector('.nickname').textContent.toLowerCase();
      const position = player.getAttribute('position');
      const element = player.getAttribute('element');
      const grade = player.getAttribute('grade');
      const gender = player.getAttribute('gender');

      if (isSearchWindowExpanded && !isFiltered) {
        // 検索ヘッダー最大化かつ絞り込みなし → 全選手表示
        player.style.display = 'block';
        return;
      }

      const matchesName = name.includes(searchValue);
      const matchesPosition = filters.position.length === 0 || filters.position.includes(position);
      const matchesElement = filters.element.length === 0 || filters.element.includes(element);
      const matchesGrade = filters.grade.length === 0 || filters.grade.includes(grade);
      const matchesGender = filters.gender.length === 0 || filters.gender.includes(gender);

      if (matchesName && matchesPosition && matchesElement && matchesGrade && matchesGender) {
        player.style.display = 'block';
      } else {
        player.style.display = 'none';
      }
    });

    const teams = document.querySelectorAll('.team-section');

    if (isFiltered) {
      // 絞り込み中：チームは全部表示、チームヘッダーは非表示
      teams.forEach(team => {
        team.style.display = 'block';
        const header = team.querySelector('.team-header');
        if (header) header.style.display = 'none';
      });
    } else if (isSearchWindowExpanded) {
      // 検索ヘッダー最大化かつ絞り込みなし：全チーム表示、チームヘッダー非表示
      teams.forEach(team => {
        team.style.display = 'block';
        const header = team.querySelector('.team-header');
        if (header) header.style.display = 'none';
      });
    } else {
      // 通常時：選択シリーズのチームのみ表示、チームヘッダーも表示
      teams.forEach(team => {
        if (team.dataset.series === selectedSeries) {
          team.style.display = 'block';
          const header = team.querySelector('.team-header');
          if (header) header.style.display = 'flex';
        } else {
          team.style.display = 'none';
        }
      });
    }
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('selected');
      filterPlayers();
    });
  });

  nameInput.addEventListener('input', filterPlayers);

  // 初期UI更新＆フィルター適用
  updateUIForSearchWindow();
  filterPlayers();
});