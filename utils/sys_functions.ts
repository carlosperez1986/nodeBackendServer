/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/**
 * @description functions commonly used by the business api project
 * @version 1.0.01
 */

import Query from 'mysql2/typings/mysql/lib/protocol/sequences/Query';
// import { Bus_message } from '../types'

/**
 * @description allows to identify the current state of the agent, which is later used to call the distributor api
 * @param {string} state_now Actual state
 * @param {string} previous_state previous state
 * @returns [0|1, 'info'|true|false]
 */
export const checkAvaliableState = (stateNow: string, previousState: string): [Number, string | boolean] => {
  try {
    if (stateNow === previousState) {
      return [0, 'the state has not changed']
    }
    if ((stateNow !== 'not_available' && stateNow !== 'absent') && (previousState === 'not_available' || previousState === 'absent')) {
      return [1, true] // state now avality
    }
    if ((stateNow === 'not_available' || stateNow === 'absent') && (previousState !== 'not_available' && previousState !== 'absent')) {
      return [1, false] // state now no avality
    }
    return [0, 'dont know what to do, stateNow:' + stateNow + ', previousState:' + previousState]
  } catch (err) {
    if (err instanceof Error) {
      console.log('Err function checkAvaliableState, err:', err.toString())
      return [0, err.toString()]
    }
    console.log('Err function checkAvaliableState, err:', 'UNKNOWN')
    return [0, 'UNKNOWN']
  }
}

/**
 * Generate UUID strings.
 * @return {string} generated uuid
 */
export const actionIDGenerator = function (): string {
  let d = new Date().getTime()
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (q) {
    const r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (q === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })
  return uuid
}

/**
 * @description check error mysql.
 * @param {Query.QueryError} err or null
 * @returns {boolean}
 */
export const responseNotValid = (err: Query.QueryError): boolean => {
  try {
    if (err == null) return false
    if (err.fatal) return true
    switch (err.code) {
      case 'ER_SERVER_SHUTDOWN':
        return true
      case 'PROTOCOL_CONNECTION_LOST':
        return true
      default:
        return false
    }
  } catch (err) {
    return true
  }
}

/**
 * @description return date
 * @returns "YYYY-MM-DD HH-MM-SS"
 */
export const getDateNow = (): string => {
  const nzDateString = new Date()//.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })
  const dateNz = new Date(nzDateString)
  const year = dateNz.getFullYear()
  const month = ('0' + (dateNz.getMonth() + 1)).slice(-2)
  const date = ('0' + dateNz.getDate()).slice(-2)
  const hours = ('0' + dateNz.getHours()).slice(-2)
  const minutes = ('0' + dateNz.getMinutes()).slice(-2)
  const seconds = ('0' + dateNz.getSeconds()).slice(-2)
  const dateTime = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
  return dateTime
}

/**
 * @description return date
 * @returns "YYYYMMDD"
 */
 export const formatDateUuid = (): string => {
  let date = new Date();
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()

  ].join('');
}
/* Check if string is IP */
export const checkIfValidIP = (str:string):Boolean => {
  // Regular expression to check if string is a IP address
  const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  return regexExp.test(str);
}

export const typeSecfilter = (data:string):number =>{
  if (checkIfValidIP(data)) {
    return 3;
  }else {
    return 2;
  }
}
/**
 * @generator message amqp
 * @returns message to amqp
 */
// export const amqpMessage = (uuid: string , from: string, to: string, channel: string, channel_id: number, company: string): Bus_message => {
//   let body: Bus_message
//   body = {
//     header: {
//       uuid,
//       date: Date.now(),
//       from,
//       to,
//       channel,
//       channel_id,
//       company
//     },
//     data: {
//       name: name,
//       type_wh: 'newAccount'
//     }
//   }
//   return body
// }
 