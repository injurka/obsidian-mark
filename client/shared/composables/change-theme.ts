enum ThemesVariant {
  Light = 'light',
  Dark = 'dark',
  Rainy = 'rainy',
}

const themesColors: Record<ThemesVariant, string> = {
  [ThemesVariant.Light]: '#dcdfe1',
  [ThemesVariant.Dark]: '#161b22',
  [ThemesVariant.Rainy]: '#121314',
}

function useChangeTheme() {
  const theme = useColorMode()

  function applyToHead(value: ThemesVariant) {
    useHead({
      meta: [
        { name: 'theme-color', content: themesColors[value] },
      ],
    })
  }

  function getHeadThemeColor() {
    return themesColors[theme.value as ThemesVariant]
  }

  const setTheme = (value: ThemesVariant) => {
    theme.preference = value
    applyToHead(value)
  }

  return {
    theme,
    getHeadThemeColor,
    setTheme,
  }
}

export { useChangeTheme }
export { ThemesVariant }
