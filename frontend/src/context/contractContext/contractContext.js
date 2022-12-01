import { useEffect, useState, createContext ,useContext} from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import { truElectContractABI, truElectContractAddress } from "../../utils/constants";
import { truElectTokenABI, truElectTokenAddress } from "../../utils/tokenConstants";

export const ConnectContext = createContext();

const { ethereum } = window;

const truElectContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const truElectContract = new ethers.Contract(truElectContractAddress, truElectContractABI, signer);
 
  return truElectContract;
};
const truElectContractToken = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const truElectToken = new ethers.Contract(truElectTokenAddress, truElectTokenABI, signer);
 
  return truElectToken;
};

 
const notify = (str) => toast(str);

const register = async(cid) =>{
  const contract = truElectContract();
  notify("Registering....");

  try {
    const result =await contract.registerUserProfile(cid, {gasLimit:300000});
    notify("Registered successfully");
   return result
   }
  catch(error){
   notify("error, check console");
    console.log(error)
  
  }

}

const getUserProfile = async() =>{
  const contract = truElectContract();
  notify("Fetching User....");

  try {
    const result =await contract.getUserProfile(cid, {gasLimit:300000});
    notify("User Fetched successfully");
   return result
   }
  catch(error){
    notify("error, check console");
    console.log(error)
  
  }
} 

const uploadVoter = async(_role,votingWeight,Arr) => {
  const contract = truElectContract();
  notify("uploading Voter");
 try {
   const result =await contract.uploadListOfVoters(_role, votingWeight, Arr, {gasLimit:600000});
   notify("Voters, uploaded");
  return result
  }
 catch(error){
  notify("error, check console");
   console.log(error)
 
 }
}
const setupElection = async(_category, idArr, allowanceArr) => {
  const contract = truElectContract();
  notify("setting up election");
 try {
   const result =await contract.setUpAnElection(_category, idArr, allowanceArr, {gasLimit:300000});
   notify("election is ready for approval");
  return result
  }
 catch(error){
   console.log(error)
   notify("error, check console");
 
 }
}
const mint = async(role, amount, Arr) => {
  const contract = truElectContractToken();
  notify("minting...");
 try {
   const result =await contract.mintToVoter(Arr, {gasLimit:300000});
   notify("minting, successful");
  return result
  }
 catch(error){
  notify("error, check console");
   console.log(error)
 
 }
}

const clear = async() => {
  const contract = truElectContract();
  
 try {
  await contract.resetCurrentElectionQueue();

 
  }
 catch(error){
   console.log(error)
 
 }
}


const startVoting = async(_category) => {
  const contract = truElectContract();

 try {
   const result =await contract.commenceVoting(_category, {gasLimit:600000});
  
  return result
  }
 catch(error){
  notify(error);
   console.log(error)
 
 }
}
const endVoting = async(_category) => {
  const contract = truElectContract();
  
 try {
  await contract.concludeVoting(_category, {gasLimit:600000});
 
  }
 catch(error){
   console.log(error)
 
 }
}
const publish = async(_category) => {
  const contract = truElectContract();
  notify("publishing, result");
 try {
   const result =await contract.broadcastResult(_category, {gasLimit:600000});
   notify("result, published");
  return result
  }
 catch(error){
  notify("error, check console");
   console.log(error)
 
 }
}

const RegisterCandidate = async(name, _category) => {
  const contract = truElectContract();
  notify("registering candidate");
 try {
   const result =await contract.registerNewCandidate(name, _category, {gasLimit:300000});
   notify("candidate added");
  return result
  }
 catch(error){
  notify("error, check console");
   console.log(error)
 
 }
}
const candidateName = async(id) => {
  const contract = truElectContract();
  
 try {
   const result =await contract.getCandidateName(id, {gasLimit:300000});
  //  console.log(result)
  return result
  }
 catch(error){
   console.log(error)
 
 }
}
const AddCategory = async(_category) => {
  const contract = truElectContract();
  notify("adding category");
 try {
   const result =await contract.addElectionCategory(_category);
   
   notify("category added");

  return result
  }
 catch(error){
  notify("error check console");
   console.log(error)
 
 }
}

const changeTokenChairman = async(addr) => {
  const contract = truElectContractToken();
  notify("changing chairman in token...");
 try {
   const result =await contract.changeElectionCommHead(addr);
   notify("changed token chairman");
  return result
  }
 catch(error){
  notify("error, check console");
   console.log(error)
 
 }
}

