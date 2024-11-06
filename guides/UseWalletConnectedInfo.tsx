import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
const useWalletConnectedInfo: React.FC = () => {
  const userAccount = useAccount(); // get current account
  const router = useRouter(); // to redirect

  useEffect(() => {
    // other info available
    const {
      address,
      chainId,
      isConnected,
      isConnecting,
      isDisconnected,
      isReconnecting,
      status,
    } = userAccount;
    console.log({
      address,
      chainId,
      isConnected,
      isConnecting,
      isDisconnected,
      isReconnecting,
      status,
    });
    if (!userAccount.isConnected) {
      //router.push("/"); // WARNING WITH THIS redirect if not connected
      // prefer using it in your component to hide content
    }
  }, [router, userAccount]);

  return (
    <div className="w-full">
      <h1>Title</h1>
      <div>
        {userAccount.isConnected ? ( // Or use it in your component
          <p>You re connected</p>
        ) : (
          <p>You re not connected</p>
        )}
      </div>
    </div>
  );
};

export default useWalletConnectedInfo;
