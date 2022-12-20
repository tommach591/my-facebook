const express = require("express");
const router = express.Router();

const Profile = require("../../schemas/Profile");

router.get("/allProfiles", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/allProfiles");
  Profile.find()
    .then((acc) => res.json(acc))
    .catch((err) => res.status(404).json({ profile_not_found: "No profiles" }));
});

router.get("/get/:user_id", (req, res) => {
  let user_id = req.params.user_id;
  console.log(`Hit at http://localhost:3001/api/profile/get/${user_id}`);
  Profile.findOne({ user_id: user_id })
    .then((acc) => {
      return res.json(acc);
    })
    .catch((err) => {
      return res.status(404).json({ profile_not_found: "No profiles" });
    });
});

router.post("/signup", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/signup");

  const newProfile = new Profile({
    user_id: req.body.user_id,
    email: req.body.email,
    first: req.body.first,
    last: req.body.last,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
  });

  newProfile.save().then((newProf) => {
    return res.json(newProf);
  });
});

router.delete("/delete", (req, res) => {
  console.log("Hit at http://localhost:3001/api/profile/delete");
  let email = req.body.email;

  Profile.findOneAndRemove({ email: email }).exec();
  return res.json({ success: true });
});

module.exports = router;
