const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket');

// Create a new ticket
router.post('/', async (req, res) => {
    try {
      const ticket = new Ticket(req.body);
      await ticket.save();
      console.log('Ticket created:', ticket); 
      res.status(201).send(ticket);
    } catch (error) {
      console.error('Error creating ticket:', error);
      res.status(400).send(error);
    }
  });
  

// Retrieve all tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve a single ticket by its unique identifier
router.get('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).send({ error: 'Ticket not found' });
    }
    res.status(200).send(ticket);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a ticket by its unique identifier
router.patch('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!ticket) {
      return res.status(404).send({ error: 'Ticket not found' });
    }
    res.status(200).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a ticket by its unique identifier
router.delete('/:id', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).send({ error: 'Ticket not found' });
    }
    res.status(200).send({ message: 'Ticket deleted' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
