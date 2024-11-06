import { Button } from '@/components/ui/button';
import React from 'react';

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Button className="mt-4" onClick={() => window.history.back()}>
        Go Back
      </Button>
    </div>
  );
}
