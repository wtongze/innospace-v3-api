import express from 'express';
import { auth } from '../firebase';
import { Project } from '../model/project';
import {
  CreateProjectRequestBody,
  DeleteProjectRequestBody,
  ReadProjectRequestBody,
  UpdateProjectRequestBody,
} from '../type';

const projectRouter = express.Router();

projectRouter.post('/', async (req, res) => {
  const {
    token,
    id,
    name,
    logo,
    description,
    tags,
    fields,
    website,
    contact_name,
    contact_email,
    visible,
  } = req.body as CreateProjectRequestBody;
  const { uid: owner } = await auth.verifyIdToken(token);
  const existingProject = await Project.findByPk(id);
  if (existingProject) {
    res.sendStatus(409);
  } else {
    await Project.create({
      id,
      name,
      logo,
      description,
      tags,
      fields,
      website,
      owner,
      contact_name,
      contact_email,
      views: 0,
      visible,
    });
    res.sendStatus(200);
  }
});

projectRouter.get('/:id', async (req, res) => {
  const { token } = req.body as ReadProjectRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  const targetProject = await Project.findByPk(req.body.id);
  if (targetProject) {
    if (uid === targetProject.owner || targetProject.visible) {
      res.json(targetProject.toJSON());
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(404);
  }
});

projectRouter.patch('/:id', async (req, res) => {
  const {
    token,
    name,
    logo,
    description,
    tags,
    fields,
    website,
    contact_name,
    contact_email,
    visible,
  } = req.body as UpdateProjectRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  const targetProject = await Project.findByPk(req.params.id);
  if (targetProject) {
    if (uid === targetProject.owner) {
      targetProject.name = name;
      targetProject.logo = logo || null;
      targetProject.description = description;
      targetProject.tags = tags;
      targetProject.fields = fields;
      targetProject.website = website || null;
      targetProject.contact_name = contact_name;
      targetProject.contact_email = contact_email;
      targetProject.visible = visible;
      await targetProject.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(404);
  }
});

projectRouter.delete('/:id', async (req, res) => {
  const { token } = req.body as DeleteProjectRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  const targetProject = await Project.findByPk(req.params.id);

  if (targetProject) {
    if (targetProject.owner === uid) {
      await targetProject.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(404);
  }
});

export default projectRouter;
