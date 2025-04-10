import type { ObjectDirective } from 'vue'

const modules: Record<string, ObjectDirective> = import.meta.glob('./*.ts', { eager: true, import: 'default' })
const directives: Array<{ name: string; path: ObjectDirective }> = []

Object.entries(modules).map(([path, data]) => {
	directives.push({
		name: path.replace('./', '').replace('.ts', ''),
		path: data
	})
})

export default directives