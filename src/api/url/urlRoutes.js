import express from "express";
import { add, getUrl } from './urlController';

const router = express.Router();

router.post('/', add);
router.get('/:uid', getUrl);

export default router;
