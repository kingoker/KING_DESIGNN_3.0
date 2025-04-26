// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        // перезаписываем утилиту font-sans
        sans: ['"Exo 2"', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // если вы хотите оставить Roboto как fallback
      }
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
