import Link from 'next/link';
import Logo from './Logo';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const links = [
  {
    name: 'Home',
    route: '/',
  },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full flex justify-between items-center py-6 px-4 sm:px-12 sticky top-0 backdrop-blur-lg bg-custom-dark-blue/70 mb-12">
      <Link href="/">
        <Logo width={100} height={100} />
      </Link>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 min-h-screen ${isMenuOpen ? 'absolute' : 'hidden'} md:hidden`} // Backdrop
        onClick={() => {
          setIsMenuOpen(false);
        }}
      ></div>

      <div className="flex items-center justify-center font-bold">
        <nav // Mobile menu
          className={`
          absolute top-0 right-0 h-full bg-custom-dark-blue shadow-lg z-40
          transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          transition-transform duration-300 ease-in-out
          flex flex-col items-center justify-start pt-20 space-y-6
          w-3/4 sm:w-1/2 lg:w-1/3 min-h-screen
          sm:hidden`} // Only show and animate on mobile
        >
          {links.map((link, index) => (
            <Link
              key={index}
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="mr-4"
              href={link.route}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <nav // Desktop menu
          className={'hidden sm:flex items-center justify-center'}
        >
          {links.map((link, index) => (
            <Link
              key={index}
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="mr-4"
              href={link.route}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <ConnectButton
          showBalance={false}
          chainStatus="icon"
          accountStatus="address"
        />
        <button
          className="sm:hidden z-50 ml-4" // Button is only visible on mobile
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {/* Here, you can add an icon for the menu button */}
          {isMenuOpen ? (
            <XMarkIcon className="h-6 w-6 text-white" />
          ) : (
            <Bars3Icon className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
