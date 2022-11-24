/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Express } from 'express'
// import { startDb } from './utils/db'
import { Server } from 'http'
// import voiceEndpointRoutes from './voice_endpoint/voiceEndpoint.routes'
import campaign from './campaign/campaign.route';
// import campaignMembers from './campaign/members/members.routes';
// // import campaignchannel from './campaign/channel/channel.routes';
// import { startRabbit } from './utils/amqp'
// import trunkRoutes from './voiceTrunk/trunk.routes';
// import ddi from './ddi/ddi.routes';
// import ivr from './dialplan/ivr/ivr.routes';
// import ddiDial from './dialplan/ddi/ddi.routes';
import cors from 'cors';
import { startDb } from './utils/db';
// import { startRedis } from './utils/redis';
// import { graphqlHTTP } from 'express-graphql';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import {PrismaClient as schema_Services} from './prisma/generated/service';

const PORT = 8080

class App {
  app: Express
  constructor() {
    this.app = express()
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use('/campaign/endpoint', campaign);
    // this.app.use('/voice/registry', trunkRoutes)
    // this.app.use('/voice/ddi', ddi)
    // this.app.use('/voice/dialplan/ivr', ivr)
    // this.app.use('/voice/dialplan/ddi', ddiDial)
    // this.app.use('/campaign', campaign)
    // this.app.use('/campaign/members', campaignMembers)
    // this.app.use('/campaign/channels', campaignchannel);

  }

  listen(): Server {
    return this.app.listen(PORT, async () => {
      await startDb()
      //   await startRabbit()
      //   await startRedis()
      console.log(`Server running on port ${PORT}`)
    })
  }
}
//export const schemaServices = new schema_Services()
export default App