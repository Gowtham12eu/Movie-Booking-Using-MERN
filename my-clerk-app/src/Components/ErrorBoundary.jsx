import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Called when a child throws during rendering
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Optional: log error details
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    // You can also send this to an analytics service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px', color: 'red', textAlign: 'center' }}>
          <h2>Something went wrong.</h2>
          <p>Please try refreshing the page or contact support.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
