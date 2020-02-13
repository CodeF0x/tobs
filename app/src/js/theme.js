class Theme {
  constructor(theme) {
    const url = 'css/';
    document.getElementById('color-preference').href =
      (theme === 'light' ? url + 'light' : url + 'dark') + '.css';
  }
}

export default Theme;