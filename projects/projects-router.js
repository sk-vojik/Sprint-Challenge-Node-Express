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



module.exports = router;