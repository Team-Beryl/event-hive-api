import { UserModel } from "../models/user_model.js";
import { userSchema } from "../validators/user_schema.js";
import * as bcrypt from "bcrypt";

export const signup = async (req, res, next) => {
  try {
    // Error handling
    const { error, value } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    //   Check if user exists in the database
    const email = value.email;

    const findUserInDb = await UserModel.findOne({ email });
    if (findUserInDb) {
      return res.status(401).send("User is registered");
    } else {
      // Add user by first hashing password
      const hashedPassword = bcrypt.hashSync(value.password, 10);

      // Add user to database

      await UserModel.create({
        ...value,
        password: hashedPassword,
      });

      // return response
      res.status(201).send("User registered");
    }
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    // Find a user using their unique identifier
    const user = await UserModel.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (!user) {
      res.status(401).json("No user found");
    } else {
      // Verify their password
      const correctPassword = bcrypt.compareSync(password, user.password);
      if (!correctPassword) {
        res.status(401).json("Invalid credentials");
      } else {
        // Generate a session
        req.session.user = { id: user.id };
        console.log("user", req.session.user);
        // Return response
        res.status(200).json("Login successful");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("An error occurred");
  }
};

export const getUser = async (req, res, next) => {
  try {
    const email = req.params.email.toLowerCase();

    const userDetails = await UserModel.findOne({ email })
      .select("-password")
      .populate({
        path: "event",
      })
      .populate({
        path: "college",
      });

    return res.status(200).json({ user: userDetails });
  } catch (error) {
    next(error);
  }
};
