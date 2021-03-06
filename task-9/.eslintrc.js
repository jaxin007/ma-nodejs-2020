module.exports = {
	env: {
		es6: true,
		node: true
	},
	extends: [ 'airbnb-base', 'plugin:prettier/recommended' ],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly'
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	rules: {
		allowForLoopAfterthoughts: 0,
		'no-console': 'off',
		semi: [ 'error', 'always' ]
	},
	plugins: [ 'prettier' ]
};
