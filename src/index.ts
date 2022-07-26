import express from 'express';
import applicationRouter from './router/application';
import fileRouter from './router/file';
import positionRouter from './router/position';
import projectRouter from './router/project';
import userRouter from './router/user';

const app = express();
const port = 8080;

app.get('/', (req, res) => {
  res.send('Hello world from InnoSpace V3 API!');
});

app.use('/user', userRouter);
app.use('/project', projectRouter);
app.use('/position', positionRouter);
app.use('/application', applicationRouter);
app.use('/file', fileRouter);

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});


