module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended' // Это добавляет нужные правила
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser', // <--- ВОТ ЭТО ДОЛЖНО БЫТЬ ОБЯЗАТЕЛЬНО
    sourceType: 'module',
  },
  rules: {
    // ваши правила
  },
};