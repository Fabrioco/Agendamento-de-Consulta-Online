const express = require("express");
const routerAuth = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();

routerAuth.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Todos os campos devem ser preenchidos" });
    }

    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: "Email já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Usuário cadastrado com sucesso",
      token
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro ao cadastrar usuário", error: error.message });
  }
});

routerAuth.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Preencha todos os campos" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({ message: "Email não encontrado" });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
      return res.status(400).send({ message: "Senha Incorreta" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).send({
      message: "Bem vindo de volta!",
      token,
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = routerAuth;
