import { Component } from "react";

class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("An unexpected application error occurred.", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="error-page" role="alert">
          <h1>Something went wrong</h1>
          <p>Please refresh the page and try again.</p>
          <button type="button" onClick={() => window.location.reload()}>
            Refresh page
          </button>
        </main>
      );
    }

    // eslint-disable-next-line react/prop-types
    return this.props.children;
  }
}

export default AppErrorBoundary;
