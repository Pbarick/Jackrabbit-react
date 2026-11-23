import { Component } from 'react'
import Button from './atoms/Button.jsx'

// Catches render errors below it, so one broken card does not blank the whole app.
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
    this.reset = this.reset.bind(this)
  }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error, info) {
    console.error('Render error caught by ErrorBoundary:', error, info.componentStack)
  }

  reset() {
    this.setState({ error: null })
  }

  render() {
    if (this.state.error) {
      return (
        <div className="error-panel" role="alert">
          <h2>Something went wrong on this page.</h2>
          <p className="muted">{this.state.error.message}</p>
          <Button variant="outline" onClick={this.reset}>Try again</Button>
        </div>
      )
    }
    return this.props.children
  }
}
