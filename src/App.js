import "./styles.css";
import web3 from "./web3";
import lottery from "./lottery";
import { useEffect, useState } from "react";

export default function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");
  const [userEnterValue, setuserEnterValue] = useState("");
  const [message, setMessage] = useState("");
  // web3.eth.getAccounts().then(console.log);
  useEffect(() => {
    const callManager = async () => {
      const manager = await lottery.methods.manager().call();
      const players = await lottery.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(lottery.options.address);
      setManager(manager);
      setPlayers(players);
      setBalance(balance);
    };
    callManager();
  }, [userEnterValue]);

  async function onSubmit(e) {
    e.preventDefault();

    setMessage("You have submit the transaction, please wait.....");
    const accounts = await web3.eth.getAccounts();
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(userEnterValue, "ether")
    });

    setMessage("Transaction success!");
  }

  async function onPick() {
    const accounts = await web3.eth.getAccounts();
    setMessage("waiting on the final transaction");
    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });
    setMessage("transaction success");
  }
  return (
    <div className="App">
      {manager && (
        <div>
          <h1>Lottery Contract :</h1>
          <h2>{manager}</h2>
        </div>
      )}
      {players && <h2>Numbers of players: {players.length}</h2>}
      {balance && (
        <h2>Current balance: {web3.utils.fromWei(balance, "ether")}</h2>
      )}
      <hr />
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <h4>Enter the ether you want to try : </h4>
          <input
            value={userEnterValue}
            onChange={(e) => setuserEnterValue(e.target.value)}
          />
          <button>Enter</button>
        </div>
      </form>
      <h2>{message}</h2>
      <h2>Time to pick a winner </h2>
      <button onClick={() => onPick()}>Pick a winner</button>
    </div>
  );
}
