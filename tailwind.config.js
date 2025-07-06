// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Exo 2"', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#24F038',
        background: '#121926',
        backgroundSecondary: '#080F1C',
      },
    }
  },
  // если вы используете JIT, не забудьте указать пути к файлам
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}'
  ]
}
