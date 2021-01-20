const express = require("express");
const router = express.Router();
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const User = require("../../models/User");
const Token = require("../../models/token");
const crypto = require("crypto");
const { sendEmail } = require("../../email/index");
const Fresher = require("../../models/fresher");
const Company = require("../../models/company");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model

// @route POST api/users/register
// @desc Register user
// @access Public
router.get("/get", async (req, res) => {
  User.find()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error" + err));
});

router.post("/register", async (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const { email } = req.body;
    // Make sure this account doesn't already exist
    const user = await User.findOne({ email });
    if (user) return res.status(401).json({ email: "Email already exists" });
    const newUser = new User({ ...req.body });
    const user_ = await newUser.save();
    
    await new Company({
      user: user_._id,
      // fullname:user_.name
    }).save();

    await new Fresher({
      user: user_._id,
      // fullname:user_.name
    }).save();
    await sendVerificationEmail(user_, req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", async (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        msg:
          "The email address " +
          email +
          " is not associated with any account. Double-check your email address and try again.",
      });
    const payload = {
      id: user.id,
      name: user.name,
      type: user.type,
    };
    //validate password
    if (!user.comparePassword(password))
      return res.status(400).json({ message: "Invalid email or password" });

    // Make sure the user has been verified
    if (!user.isVerified)
      return res.status(400).json({
        type: "not-verified",
        message: "Your account has not been verified.",
      });

    // Login successful, write token, and send back user
    res.status(200).json({ token: user.generateJWT(), user: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }  

  // Find user by email
  // User.findOne({ email }).then(user => {
  //   // Check if user exists
  //   if (!user) {
  //     return res.status(404).json({ emailnotfound: "Email not found" });
  //   }

  // Check password
  // bcrypt.compare(password, user.password).then(isMatch => {
  //   if (isMatch) {
  //     // User matched
  //     // Create JWT Payload
  //     const payload = {
  //       id: user.id,
  //       name: user.name,

  //     };

  //     // Sign token
  //     jwt.sign(
  //       payload,
  //       keys.secretOrKey,
  //       {
  //         expiresIn: 31556926 // 1 year in seconds
  //       },
  //       (err, token) => {
  //         res.json({
  //           success: true,
  //           token: "Bearer " + token
  //         });
  //       }
  //     );
  //   } else {
  //     return res
  //       .status(400)
  //       .json({ passwordincorrect: "Password incorrect" });
  //   }
  //});
  //});
});
router.post("/verification", async (req, res) => {
  if (!req.body.token)
    return res
      .status(400)
      .json({ message: "We were unable to find a user for this token." });

  try {
    // Find a matching token
    const token = await Token.findOne({ token: req.body.token });

    if (!token)
      return res.status(400).json({
        message:
          "We were unable to find a valid token. Your token my have expired.",
      });

    // If we found a token, find a matching user
    User.findOne({ _id: token.userId }, (err, user) => {
      if (!user)
        return res
          .status(400)
          .json({ message: "We were unable to find a user for this token." });

      if (user.isVerified)
        return res
          .status(400)
          .json({ message: "This user has already been verified." });

      // Verify and save the user
      user.isVerified = true;
      user.save(function (err) {
        if (err) return res.status(500).json({ message: err.message });

        res.status(200).send("The account has been verified. Please log in.");
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function sendVerificationEmail(user, req, res) {
  try {
    const token = user.generateVerificationToken();

    // Save the verification token
    await token.save();

    let subject = "Account Verification Token";
    let to = user.email;
    let from = "aamar.opseazy@gmail.com";
    let link = "https://brillianzy.feedinks.com/verification/" + token.token;
    let html = `<p>Hi ${user.name}<p><br><p>Please click on the following <a href="${link}">link</a> to verify your account.</p> 
                <br><p>If you did not request this, please ignore this email.</p>`;

    await sendEmail({ to, from, subject, html });

    res.status(200).json({
      message: "A verification email has been sent to " + user.email + ".",
    });
  } catch (error) {
    res.status(500).json({ message: "failed" });
  }
}
// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
router.post("/forgot", async (req, res) => {
  try {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

      //Generate and set password reset token
      // user.generatePasswordReset();
      var token = new Token({
        userId: user._id,
        token: crypto.randomBytes(16).toString("hex")
      });
  
      user.resetPasswordToken = token.token;
      // user.resetPasswordExpires = moment().add(12, "hours");
      

      // Save the updated user object
      await user.save();
      
      await token.save() 
      
   

      // send email  
      let subject = "Password change request";
      let to = user.email;
      let from = process.env.FROM_EMAIL;
      let link = "http://brillianzy.feedinks.com/reset/" +token.token;
      let html = `<p>Hi ${user.name}</p>
                  <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

      await sendEmail({to, from, subject, html});

      res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'});
  } catch (error) {
      res.status(500).json({message: error.message})
  }
}); 

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
router.post("/reset", async (req, res) => {
  try {
      const { token } = req.body;

      const user = await User.findOne({resetPasswordToken: token});

      if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

      //Redirect user to form with the email address
      // res.render('resetpassword', {user});
  } catch (error) {
      res.status(500).json({message: error.message})
  }
});





// @route POST api/auth/reset
// @desc Reset Password
// @access Public
router.post("/resetpassword/:token", async (req, res) => {
  try {
      const { token } = req.body;
      

      const user = await User.findOne({resetPasswordToken:token});

      if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});
      
   
      
      //Set the new password
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      // user.resetPasswordExpires = undefined;
      user.isVerified = true;

      // Save the updated user object
      await user.save();

      let subject = "Your password has been changed";
      let to = user.email;
      let from = process.env.FROM_EMAIL;
      let html = `<p>Hi ${user.name}</p>
                  <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`

      await sendEmail({to, from, subject, html});

      res.status(200).json({message: 'Your password has been updated.'});

  } catch (error) {
      res.status(500).json({message: error.message})
  }
});


module.exports = router;
