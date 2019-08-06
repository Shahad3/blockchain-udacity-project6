import Web3 from "../web3";
import SupplyChainArtifact from "../../build/contracts/medBase/SupplyChain.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SupplyChainArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        SupplyChainArtifact.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }

    //readData

      App.sku = $("#sku").val();
      App.upc = $("#upc").val();
      App.ownerID = $("#ownerID").val();
      App.originManufactoryID = $("#originManufactoryID").val();
      App.originManufactoryName = $("#originManufactoryName").val();
      App.originFarmInformation = $("#originManufactoryInformation").val();
      App.productNotes = $("#productNotes").val();
      App.productPrice = $("#productPrice").val();
      App.distributorID = $("#distributorID").val();
      App.retailerID = $("#retailerID").val();
      App.consumerID = $("#consumerID").val();



  },


  createItem: async function() {
    const { createItem } = this.meta.methods;
    await createItem(
      App.upc, 
      App.metamaskAccountID, 
      App.originManufactoryName, 
      App.originManufactoryInformation,
      App.productNotes,
      App.productPrice
  ).send({from: this.account});
    console.log("I am here ..")
  },

  // Implement Task 4 Modify the front end of the DAPP
  lookUp: async function (){
    const { lookUptokenIdToStarInfo } = this.meta.methods;
    const id = document.getElementById("lookid").value;
    const value = await lookUptokenIdToStarInfo(id).send();
    App.setStatus("Star name is " + value[0] + " and its symbol is " + value[1]);
  }

};

window.App = App;

window.addEventListener("load", async function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"),);
  }

  App.start();
});