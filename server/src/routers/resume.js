import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
   res.sendFile('./src/data/resume/resume.pdf', { root: '.' }, (err) => {
      if (err) res.status(404).send({ error: 'file not found' });
   });
});

export default router;
