export default function handler(req, res) {
  // CORS-Header setzen
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

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

  // Einfache Testantwort ohne Datenbankverbindung
  res.status(200).json({
    message: 'Anmeldung erfolgreich',
    token: 'test-token',
    user: {
      id: '1',
      email: req.body.email || 'test@example.com',
      name: 'Test User',
      role: 'admin'
    }
  });
}
