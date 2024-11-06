import React from 'react';

export default function Footer() {
  return (
    <footer className="mt-auto text-primary-foreground">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <p>&copy; 2024 Web3 Lottery. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
