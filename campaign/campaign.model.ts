import { db as sql } from '../utils/db';
import * as sysFunctions from '../utils/sys_functions';
import { OkPacket, RowDataPacket } from 'mysql2';

const service = 'CAMPAIGN';
const schema = 'app_db';
export interface campaing {
    ddi: Number
    cod: string
    uuid: string
}

//obtenemos los datos de todas las campañas de una empresa, sin paginar//
export const getAllCampaign = (page: string): Promise<campaing[]> => {
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM  ${schema}.Campaigns order by DateCreate desc`;
            if (sql.get().flag === 0) {
                return reject({ code: 500, message: 'no db connected', level: 'ERROR', data: null })
            }
            sql.get().connection?.query(query, (err, res: RowDataPacket[]) => {
                if (err != null) {
                    if (sysFunctions.responseNotValid(err)) sql.del()
                    return reject({ code: 500, message: err.toString(), level: 'ERROR', data: null })
                }
                console.log(`${Date.now()} | BUSINESSAPI | INFO | ${service} | found campaign's`)
                return resolve(res as campaing[])
            })
        } catch (e) {
            return reject({ code: 500, message: e instanceof Error ? e.toString() : 'UNKNOWN', level: 'ERROR', data: null })
        }
    })
}

//obtenemos los datos de una campaña//
export const getCampaign = (IdCompany: string, Id: string): Promise<campaing> => {
    return new Promise((resolve, reject) => {
        try {
            if (sql.get().flag === 0) {
                return reject({ code: 500, message: 'no db connected', level: 'ERROR', data: null })
            }
            sql.get().connection?.query(`SELECT * FROM ${schema}.Campaigns WHERE Id = ? and IdCompany = ? order by DateCreate desc`, [Id, IdCompany], (err, res: RowDataPacket[]) => {
                if (err != null) {
                    if (sysFunctions.responseNotValid(err)) sql.del()
                    return reject({ code: 500, message: err.toString(), level: 'ERROR', data: null })
                }
                //console.log(`${Date.now()} | BUSINESSAPI | INFO | ${service} | found campaign`)
                return resolve(res[0] as campaing)
            })
        } catch (e) {
            return reject({ code: 500, message: e instanceof Error ? e.toString() : 'UNKNOWN', level: 'ERROR', data: null })
        }
    })
}

//obtenemos los datos de todas las campañas de una empresa//
export const getAllCampaignByCompany = (IdCompany: string, page: string): Promise<campaing[]> => {
    return new Promise((resolve, reject) => {
        try { 
            if (sql.get().flag === 0) {
                return reject({ code: 500, message: 'no db connected', level: 'ERROR', data: null })
            }
            sql.get().connection?.query(`SELECT c.Id, c.Name, c.Description, DATE_FORMAT(c.DateCreate, '%d/%m/%Y %T') DateCreate,  DATE_FORMAT(c.DateInitCampaign, '%d/%m/%Y %T') DateInitCampaign,DATE_FORMAT(c.DateFinish, '%d/%m/%Y %T') DateFinish, c.Type, c.IdCompany, c.Country, cc.Name as NameCompany, cc.Address FROM ${schema}.Campaigns c left join ${schema}.Companies cc on c.IdCompany = cc.Id  WHERE IdCompany = ? order by c.DateCreate desc`, [IdCompany], (err, res: RowDataPacket[]) => {
                if (err != null) {
                    if (sysFunctions.responseNotValid(err)) sql.del()
                    return reject({ code: 500, message: err.toString(), level: 'ERROR', data: null })
                }
                console.log(`${Date.now()} | BUSINESSAPI | INFO | ${service} | found campaign's`)
                return resolve(res as campaing[])
            })
        } catch (e) {
            return reject({ code: 500, message: e instanceof Error ? e.toString() : 'UNKNOWN', level: 'ERROR', data: null })
        }
    })
}