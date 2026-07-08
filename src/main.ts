import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'
import { app as store } from '$lib/stores/app.svelte'

// Start with a meaningful selection so the fretboard is populated on first
// load (C Major scale) rather than a blank free-exploration state.
if (store.scaleType === null && store.chordType === null) {
  store.selectScale('C', 'major')
}

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
