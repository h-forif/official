module.exports = {
  ...require('../../.prettierrc.json'),
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  importOrder: [
      '^react',
      '^@mui/(.*)$',
      '<THIRD_PARTY_MODULES>',
      '^@components/(.*)',
      '^@hooks/(.*)$',
      '^@pages/(.*)$',
      '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};