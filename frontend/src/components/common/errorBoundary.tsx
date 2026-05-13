"use client";

import React, { PropsWithChildren, ReactNode } from "react";

type ErrorBoundaryProps = PropsWithChildren & {
  fallback?: ReactNode;
};

class ErrorBoundary extends React.Component {
  props: ErrorBoundaryProps = {};
  state = {
    hasError: false,
  };
  constructor(props: { hasError: boolean; fallback?: ReactNode }) {
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
    if (this.state.hasError && this.props.fallback) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
