import Link from 'next/link';
import Logo from './Logo';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'wagmi';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userAccount = useAccount();
  const { isConnected } = userAccount;

  const linksUserConnected = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'Create Lottery',
      route: '/create-lottery',
    },
    {
      name: 'Make a Draw',
      route: '/make-draw',
    },
    {
      name: 'My Tickets',
      route: '/my-tickets',
    },
  ];

  const linksUserNotConnected = [
    {
      name: 'Home',
      route: '/',
    },
    {
      name: 'My Tickets',
      route: '/my-tickets',
    },
  ];

  const links = isConnected ? linksUserConnected : linksUserNotConnected;

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full px-4 py-6 mb-12 md:px-10 backdrop-blur-lg bg-custom-dark-blue/70">
      <Link href="/" className="text-2xl font-bold gradient-text">
        Web3 Lottery
      </Link>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 min-h-screen ${isMenuOpen ? 'absolute' : 'hidden'} md:hidden`} // Backdrop
        onClick={() => {
          setIsMenuOpen(false);
        }}
      ></div>

      <div className="flex items-center justify-center font-bold ">
        <nav // Mobile menu
          className={`
          absolute top-0 right-0 h-full bg-custom-dark-blue shadow-lg z-40
          transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          transition-transform duration-300 ease-in-out
          flex flex-col items-center justify-start pt-20 space-y-6
          w-3/4 md:w-1/2 lg:w-1/3 min-h-screen
          md:hidden`} // Only show and animate on mobile
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
          className={'hidden md:flex items-center justify-center mr-2'}
        >
          <div className="mr-4 space-x-4">
            {links.map((link, index) => {
              if (index === 0) return;
              return (
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
              );
            })}
          </div>
        </nav>

        <ConnectButton
          showBalance={false}
          chainStatus="icon"
          accountStatus="address"
        />
        <button
          className="z-50 ml-4 md:hidden" // Button is only visible on mobile
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          {/* Here, you can add an icon for the menu button */}
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-white" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-white" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
