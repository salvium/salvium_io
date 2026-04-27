import React from 'react'

/**
 * Catches unhandled errors anywhere in the React tree and renders a recovery
 * page instead of letting the whole app blank out. Errors are logged to the
 * console so they're visible in DevTools and any monitoring that captures
 * console output.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('[ErrorBoundary] Unhandled error:', error, info)
  }

  handleReload = () => {
    // Clear potentially poisoned client-side caches before reloading.
    try { sessionStorage.clear() } catch {}
    window.location.reload()
  }

  render() {
    if (!this.state.error) return this.props.children

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0e0f] text-white p-6">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-semibold mb-3 text-teal-300">Something went wrong</h1>
          <p className="text-gray-300 mb-6">
            The page hit an unexpected error. Try reloading — if the problem persists, please report it
            on <a href="https://github.com/salvium/salvium_io/issues" className="underline text-teal-300">GitHub</a>.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="px-5 py-2 rounded-lg bg-teal-500 text-black font-medium hover:bg-teal-400 transition"
          >
            Reload
          </button>
          {import.meta.env.DEV && (
            <pre className="mt-6 text-left text-xs text-red-300 bg-black/40 rounded p-3 overflow-auto max-h-64">
              {String(this.state.error?.stack || this.state.error)}
            </pre>
          )}
        </div>
      </div>
    )
  }
}
