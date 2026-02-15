import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: 24, fontFamily: 'monospace', fontSize: 14,
          maxWidth: 500, margin: '40px auto', color: '#333',
          background: '#fff3cd', border: '2px solid #856404', borderRadius: 8
        }}>
          <strong>Something went wrong</strong>
          <pre style={{ marginTop: 12, overflow: 'auto', fontSize: 12 }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
