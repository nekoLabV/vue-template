import globals from 'globals'
import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import vuePlugin from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  js.configs.recommended,
  {
    rules: {
      /*
       * 关闭 Vue 组件名必须是多个单词的组合
       */
      'vue/multi-word-component-names': 'off'
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: globals.browser,
      parser: tsParser,
      sourceType: 'module'
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    }
  },
  // vuePlugin.configs['flat/recommended'],
  // {
  //   files: ['**/*.vue'],
  //   plugins: {
  //     vue: vuePlugin
  //   },
  //   languageOptions: {
  //     parser: vueParser,
  //     parserOptions: {
  //       ecmaVersion: 'latest',
  //       sourceType: 'module',
  //       parser: '@typescript-eslint/parser'
  //     }
  //   }
  // },
  {
    ignores: ['node_modules/**', 'dist/**', 'public/**']
  }
]
