import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const defaultCustom: CustomThemeConfig = {
	name: 'default',
	properties: {
		// =~= Theme Properties =~=
		"--theme-font-family-base": `system-ui`,
		"--theme-font-family-heading": `system-ui`,
		"--theme-font-color-base": "0 0 0",
		"--theme-font-color-dark": "255 255 255",
		"--theme-rounded-base": "4px",
		"--theme-rounded-container": "8px",
		"--theme-border-base": "2px",
		// =~= Theme On-X Colors =~=
		"--on-primary": "0 0 0",
		"--on-secondary": "0 0 0",
		"--on-tertiary": "0 0 0",
		"--on-success": "0 0 0",
		"--on-warning": "0 0 0",
		"--on-error": "0 0 0",
		"--on-surface": "255 255 255",
		// =~= Theme Colors  =~=
		// primary | #ac96b7 
		"--color-primary-50": "223 211 212", // #dfd3d4
		"--color-primary-100": "221 208 211", // #ddd0d3
		"--color-primary-200": "215 200 209", // #d7c8d1
		"--color-primary-300": "208 189 205", // #d0bdcd
		"--color-primary-400": "194 172 197", // #c2acc5
		"--color-primary-500": "172 150 183", // #ac96b7
		"--color-primary-600": "143 122 164", // #8f7aa4
		"--color-primary-700": "110 92 141", // #6e5c8d
		"--color-primary-800": "78 63 115", // #4e3f73
		"--color-primary-900": "49 37 88", // #312558
		// secondary | #d1abb9 
		"--color-secondary-50": "227 220 215", // #e3dcd7
		"--color-secondary-100": "2228 220 215", // #e4dcd7
		"--color-secondary-200": "230 217 214", // #e6d9d6
		"--color-secondary-300": "228 207 207", // #e4cfcf
		"--color-secondary-400": "222 193 199", // #dec1c7
		"--color-secondary-500": "209 171 185", // #d1abb9
		"--color-secondary-600": "189 140 167", // #bd8ca7
		"--color-secondary-700": "162 105 148", // #a26994
		"--color-secondary-800": "130 71 127", // #82477f
		"--color-secondary-900": "87 41 95", // #57295f
		// tertiary | #3b7e86 
		"--color-tertiary-50": "216 192 215", // #d8c0d7
		"--color-tertiary-100": "197 171 206", // #c5abce
		"--color-tertiary-200": "144 134 187", // #9086bb
		"--color-tertiary-300": "103 121 169", // #6779a9
		"--color-tertiary-400": "78 125 151", // #4e7d97
		"--color-tertiary-500": "59 126 134", // #3b7e86
		"--color-tertiary-600": "46 118 116", // #2e7674
		"--color-tertiary-700": "36 102 100", // #246664
		"--color-tertiary-800": "29 85 88", // #1d5558
		"--color-tertiary-900": "23 63 73", // #173f49
		// success | #b2c479 
		"--color-success-50": "218 225 206", // #dae1ce
		"--color-success-100": "213 224 198", // #d5e0c6
		"--color-success-200": "203 222 181", // #cbdeb5
		"--color-success-300": "193 218 163", // #c1daa3
		"--color-success-400": "193 218 163", // #b8d28f
		"--color-success-500": "178 196 121", // #b2c479
		"--color-success-600": "176 176 98", // #b0b062
		"--color-success-700": "152 128 74", // #98804a
		"--color-success-800": "123 75 53", // #7b4b35
		"--color-success-900": "92 34 40", // #5c2228
		// warning | #c5b421 
		"--color-warning-50": "246 244 222", // #f6f4de
		"--color-warning-100": "243 240 211", // #f3f0d3
		"--color-warning-200": "241 236 200", // #f1ecc8
		"--color-warning-300": "232 225 166", // #e8e1a6
		"--color-warning-400": "214 203 100", // #d6cb64
		"--color-warning-500": "197 180 33", // #c5b421
		"--color-warning-600": "177 162 30", // #b1a21e
		"--color-warning-700": "148 135 25", // #948719
		"--color-warning-800": "118 108 20", // #766c14
		"--color-warning-900": "97 88 16", // #615810
		// error | #ea0b86 
		"--color-error-50": "252 218 237", // #fcdaed
		"--color-error-100": "251 206 231", // #fbcee7
		"--color-error-200": "250 194 225", // #fac2e1
		"--color-error-300": "247 157 207", // #f79dcf
		"--color-error-400": "240 84 170", // #f054aa
		"--color-error-500": "234 11 134", // #ea0b86
		"--color-error-600": "211 10 121", // #d30a79
		"--color-error-700": "176 8 101", // #b00865
		"--color-error-800": "140 7 80", // #8c0750
		"--color-error-900": "115 5 66", // #730542
		// surface | #345279 
		"--color-surface-50": "225 225 214", // #e1e1d6
		"--color-surface-100": "214 220 228", // #d6dce4
		"--color-surface-200": "204 212 222", // #ccd4de
		"--color-surface-300": "174 186 201", // #aebac9
		"--color-surface-400": "113 134 161", // #7186a1
		"--color-surface-500": "52 82 121", // #345279
		"--color-surface-600": "47 74 109", // #2f4a6d
		"--color-surface-700": "39 62 91", // #273e5b
		"--color-surface-800": "31 49 73", // #1f3149
		"--color-surface-900": "25 40 59", // #19283b
	}
}