import { useWriteContract, useAccount } from 'wagmi';
import { contractTemplate } from '../contracts-data/template';
import { type Address } from 'viem';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WriteContractTemplateScreen: React.FC = () => {
  const {
    writeContract,
    isPending,
    isSuccess,
    data: txHash,
    isError,
  } = useWriteContract(); // => to interact with contract & states
  const [contractAddress, setContractAddress] = useState<Address | undefined>(); // => the address to use
  const { chainId } = useAccount(); // get current account

  const [mintTo, setMintTo] = useState('');
  const [mintAmount, setMintAmount] = useState('');

  useEffect(() => {
    if (!chainId) return; // if no chainId stop
    const addressOfChainId = contractTemplate.address[chainId]; // find the address with current chainId
    setContractAddress(addressOfChainId); // set it
  }, [chainId]);

  useEffect(() => {
    // check states
    console.log({
      isPending,
      isSuccess, // means if tx is sent, can also use useTransactionConfirmation or receipt
      txHash,
      isError,
    });
  }, [txHash, isPending, isSuccess, isError]);

  const mint = () => {
    if (!contractAddress) return; // if no address stop
    if (!mintTo || !mintAmount) return; // check params
    writeContract({
      abi: contractTemplate.abi,
      address: contractAddress,
      functionName: 'mint',
      args: [mintTo, ethers.parseEther(mintAmount.toString())],
    });
  };

  return (
    <div className="w-full">
      <h1>Template : Write contract</h1>
      <div className="flex flex-col text-black w-fit">
        <input
          className="my-2 "
          type="text"
          placeholder="Address"
          value={mintTo}
          onChange={e => {
            setMintTo(e.target.value);
          }}
        />
        <input
          className="my-2 "
          type="number"
          placeholder="amount"
          value={mintAmount}
          onChange={e => {
            setMintAmount(e.target.value);
          }}
        />
        {isError && <p className="text-red-500">Error</p>}
        <button
          className={`
          text-white p-2 rounded-md my-2 w-20 ${isSuccess ? 'bg-green-500' : 'bg-blue-500'}
        `}
          onClick={mint}
        >
          {/*Interract with the states as you want */}
          {isPending && 'Pending'}
          {isSuccess && 'Success'}
          {!isPending && !isSuccess && 'Mint'}
        </button>
      </div>
    </div>
  );
};

export default WriteContractTemplateScreen;
