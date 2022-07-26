import express from 'express';
import { auth } from '../firebase';
import { User } from '../model/user';
import {
  CreateUserRequestBody,
  DeleteUserRequestBody,
  ReadUserRequestBody,
  UpdateUserRequestBody,
} from '../type';

const userRouter = express.Router();

userRouter.post('/', async (req, res) => {
  const {
    token,
    name,
    description,
    resume,
    email,
    mobile_phone_number,
    skills,
    interested_tags,
    interested_fields,
  } = req.body as CreateUserRequestBody;
  const { uid } = await auth.verifyIdToken(token);
  await User.create({
    uid,
    name,
    description,
    resume,
    email,
    mobile_phone_number,
    skills,
    interested_tags,
    interested_fields,
  });
  res.sendStatus(200);
});

userRouter.get('/:uid', async (req, res) => {
  const { token } = req.body as ReadUserRequestBody;
  const { uid } = req.params;
  const { uid: decodedUid } = await auth.verifyIdToken(token);
  if (decodedUid === uid) {
    const targetUser = await User.findByPk(uid);
    if (targetUser) {
      res.json(targetUser.toJSON());
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(401);
  }
});

userRouter.patch('/:uid', async (req, res) => {
  const {
    token,
    name,
    description,
    resume,
    email,
    mobile_phone_number,
    skills,
    interested_tags,
    interested_fields,
  } = req.body as UpdateUserRequestBody;
  const { uid } = req.params;
  const { uid: decodedUid } = await auth.verifyIdToken(token);
  if (decodedUid === uid) {
    const targetUser = await User.findByPk(uid);
    if (targetUser) {
      targetUser.name = name;
      targetUser.description = description || null;
      targetUser.resume = resume || null;
      targetUser.email = email;
      targetUser.mobile_phone_number = mobile_phone_number || null;
      targetUser.skills = skills;
      targetUser.interested_tags = interested_tags;
      targetUser.interested_fields = interested_fields;
      await targetUser.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(401);
  }
});

userRouter.delete('/:uid', async (req, res) => {
  const { token } = req.body as DeleteUserRequestBody;
  const { uid } = req.params;
  const { uid: decodedUid } = await auth.verifyIdToken(token);
  if (decodedUid === uid) {
    const targetUser = await User.findByPk(uid);
    if (targetUser) {
      await targetUser.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(401);
  }
});

export default userRouter;
