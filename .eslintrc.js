module.exports = {
	env: {
		browser: true,
		commonjs: true,
		node: true,
		es6: true,
		jest: true,
	},
	extends: 'eslint:recommended',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true
		}
	},
	rules: {
		'no-console': 'off',
		indent: [
			'error',
			'tab',
			{
				'SwitchCase': 1
			}
		],
		'no-cond-assign': 'error',
		'no-unused-vars': [
			'error',
			{
				vars: 'all',
				args: 'none',
				ignoreRestSiblings: true,
			},
		],
		'linebreak-style': 'off',
		quotes: [
			'error',
			'single',
		],
		'comma-dangle': 'off',
		semi: [
			'error',
			'always'
		],
		'no-case-declarations': 'off',
		'space-in-parens': [ 'error', 'always' ],
		'prefer-const': [ 'error', {
			'destructuring': 'any',
			'ignoreReadBeforeAssign': false
		} ],
		'keyword-spacing': [
			'error',
			{
				'before': true,
				'after': true
			}
		],
		'max-len': [
			'error',
			{
				'code': 120
			}
		],
		'object-curly-spacing': [ 'error', 'always' ],
		'array-bracket-spacing': [ 'error', 'always' ],
		'comma-dangle': ['error', {
			'arrays': 'always-multiline',
			'objects': 'always-multiline',
			'imports': 'always-multiline',
			'exports': 'always-multiline',
			'functions': 'never',
		} ],
		'space-before-function-paren': ['error', {
			'named': 'never',
			'anonymous': 'never',
			'asyncArrow': 'always',
		} ],
		'arrow-spacing': [ 'error', { 'before': true, 'after': true } ],
		'space-before-blocks': [ 'error', 'always' ],
		'computed-property-spacing': ['error', 'always' ],
		'key-spacing': [ 'error', {
			'beforeColon': false,
			'afterColon': true
		} ],
		'template-curly-spacing': ['error', 'always' ],
		'space-infix-ops': 'error',
	},
}