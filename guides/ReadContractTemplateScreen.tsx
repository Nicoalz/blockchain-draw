import { useReadContract, useChainId } from 'wagmi';
import { contractTemplate } from '../contracts-data/template';
import { type Address } from 'viem';
import { useState, useEffect } from 'react';

const ReadContractTemplateScreen: React.FC = () => {
  const [contractAddress, setContractAddress] = useState<Address | undefined>(); // => the contract address to use
  const [totalSupply, setTotalSupply] = useState<string>('');
  const chainId = useChainId(); // get current chain id

  useEffect(() => {
    const addressOfChainId = contractTemplate.address[chainId]; // find the address with current chainId
    setContractAddress(addressOfChainId); // set it
  }, [chainId]);

  const {
    refetch: getTotalSupply,
    // isSuccess,
    // isFetching, // numerous way to interact
  } = useReadContract({
    abi: contractTemplate.abi,
    address: contractAddress,
    functionName: 'totalSupply',
    //args: [mintTo, ethers.parseEther(mintAmount.toString())] => if needed
    query: {
      enabled: false, // to not trigger the call immediatly
    },
  });

  useEffect(() => {
    console.log('callContract');
    if (!contractAddress) return;
    console.log('callContract2');
    const fetchContract = async () => {
      console.log('fetching contract');
      const { data: supplyBigInt } = await getTotalSupply();
      if (!supplyBigInt) return;
      const supply = (supplyBigInt as bigint).toString();
      setTotalSupply(supply);
    };
    fetchContract();
  }, [contractAddress, getTotalSupply]);

  return (
    <div className="w-full">
      <h1>Template : Call contract</h1>
      <p>Total supply: {totalSupply}</p>
    </div>
  );
};

export default ReadContractTemplateScreen;
