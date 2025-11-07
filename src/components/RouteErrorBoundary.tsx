import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useEffect } from 'react';
import { ErrorFallback } from './ErrorFallback';

export function RouteErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    // Report the route error
    if (error) {
      console.error("Route error:", error);
    }
  }, [error]);

  // Render error UI using shared ErrorFallback component
  if (isRouteErrorResponse(error)) {
    return (
      <ErrorFallback
        title={`${error.status} ${error.statusText}`}
        message="Sorry, an error occurred while loading this page."
        error={error.data ? { message: JSON.stringify(error.data, null, 2) } : error}
        statusMessage="Navigation error detected"
      />
    );
  }

  return (
    <ErrorFallback
      title="Unexpected Error"
      message="An unexpected error occurred while loading this page."
      error={error}
      statusMessage="Routing error detected"
    />
  );
}