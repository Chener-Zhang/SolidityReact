import "./styles.css";
import web3 from "./web3";

export default function App() {
  web3.eth.getAccounts().then(console.log);
  return <div className="App"></div>;
}
