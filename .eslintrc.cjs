/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'plugin:vue/vue3-recommended',
        'plugin:vue/vue3-strongly-recommended',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'array-bracket-spacing': ['error', 'never'],
        'brace-style': 'error',
        'comma-dangle': ['error', 'always-multiline'],
        'comma-spacing': 'error',
        'curly': ['error', 'all'],
        'eol-last': 'error',
        indent: ['error', 4, {SwitchCase: 1}],
        'no-duplicate-imports': 'error',
        'no-multi-spaces': 'error',
        'no-param-reassign': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': ['error', 'never'],
        quotes: ['error', 'single'],
        semi: ['error', 'always'],
        'sort-imports': 'error',
        'space-before-function-paren': ['error', 'never'],
        'space-in-parens': 'error',
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'spaced-comment': 'error',
        'vue/html-indent': ['error', 4],
        'vue/multi-word-component-names': 'off',
    },
};
