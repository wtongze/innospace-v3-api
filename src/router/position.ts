import express from 'express';
import { auth } from '../firebase';
import { Position } from '../model/position';
import { Project } from '../model/project';
import { CreatePositionRequestBody, DeletePositionRequestBody, UpdatePositionRequestBody } from '../type';

const positionRouter = express.Router();

positionRouter.post('/', async (req, res) => {
  const {
    token,
    title,
    type,
    description,
    requirement,
    preference,
    skills,
    project,
    visible,
  } = req.body as CreatePositionRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  const targetProject = await Project.findByPk(project);
  if (targetProject) {
    if (uid === targetProject.owner) {
      await Position.create({
        title,
        type,
        description,
        requirement,
        preference,
        skills,
        project,
        views: 0,
        visible,
      });
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(404);
  }
});

positionRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;
  const { uid } = await auth.verifyIdToken(token);
  const targetPosition = await Position.findByPk(id);
  if (targetPosition) {
    const targetProject = await Project.findByPk(targetPosition.project);
    if (targetProject) {
      if (targetProject.owner === uid || targetPosition.visible) {
        res.json(targetPosition.toJSON());
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
});

positionRouter.patch('/:id', async (req, res) => {
  const {
    token,
    title,
    type,
    description,
    requirement,
    preference,
    skills,
    visible,
  } = req.body as UpdatePositionRequestBody;
  const { id } = req.params;
  const { uid } = await auth.verifyIdToken(token);
  const targetPosition = await Position.findByPk(id);
  if (targetPosition) {
    const targetProject = await Project.findByPk(targetPosition.project);
    if (targetProject) {
      if (uid === targetProject.owner) {
        targetPosition.title = title;
        targetPosition.type = type;
        targetPosition.description = description;
        targetPosition.requirement = requirement;
        targetPosition.preference = preference;
        targetPosition.skills = skills;
        targetPosition.visible = visible;
        await targetPosition.save();
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
});

positionRouter.delete('/:id', async (req, res) => {
  const { token } = req.body as DeletePositionRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  const targetPosition = await Position.findByPk(req.params.id);
  if (targetPosition) {
    const targetProject = await Project.findByPk(targetPosition.project);
    if (targetProject) {
      if (uid === targetProject.owner) {
        await targetPosition.destroy();
        res.sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(404);
  }
})

export default positionRouter;
