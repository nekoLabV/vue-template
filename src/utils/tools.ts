import * as Clipboard from 'clipboard-polyfill'

export const isEmptyObject = (data: any): boolean => {
	if (typeof data !== 'object') return false
	for (const _key in data)
		return false
	return true
}

export const isEmptyArray = (data: any): boolean => {
	if (Array.isArray(data) && data.length === 0)
		return true
	return false
}

export const throttle = (callback: Function, delay = 300) => {
	let timer: number

	return (...args: any[]) => {
		if (timer) {
			clearTimeout(timer)
			timer = 0
		}
		timer = setTimeout(() => {
			callback.apply(this, args)
		}, delay)
	}
}

export const debounce = (fn: Function, delay = 200) => {
	let timeout: number
	return (...args: any[]) => {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}


// 检测设备
export const checkDevice = () => {
	const ua = navigator.userAgent.toLowerCase()
	return {
		isMobile: /iphone|ipod|android|ios|ipad|blackberry|webos|symbian|windows phone|phone/i.test(
			ua
		),
		isAndroid: ua.indexOf('android') > -1 || ua.indexOf('adr') > -1,
		isIOS: /iphone|ipad|ipod/.test(ua),
		isWindows: ua.indexOf('windows') !== -1,
		hasTouch:
			'ontouchstart' in window || ua.indexOf('touch') !== -1 || ua.indexOf('mobile') !== -1
	}
}

export const getComputedFill = (element: Element) => {
	if (!element) {
		console.error('Element is null or undefined.')
		return null
	}

	const computedStyle = window.getComputedStyle(element)

	return computedStyle.fill
}

export const darkenRGBColor = (rgb: string, factor: number) => {
	const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
	if (!match) {
		throw new Error("Invalid RGB format. Use 'rgb(r, g, b)'.")
	}

	const [_, r, g, b] = match.map(Number)
	const darkened = {
		r: Math.max(0, Math.floor(r * factor)),
		g: Math.max(0, Math.floor(g * factor)),
		b: Math.max(0, Math.floor(b * factor))
	}

	return `rgb(${darkened.r}, ${darkened.g}, ${darkened.b})`
}

export const copy = async (node: HTMLElement) => {
	const copyText = node.innerText
	const copyHtml = node.innerHTML
	try {
		await Clipboard.write([
			new Clipboard.ClipboardItem({
				'text/plain': new Blob([copyText], { type: 'text/plain' }),
				'text/html': new Blob([copyHtml], { type: 'text/html' })
			})
		])
	} catch (err) {
		console.error('复制失败', err)
	}
}

export function safeGet<T, K extends keyof T>(obj: T | undefined, key: K): T[K] | undefined {
	return obj?.[key]
}

export function checkScrollbarWidth() {
	const outer = document.createElement('div')
	outer.style.visibility = 'hidden'
	outer.style.width = '100px'
	document.body.appendChild(outer)
	const widthNoScroll = outer.offsetWidth
	outer.style.overflow = 'scroll'
	const inner = document.createElement('div')
	inner.style.width = '100%'
	outer.appendChild(inner)
	const widthWithScroll = inner.offsetWidth
	outer.parentNode?.removeChild(outer)
	return widthNoScroll - widthWithScroll
}

export function createDynamicStylesheet(className: string, styles: Record<string, string | number>) {
	const cssRules = `
			.${className} {
					${Object.keys(styles).map(property => {
		return `${property}: ${styles[property]};`
	}).join('')}
			}
	`

	const styleElement = document.createElement('style')

	if ('CSSStyleSheet' in window && 'adoptedStyleSheets' in document) {
		const sheet = new CSSStyleSheet()
		sheet.replaceSync(cssRules)
		document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
	} else {
		styleElement.innerHTML = cssRules
		document.head.appendChild(styleElement)
	}
}