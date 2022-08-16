import express from 'express';
import fs from 'fs';
import { logger } from '@/utils';

const router = new express.Router();

// retreive NN file
router.get('/:file', (req, res) => {
   fs.readFile(`./src/data/nn/${req.params.file}`, (err, data) => {
      if (err) logger(err);
      res.json(JSON.parse(data));
   });
});

// add to NN database
router.post('/', (req, res) => {
   const data = JSON.stringify(req.body, null, 3);
   const filename = Date.now().toString(36);
   fs.writeFile(`./src/data/nn/input_${filename}.json`, data, (err) => {
      if (err) logger(err);
   });
   res.send(true);
});

export default router;
