import mongoose from "mongoose";
import { ProblemModel } from "./models/Problem";

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/lld-practice";

const problems = [
  {
    title: "Parking Lot System",
    statement: "Design a parking lot that supports multiple vehicle types and multiple floors.",
    requirements: [
      "Support at least 2 vehicle types (car, bike)",
      "Track available spots per floor",
      "Assign a spot on entry, free it on exit",
      "Calculate parking fee based on duration",
    ],
    constraints: ["Single entry/exit gate is acceptable for this exercise"],
  },
  {
    title: "Elevator System",
    statement: "Design the control logic for a single elevator serving multiple floors.",
    requirements: [
      "Handle up/down requests from any floor",
      "Move to the nearest requested floor efficiently",
      "Open/close doors at each stop",
      "Handle simultaneous requests from multiple floors",
    ],
    constraints: ["Single elevator car is fine — no need to design a multi-elevator dispatcher"],
  },
  {
    title: "Vending Machine",
    statement: "Design a vending machine that accepts coins, dispenses items, and gives change.",
    requirements: [
      "Support multiple item types with different prices",
      "Accept coins/notes and track inserted amount",
      "Dispense item only if enough money is inserted",
      "Return change, and handle out-of-stock items",
    ],
    constraints: [],
  },
];

async function seed() {
  await mongoose.connect(MONGO_URI);
  await ProblemModel.deleteMany({});
  await ProblemModel.insertMany(problems);
  console.log("Seeded 3 problems.");
  await mongoose.disconnect();
}

seed();