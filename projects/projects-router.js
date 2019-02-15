const express = require('express');

const Projects = require('../data/helpers/projectModel');

const router = express.Router();

//GET PROJECT ACTIONS
router.get('/actions/:id', async (req, res) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    if (actions) {
      return res.status(200).json(actions);
    } else {
      res.status(404).json({ error: "The project with the specified ID does not exist."})
    }
  } catch (error) {
    res.status(500).json({ error: "We could not retrieve the project actions at this time."})
  }
});


//GET

router.get("/", async (req, res) => {
  try {
      const jects = await Projects.get();
      res.status(200).json(jects);
  } catch (error) {
      res.status(500).json({ error: "The projects could not be retrieved." })
  }
})


router.get('/:id', async (req, res) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      return res.status(200).json(project);
    } else {
      res.status(400).json({ error: "The post with the given ID does not exit."});
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be retrieved at this time"})
  }
});

//POST

router.post('/', async (req, res) => {
  const splitName = req.body.name.split('');
  if(!req.body.name || !req.body.description || req.body.completed === null) {
    return res.status(400).json({ error: "Please provide a name, description and completed status"})
  } else if (splitName.length > 128) {
    res.status(400).json({ error: "Name cannot be larger than 128 characters loing"})
  }
  try {
    console.log(req);
    const project = await Projects.insert(req.body);
    res.status(201).json({ success: true, project });
  } catch (error) {
    res.status(500).json({ error: 'We could not post the project at this time.'})
  }
  
});


//DELETE

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Projects.remove(req.params.id);
    if (deleted) {
      return res.status(200).json(deleted);
    } else {
      res.status(404).json({ error: "The project with this ID does not exist."})
    }
  } catch (error) {
    res.status(500).json({ error: "We were unable to delete the project at this time."})
  }
  
});

//EDIT 
router.put('/:id', async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Please provide a name, description, or completed status to update."})
  }
  try {
    const edited = await Projects.update(req.params.id, req.body);
    if (edited) {
      return res.status(200).json(edited);
    } else {
      res.status(404).json({ error: "The project with the specified ID does not exist."});
    }
  } catch (error) {
    res.status(500).json({ error: "We could not update the project at this time."})
  }
});



module.exports = router;