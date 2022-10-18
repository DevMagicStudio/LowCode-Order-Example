module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    jsxPragma: 'React',
    ecmaFeatures: {
      jsx: true
    }
  },
  globals: {
    // index.d.ts
    // global.d.ts
    Fn: 'readonly',
    PromiseFn: 'readonly',
    RefType: 'readonly',
    LabelValueOptions: 'readonly',
    EmitType: 'readonly',
    TargetContext: 'readonly',
    ComponentElRef: 'readonly',
    ComponentRef: 'readonly',
    ElRef: 'readonly',
    global: 'readonly',
    ForDataType: 'readonly',
    ComponentRoutes: 'readonly',

    // script setup
    defineProps: 'readonly',
    defineEmits: 'readonly',
    defineExpose: 'readonly',
    withDefaults: 'readonly'
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'vue/script-setup-uses-vars': 2,
    'no-const-assign': 2,
    'no-multiple-empty-lines': [2, { max: 1 }],
    'no-unused-vars': 0,
    'one-var': [2, { initialized: 'never' }],
    'no-dupe-keys': 1,
    // 'new-cap': [2, { newIsCap: true }],
    'object-curly-spacing': [2, 'always'],
    'arrow-spacing': [2, { before: true, after: true }],
    'key-spacing': [2, { beforeColon: false, afterColon: true }],
    'comma-spacing': [2, { before: false, after: true }],
    'for-direction': 2,
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true
      }
    ],
    semi: [2, 'never'],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'no-mutating-props': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/no-unused-vars': 2,
    'vue/custom-event-name-casing': 0,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-unused-vars': [
      2,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'space-before-function-paren': 0,

    'vue/attributes-order': 0,
    'vue/one-component-per-file': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/multiline-html-element-content-newline': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/attribute-hyphenation': 0,
    'vue/require-default-prop': 0,
    'vue/require-explicit-emits': 0,
    'vue/html-self-closing': [
      2,
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/multi-word-component-names': 0,
    'vue/comment-directive': 0,
    'prettier/prettier': [
      2,
      {
        singQutoe: true,
        endOfLint: 'auto',
        endOfLine: 'auto'
      }
    ]
  }
}
