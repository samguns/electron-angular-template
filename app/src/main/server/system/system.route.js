import { Router } from "express";

const router = new Router();

router.route('/health-check').get(async (req, res) => {
  res.status(200).send('alive');
});

export default router;
