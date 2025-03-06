const express = require("express");
const Schedule = require("../models/schedule");
const Professional = require("../models/professional");

const routerSchedule = express.Router();

async function searchProfessional(userId) {
  const professional = await Professional.findOne({
    where: { userid: userId },
  });
  return professional;
}

routerSchedule.get("/", async (req, res) => {
  try {
    const professional = await searchProfessional(req.user.id);
    const schedules = await Schedule.findOne({
      where: { professionalid: professional.id },
    });
    res.status(201).json({
      schedules,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

routerSchedule.post("/", async (req, res) => {
  try {
    const { starttime, endtime } = req.body;
    if (!starttime || !endtime) {
      return res.status(400).json({
        message: "Preencha todos os campos!",
      });
    }
    const professionalData = await searchProfessional(req.user.id);

    await Schedule.create({
      professionalid: professionalData.id,
      starttime: starttime,
      endtime: endtime,
    });
    res.status(201).json({
      message: "Horário criado com sucesso!",
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

routerSchedule.patch("/:id/update", async (req, res) => {
  try {
    const updates = req.body;
    if (!updates) {
      return res.status(401).json({ message: "Preencha todos os campos" });
    }
    const { id } = req.params;

    const schedule = await Schedule.findOne({ id: id });
    if (!schedule) {
      return res.status(404).json({ error: "Horário não encontrado" });
    }

    Object.keys(updates).forEach((key) => {
      if (schedule[key] !== undefined) {
        schedule[key] = updates[key];
      }
    });

    await schedule.save();
    res.status(201).json({
      message: "Horário atualizado",
      schedule,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

routerSchedule.delete("/:id/delete", async (req, res) => {
  try {
    const { id } = req.body;
    const schedule = await Schedule.findOne({ id: id });
    if (!schedule) {
      return res.status(404).json({
        message: "Horário não encontrado!",
      });
    }

    await schedule.destroy();
    res.status(201).json({ message: "Horário deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routerSchedule;
