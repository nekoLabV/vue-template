import Loading from '@/components/Loading.vue'
import type { DirectiveBinding } from 'vue'
import { createApp } from 'vue'

let _loadingOverlay: HTMLDivElement | null = null

function createLoadingOverlay(): HTMLDivElement | null {
  const loadingOverlay = document.createElement('div')
  const loadingComp = createApp(Loading)
  loadingComp.mount(loadingOverlay)
  return loadingOverlay.firstChild as HTMLDivElement
}

function removeLoadingOverlay(el: HTMLElement) {
  if (_loadingOverlay) {
    el.style.position = ''
    el.style.zIndex = ''
    el.removeChild(_loadingOverlay)
  }
}

export default {
  beforeMount() {
    _loadingOverlay = createLoadingOverlay()
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (_loadingOverlay) {
      if (binding.value) {
        el.style.position = 'relative'
        el.appendChild(_loadingOverlay)
      } else {
        removeLoadingOverlay(el)
      }
    }
  },
  unmounted(el: HTMLElement) {
    if (_loadingOverlay) {
      el.removeChild(_loadingOverlay)
      _loadingOverlay = null
    }
  }
}
