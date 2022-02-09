import "./styles.css";
import web3 from "./web3";
import lottery from "./lottery";
import { useEffect, useState } from "react";

export default function App() {
  const [manager, setManager] = useState("");
  const [players, setPlayers] = useState([]);
  const [balance, setBalance] = useState("");

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
  }, []);
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
    </div>
  );
}
