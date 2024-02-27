const { Router } = require("express");
const router = Router();
const User = require("../database/schemas/User");
const Waitlist = require("../database/schemas/Waitlist");


router.get("/", (req, res) => {
  Waitlist.find({}).then((waitlist) => {
    res.status(200).json(waitlist);
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const waitlist = Waitlist.findOne({ email });
  if (waitlist) {
    return res.status(400).json({ error: "Email already exists" });
  }
  const newWaitlist = new Waitlist({ name, email });
  newWaitlist.save().then((waitlist) => {
    res.status(201).send("Added to waitlist");
  });
});

module.exports = router;
