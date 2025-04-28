import { connectToDatabase } from '../../lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Hilfsfunktion zur Behandlung von CORS
function setCorsHeaders(res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
}

export default async function handler(req, res) {
  // CORS-Header setzen
  setCorsHeaders(res);

  // Behandlung von OPTIONS-Anfragen (für CORS-Preflight)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Nur POST-Anfragen zulassen
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Methode nicht erlaubt' });
    return;
  }

  try {
    const { email, password } = req.body;

    // Überprüfen, ob alle erforderlichen Felder vorhanden sind
    if (!email || !password) {
      res.status(400).json({ message: 'E-Mail und Passwort sind erforderlich' });
      return;
    }

    // Verbindung zur Datenbank herstellen
    const { db } = await connectToDatabase();
    
    // Benutzer in der Datenbank suchen
    const user = await db.collection('users').findOne({ email });

    // Überprüfen, ob der Benutzer existiert
    if (!user) {
      res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
      return;
    }

    // Passwort überprüfen
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
      return;
    }

    // JWT-Token erstellen
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET ist nicht definiert');
    }

    const token = jwt.sign(
      { 
        userId: user._id.toString(),
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Erfolgreiche Anmeldung
    res.status(200).json({
      message: 'Anmeldung erfolgreich',
      token,
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login-Fehler:', error);
    res.status(500).json({ message: 'Serverfehler bei der Anmeldung', error: error.message });
  }
}
