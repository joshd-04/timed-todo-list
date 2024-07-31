export function themeHandler(
  theme: 'light' | 'dark',
  readyToStartChangingTheme: boolean
) {
  if (readyToStartChangingTheme) {
    const root = document.documentElement;

    interface IColorScheme {
      [key: string]: string;
    }
    const lightMode: IColorScheme = {
      '--base-color': '#ffffff',
      '--base-accent-dark': '#d9d9d9',
      '--base-accent-light': '#efefef',
      '--scrollbar-color': '#a9a9a9',
      '--text-color': '#000000',
      '--text-accent': '#353535',
    };
    const darkMode: IColorScheme = {
      '--base-color': '#000000',
      '--base-accent-dark': '#262626',
      '--base-accent-light': '#101010',
      '--scrollbar-color': '#131313',
      '--text-color': '#ffffff',
      '--text-accent': '#f0f0f0',
    };

    let colorScheme: IColorScheme;
    if (theme === 'dark') colorScheme = darkMode;
    else colorScheme = lightMode;

    for (const property of Object.entries(colorScheme)) {
      root.style.setProperty(property[0], property[1]);
    }

    // save it to local storage
    localStorage.setItem('theme', theme);
  }
}
