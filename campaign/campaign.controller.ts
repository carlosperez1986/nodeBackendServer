import { v4 as uuidv4 } from 'uuid';
import { campaing, getAllCampaign, getCampaign, getAllCampaignByCompany } from './campaign.model';

const service = 'CAMPAIGN';

export const getAll = async (page: string): Promise<campaing[]> => {
    console.log(`${Date.now()} | BUSINESSAPI | INFO | ${service} | findAll campaigns all company`)
    return getAllCampaign(page) 
      .then(async (response) => {
        return await Promise.resolve(response)
      })
      .catch(async (err) => {
        return await Promise.reject(err)
      })
  }

  export const getAllbyCompany = async (idCompany: string, page: string): Promise<campaing[]> => {
    console.log(`${Date.now()} | BUSINESSAPI | INFO | ${idCompany}/${page} | findAll campaigns all company`)
    return getAllCampaignByCompany(idCompany, page)
    //   .then(async (company) => {
    //       // return object companny
    //       return await getAllCampaign("company.schemadb")
    //   })
      .then(async (response) => {
        return await Promise.resolve(response)
      })
      .catch(async (err) => {
        return await Promise.reject(err)
      })
  }

  export const get = async (idCompany: string, id: string): Promise<campaing> => {
    console.log(`${Date.now()} | BUSINESSAPI | INFO | ${service} | findAll campaigns all company`)
    return getCampaign(idCompany, id)
    //   .then(async (company) => {
    //       // return object companny
    //       return await getAllCampaign("company.schemadb")
    //   })
      .then(async (response) => {
        return await Promise.resolve(response)
      })
      .catch(async (err) => {
        return await Promise.reject(err)
      })
  }

// export const create = async (name: string, date_init: number, date_end: number|null, company: string): Promise<campaign> => {
//     // Create a user
//     const newcamp: campaign = {
//       id: null,
//       name, 
//       uuid: uuidv4(),
//       company: company,
//       date_end: date_end,
//       date_init: date_init | Date.now(),
//       active: false,
//       deleted: false
//     }
  
//     console.log(`${Date.now()} | BUSINESSAPI | INFO | ${service} | creating campaign, ${newcamp.name} from company ${newcamp.company}`)
  
//     // check uuid
//     return await getCodCompany(company)
//       .then(async (company) => {
//           // return object companny
//           newcamp.company = company.schemadb
//         return await createCampaign(newcamp)
//       })
//       .then(async ()=>{
//           return await Promise.resolve(newcamp as campaing)
//       })
//       .catch(async (err) => {
//           console.log(`${Date.now()} | BUSINESSAPI | ERROR | ${service} | Error creating campaign, ${newcamp.name} from company ${newcamp.company}, err: ${err.message}`)
//           return await Promise.reject(err)
//       })
//   }

// export const create = async (name: string, date_init: number, date_end: number|null, company: string): Promise<campaign> => {
//     // Create a user
//     const newcamp: campaign = {
//       id: null,
//       name, 
//       uuid: uuidv4(),
//       company: company,
//       date_end: date_end,
//       date_init: date_init | Date.now(),
//       active: false,
//       deleted: false
//     }
  
//     console.log(`${Date.now()} | BUSINESSAPI | INFO | ${service} | creating campaign, ${newcamp.name} from company ${newcamp.company}`)
  
//     // check uuid
//     return await getCodCompany(company)
//       .then(async (company) => {
//           // return object companny
//           newcamp.company = company.schemadb
//         return await createCampaign(newcamp)
//       })
//       .then(async ()=>{
//           return await Promise.resolve(newcamp as campaing)
//       })
//       .catch(async (err) => {
//           console.log(`${Date.now()} | BUSINESSAPI | ERROR | ${service} | Error creating campaign, ${newcamp.name} from company ${newcamp.company}, err: ${err.message}`)
//           return await Promise.reject(err)
//       })
//   }