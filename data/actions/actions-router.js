const express = require('express');

const Actions = require('../helpers/actionModel');

const router = express.Router();


//GET


router.get('/', async (req, res) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions)
  } catch (error) {
    res.status(500).json({ error: "We could not retrieve actions at this time."})
  }
});


router.get('/:id', async (req, res) => {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      return res.status(200).json(action);
    } else {
      res.status(404).json({ error: "The action with the specified ID does not exist."})
    }
  } catch (error) {
    res.status(500).json({ error: "We could not retrieve actions at this time."})
  }
});


//POST

router.post('/', async (req, res) => {
  const splitDesc = req.body.description.split('');
  if(!req.body.description || !req.body.notes || !req.body.project_id || req.body.completed === null) {
    return res.status(400).json({ error: "Please provide a description, project ID, notes, and completed status"})
  } else if (splitDesc.length > 128) {
    res.status(400).json({ error: "Name cannot be larger than 128 characters loing"})
  }
  try {
    console.log(req);
    const action = await Actions.insert(req.body);
    res.status(201).json({ success: true, action });
  } catch (error) {
    res.status(500).json({ error: 'We could not post the action at this time.'})
  }
});




module.exports = router;