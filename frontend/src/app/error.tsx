"use client"; // Error boundaries must be Client Components

import { FC, useEffect } from "react";

type ErrorProps = {
  error: Error & { digest?: string };
  unstable_retry: () => void;
};

const Error: FC<ErrorProps> = ({ error, unstable_retry }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
      >
        Try again
      </button>
    </div>
  );
};
Error.displayName = "SidebarError";

export default Error;
