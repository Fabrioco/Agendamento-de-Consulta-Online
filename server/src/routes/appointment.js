const express = require("express");
const Appointment = require("../models/appointment");
const Schedule = require("../models/schedule");

const routerAppointment = express.Router();

routerAppointment.post("/:professionalId/:scheduleId", async (req, res) => {
  try {
    const { professionalId, scheduleId } = req.params;
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        message: "Preencha todos os campos",
      });
    }

    if (!professionalId | !scheduleId) {
      return res.status(400).json({
        message: "Selecione os campos",
      });
    }

    const schedule = await Schedule.findOne({ where: { id: scheduleId } });
    if (!schedule) {
      return res.status(400).json({
        message: "Horário não encontrado!",
      });
    }

    const time = `${schedule.starttime} - ${schedule.endtime}`;
    const dateTime = `${date} ${time}`;

    const appointmentExists = await Appointment.findOne({
      where: { status: "pendente" },
    });
    if (appointmentExists) {
      return res.status(400).json({
        message: "Horário indisponível",
      });
    }

    const appointment = await Appointment.create({
      professionalid: professionalId,
      clientid: req.user.id,
      date: dateTime,
      status: "pendente",
    });
    res.json({ appointment });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

routerAppointment.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.status(201).json({
      appointments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerAppointment.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOne({ id: id });
    res.status(201).json({ appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerAppointment.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const appointment = await Appointment.findOne({ id: id });
    if (!appointment) {
      return res.status(404).json({
        message: "Agendamento nao encontrado",
      });
    }
    await appointment.update({ status: status });
    res.status(201).json({ message: "Agendamento atualizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

routerAppointment.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findOne({ id: id });
    if (!appointment) {
      return res.status(404).json({
        message: "Agendamento nao encontrado",
      });
    }
    await appointment.destroy();
    res.status(201).json({ message: "Agendamento deletado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routerAppointment;
