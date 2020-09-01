module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    env: {
        "browser": true,
        "node": true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    rules: {
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-unused-vars': 0,
        'no-useless-catch': 0,
        'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 1 }],
        "no-trailing-spaces": ["error", {"skipBlankLines": true}],
        "require-await": 2,
    }
};