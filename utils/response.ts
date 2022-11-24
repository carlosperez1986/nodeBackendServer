import { Response } from 'express'

/**
 * @description api response management
 */

/**
 * @description generated object to response res
 * @param {string} message
 * @param {object} data
 * @returns
 */
function objectResponse (message: string, data: Object | null): Object {
  return {
    message,
    data
  }
}

/**
 * @description send response api
 * @param {response} res
 * @param {int} code
 * @param {string} message
 * @param {obj} data
 * @param {string} service
 * @param {string} loggerInfo
 */
export const responseApi = (res: Response, code: number, message: string, data: Object | null, service: string, loggerInfo: string): void => {
  try {
    console.log(`${Date.now()} | BUSINESSAPI | ${loggerInfo} | ${service} | ${message}`)
    res.status(code).send(objectResponse(message, data))
  } catch (err: any) {
    if (err instanceof Error) {
      console.log(`${Date.now()} | BUSINESSAPI | ERROR | INTERNAL RESPONSE, ERR: ${err.message}`)
      res.status(500).send({
        message: err.message
      })
    } else {
      console.log(`${Date.now()} | BUSINESSAPI | ERROR | INTERNAL RESPONSE, ERR: UNKNOWN`)
      res.status(500).send({
        message: 'UNKNOWN'
      })
    }
  }
} 