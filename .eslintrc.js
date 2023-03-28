module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    JSX: true,
    React: true,
  },
  extends: [
    'prettier',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['react', '@typescript-eslint', 'jsx-a11y'],
  rules: {
    //'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'no-use-before-define': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/extensions': 'off',
    'react/require-default-props': 'off',
    'react/no-danger': 'off',
    '@next/next/no-document-import-in-page': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'react/function-component-definition': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"]
  },
}