const updateChairman = async(addr) => {
  const contract = truElectContract();
  notify("changing Electorial body Chairman...");
 try {
   const result =await contract.changeElectionCommHead(addr);
   if(result){
    await changeTokenChairman(addr)
  }
   notify("changing Electorial body Chairman..");

  return result
  }
 catch(error){
   notify("error, check console")
   console.log(error)
 
 }
}
const voteConsensus = async() => {
  const contract = truElectContract();
  notify("voting for changing chairman")
 try {
   const result =await contract.votesToRemoveCH();
   
   notify("You have consented")

  return result
  }
 catch(error){
  notify("error, check console")
   console.log(error)
 
 }
}

const electionList = async() => {
  const contract = truElectContract();
  
 try {
   const result =await contract.fetchAnElection();
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}
const candidateList = async() => {
  const contract = truElectContract();
  
 try {
   const result =await contract.getListOfCandidates();
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const Compile = async(_category) => {
  const contract = truElectContract();
  notify("collating Votes result for " + _category);
 try {
   const result =await contract.collateVotes(_category, {gasLimit:300000} );
   notify( _category + " election has been added");
  return result
  }
 catch(error){
  notify("error, check console");
   console.log(error)
  
 }
}
const Voting = async(_category, id) => {
  const contract = truElectContract();
  notify("Voting...");
 try {
   const result =await contract.vote(_category, id, {gasLimit:300000});
   notify("Voting is successful for " + _category );
  return result
  }
 catch(error){
  notify("error, check console");
   console.log(error)
  
 }
}
const getResult = async(_category) => {
  const contract = truElectContract();
  
 try {
   const result =await contract.getWinningCandidate(_category);
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}
const check = async(role, addr) => {
  const contract = truElectContract();
  
 try {
   const result =await contract.checkVoterRole(role, addr);
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}

const pauseContract = async(value) => {
  const contract = truElectContract();
  
 try {
   const result =await contract.setPaused(value);
  
  return result
  }
 catch(error){
   console.log(error)
  
 }
}


export const ConnectProvider = ({ children }) =>{
    const [currentAccount, setCurrentAccount] = useState("");
    const [networkConnected, setnetworkConnected] = useState("");
    const checkIfWalletIsConnect = async () => {
      
      try {
        if (!ethereum) return alert("Please install MetaMask.");
       // const provider = new ethers.providers.Web3Provider(ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });
  
        if (accounts.length) {
        //  setCurrentAccount(await provider.lookupAddress(accounts[0]));
        setCurrentAccount(accounts[0]);
      
        } else {
          console.log("No accounts found");
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    const findNetwork = async() => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const network = await provider.getNetwork();
       const chainId = network.chainId;

       if (chainId ==1) {setnetworkConnected("Mainnet")}
       if (chainId ==3) {setnetworkConnected("Ropsten")}
       if (chainId ==4) {setnetworkConnected("Rinkeby")}
       if (chainId ==5) {setnetworkConnected("Goerli")}
       if (chainId ==137) {setnetworkConnected("Polygon")}
       if (chainId ==80001) {setnetworkConnected("Mumbai")}
      
      
      
   
      };
    
    
  
    const connectWallet = async () => {
     
      try {
       
        if (!ethereum) return alert("Please install MetaMask.");
  
        const accounts = await ethereum.request({ method: "eth_requestAccounts", });
        
  
        setCurrentAccount(accounts[0]);
        
        
        window.location.reload();
      } catch (error) {
        console.log(error);
  
        throw new Error("No ethereum object");
      }
    };

    useEffect(() => {
      checkIfWalletIsConnect();
    findNetwork()
     
    }, []);

   
 
    return (
      <ConnectContext.Provider
        value={{
          
          connectWallet,
          currentAccount,
          networkConnected,
          setupElection,
          RegisterCandidate,
          AddCategory,
          startVoting,
          endVoting,
          Compile,
          publish,
          uploadVoter,
          clear,
          Voting,
          getResult,
          electionList,
          check,
          candidateName,
          pauseContract,
          candidateList,
          mint,
          updateChairman,
          voteConsensus
        }}
      >
        {children}
      </ConnectContext.Provider>
    );
  };

  //custom hook for contract
  export const useContractContext =()=> useContext(ConnectContext);