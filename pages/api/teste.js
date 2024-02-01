import users from '../../models/users';
import outsourceds from '../../models/outsourceds';
import Sequelize from 'sequelize-oracle';
import Oracledb from 'oracledb';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';  // Importe o módulo JWT


dotenv.config();
let report;

try {
    Oracledb.initOracleClient({
      libDir: '../../../opt/oracle/instantclient_19_16',
    });
   report = 'Cliente Oracle inicializado com sucesso.';
  } catch (error) {
    report = error;
  }

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    
    res.status(200).json({ report });
  }
}