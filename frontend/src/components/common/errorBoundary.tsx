"use client";

import React from "react";

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };
  constructor(props: { hasError: boolean }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("Error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
