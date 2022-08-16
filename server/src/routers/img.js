import express from 'express';

const router = express.Router();

router.get('/:file', (req, res) => {
   res.sendFile(`./src/data/img/${req.params.file}`, { root: '.' }, (err) => {
      if (err) res.status(404).send({ error: 'file not found' });
   });
});

export default router;
