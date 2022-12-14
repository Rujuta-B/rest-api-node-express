// const express = require("express");
const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-errors");
// const { validationResult } = require("express-validator");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Jodie Comer",
    email: "jodie@comer.com",
    password: "tester123",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  // const errors = validationResult(req);
  // console.log(errors);
  // if (!errors.isEmpty()) {
  //   next(new HttpError("Invalid input passed, please check your data", 422));
  // }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Email already exists", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("Check your credentials.", 401);
  }
  res.json({ message: "Logged in" });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
