const prompt = require('prompt-sync')();
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const Customer = require("./models/customer");

let loopCon = true;
async function init() {
  console.log(mongoose.connection.readyState);

  await toggleConnection();
  console.log(mongoose.connection.readyState);
  while (loopCon) {
    console.log("How would you like to interact with the database");
    console.log("1 - Add a customer\n2 - Update a customer\n3 - Delete a customer\n4 - View all customers\n 5 - Quit")
    switch (Number(prompt("So what'll it be? "))) {
      case (1):
        await createCustomer();
        break;
      case (2):
        updateCustomer();
        break;
      case (3):
        deleteCustomer();
        break;
      case (4):
        displayCustomer();
        break;
      case (5):
        loopCon = false;
        mongoose.disconnect();
        process.exit();
        // toggleConnection();
        break;
      default:
        console.log("That ain't an option");
        break;
    }
  }
}
async function createCustomer() {
  console.log("To create a user please input the relevant data:")
  try {
    await Customer.create({
      name: prompt("NAME: "),
      age: Number(prompt("AGE: "))
    });
  } catch (err) { console.log(err) }
}
async function updateCustomer() { }
async function deleteCustomer() { }
async function displayCustomer() { }

async function toggleConnection() {
  console.log("test");
  await mongoose.connect(process.env.MONGODB_URI);
}
init()