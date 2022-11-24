import express, { Request, Response } from 'express';
import { check } from 'express-validator';
import { responseApi } from '../utils/response';
import {
  getCampaign
} from './campaign.model';
import axios from 'axios';
import { getAll, getAllbyCompany } from './campaign.controller';

const router = express.Router();

const service = 'CAMPAIGN';

router.get('/hola', (req: Request, res: Response) => {
  // getAll(req.params.uuid) 
  //return responseApi(res, 200, `success getAll campaign conf`, "response", service, 'INFO')
  res.json("OK");
});

router.get('/:page', [
  check('page').exists({ checkNull: true, checkFalsy: true }).bail().isEmail().bail().isLength({ min: 1, max: 255 }),
], (req: Request, res: Response) => { 
  getAll(req.params.page)
    .then((response) => {
      return responseApi(res, 200, `success getAll campaign ${req.params.page} conf`, response, service, 'INFO')
    })
    .catch((err) => {
      return responseApi(res, err.code, err.message, err.data, service, err.level)
    })
});


router.get('/allbycompany/:idCompany/:page', (req: Request, res: Response) => {
  getAllbyCompany(req.params.idCompany, req.params.page)
    .then((response) => {
      return responseApi(res, 200, `Success retreaving all getAllbyCompany`, response, service, 'INFO')
    })
    .catch((err) => {
      return responseApi(res, err.code, err.message, err.data, service, err.level)
    })
});

router.get('/:idcompany/:id', [
  check('idcompany').exists({ checkNull: true, checkFalsy: true }).bail().isEmail().bail().isLength({ min: 1, max: 255 }),
  check('id').exists({ checkNull: true, checkFalsy: true }).bail().isEmail().bail().isLength({ min: 1, max: 255 }),

], (req: Request, res: Response) => {
  // getAll(req.params.uuid)
  getCampaign(req.params.idcompany, req.params.id)
    .then((response) => {
      return responseApi(res, 200, `success get campaign ${req.params.id} conf`, response, service, 'INFO')
    })
    .catch((err) => {
      return responseApi(res, err.code, err.message, err.data, service, err.level)
    })
});



export default router