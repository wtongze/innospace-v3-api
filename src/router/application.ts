import express from 'express';
import { auth } from '../firebase';
import { Application } from '../model/application';
import { Project } from '../model/project';
import {
  CreateApplicationRequestBody,
  DeleteApplicationRequestBody,
  ReadApplicationRequestBody,
  UpdateApplicationRequestBody,
} from '../type';

const applicationRouter = express.Router();

const APPLICATION_STATUS = {
  SENT: 'SENT',
  REVIEWED: 'REVIEWED',
  WITHDRAWED: 'WITHDRAWED',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED',
};

applicationRouter.post('/', async (req, res) => {
  const {
    token,
    project,
    position,
    name,
    email,
    mobile_phone_number,
    resume,
    type,
  } = req.body as CreateApplicationRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  await Application.create({
    project,
    position,
    owner: uid,
    name,
    email,
    mobile_phone_number,
    resume,
    type,
    status: APPLICATION_STATUS.SENT,
    accepted_at: null,
    rejected_at: null,
    reviewed_at: null,
    sent_at: new Date().toISOString(),
    withdrawed_at: null,
  });
});

applicationRouter.get('/:id', async (req, res) => {
  const { token } = req.body as ReadApplicationRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  const targetApplication = await Application.findByPk(req.params.id);
  if (targetApplication) {
    const targetProject = await Project.findByPk(targetApplication.project);
    if (targetProject) {
      if (targetApplication.owner === uid) {
        res.json(targetApplication.toJSON());
      } else if (targetProject.owner === uid) {
        if (targetApplication.status === APPLICATION_STATUS.SENT) {
          targetApplication.status = APPLICATION_STATUS.REVIEWED;
          targetApplication.reviewed_at = new Date().toISOString();
          await targetApplication.save();
        }
        res.json(targetApplication.toJSON());
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

applicationRouter.patch('/:id', async (req, res) => {
  const { token, name, email, mobile_phone_number, resume, status, type } =
    req.body as UpdateApplicationRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  const targetApplication = await Application.findByPk(req.params.id);
  if (targetApplication) {
    if (targetApplication.owner === uid) {
      if (targetApplication.status === APPLICATION_STATUS.SENT) {
        if (status === APPLICATION_STATUS.WITHDRAWED) {
          targetApplication.status = APPLICATION_STATUS.WITHDRAWED;
          targetApplication.withdrawed_at = new Date().toISOString();
          await targetApplication.save();
          res.sendStatus(200);
        } else {
          targetApplication.name = name;
          targetApplication.email = email;
          targetApplication.mobile_phone_number = mobile_phone_number;
          targetApplication.resume = resume;
          targetApplication.type = type;
          await targetApplication.save();
          res.sendStatus(200);
        }
      } else {
        res.sendStatus(409);
      }
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(404);
  }
});

applicationRouter.delete('/:id', async (req, res) => {
  const { token } = req.body as DeleteApplicationRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  const targetApplication = await Application.findByPk(req.params.id);
  if (targetApplication) {
    if (targetApplication.owner === uid) {
      if (
        [APPLICATION_STATUS.SENT, APPLICATION_STATUS.WITHDRAWED].includes(
          targetApplication.status
        )
      ) {
        await targetApplication.destroy();
        res.sendStatus(200);
      } else {
        res.sendStatus(409);
      }
    } else {
      res.sendStatus(401);
    }
  } else {
    res.sendStatus(404);
  }
});

export default applicationRouter;
