import express from 'express';
import fs from 'fs';
import { logger } from '@/utils';

const router = express.Router();

router.get('/:mrto/:vwind/:vrto', (req, res) => {
   const { mrto, vwind, vrto } = req.params;
   fs.readFile(
      `./src/data/csm/50-${mrto}-${vwind}-${vrto}-lri.json`,
      { root: '.' },
      (err, data) => {
         if (err) logger(err);
         res.json(JSON.parse(data));
      }
   );
});

export default router;
