import Sequelize from "sequelize-oracle"
import dotenv from "dotenv"

dotenv.config()

const oraclebd = require("oracledb")

try {
	await oraclebd.initOracleClient({ libDir: "/opt/oracle/instantclient_21_13" })
} catch (error) {
	console.error("Oracle connection")
	console.error(error)
}

const connection = new Sequelize(process.env.SERVER, process.env.USUARIO, process.env.PASSWORD, {
	host: process.env.HOST,
	dialect: process.env.DIALECT || "oracle",
})

export default connection