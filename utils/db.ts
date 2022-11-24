import mysql from 'mysql2'
import Connection from 'mysql2/typings/mysql/lib/Connection'
import { DEVELOPMENT, PRODUCTION } from './db.config'

let dbConfig: any
if (process.env.NODE_ENV === 'prod') {
  dbConfig = PRODUCTION
} else {
  dbConfig = DEVELOPMENT
}

let checkCon = false

class ConDb {
  private data: { flag: number, connection: Connection | null }

  constructor () {
    this.data = {
      flag: 0,
      connection: null
    }
  }

  add (conn: Connection | null): void {
    this.data.connection = conn
    this.data.flag = 1
  }

  del (): void {
    checkCon = false
    this.data.flag = 0
    this.data.connection = null
  }

  get (): { flag: number, connection: Connection | null } {
    return this.data
  }
}

export const db: ConDb = new ConDb()

const start = (): void => {
  if (!checkCon) {
    checkCon = true
    // Create a connection to the database
    console.log('Inicio conexion businessapi')
    const connection = mysql.createPool({
      connectionLimit: 10,
      database: dbConfig.database,
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      port: dbConfig.PORT
    })

    // connection.query = util.promisify(connection.query).bind(connection)

    connection.promise()

    // open the MySQL connection
    connection.getConnection(function (error, connection) {
      try {
        if (error != null) {
          console.log(`${Date.now()} | BUSINESSAPI | INFO | MYSQL | error de conexion: ${error.message}`)
          checkCon = false
          db.del()
          return
        }
      } catch (err) {
        console.log(`${Date.now()} | BUSINESSAPI | INFO | MYSQL | error de conexion: ${error.message}`)
        checkCon = false
        db.del()
      }
    })

    connection.on('connection', (c) => {
      db.add(connection)
      console.log(`${Date.now()} | BUSINESSAPI | INFO | MYSQL | Successfully connected to the database.`)
    })
  }
}

export const startDb = async (): Promise<void> => {
  start()
  setInterval(start, 5000)
}