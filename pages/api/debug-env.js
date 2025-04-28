// Middleware zur Überprüfung der Umgebungsvariablen und Debugging
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

  // Überprüfen der Umgebungsvariablen
  const envStatus = {
    mongodb_uri: process.env.MONGODB_URI ? 'Konfiguriert' : 'Fehlt',
    mongodb_db: process.env.MONGODB_DB ? 'Konfiguriert' : 'Fehlt',
    jwt_secret: process.env.JWT_SECRET ? 'Konfiguriert' : 'Fehlt',
    node_env: process.env.NODE_ENV || 'development'
  };

  // Zusätzliche Informationen für Debugging
  const debugInfo = {
    apiEndpoint: req.url,
    method: req.method,
    headers: req.headers,
    timestamp: new Date().toISOString(),
    vercelInfo: {
      region: process.env.VERCEL_REGION || 'Unbekannt',
      environment: process.env.VERCEL_ENV || 'Unbekannt'
    }
  };

  res.status(200).json({
    message: 'Umgebungsvariablen-Status',
    envStatus,
    debugInfo,
    hinweise: [
      "Stellen Sie sicher, dass MONGODB_URI, MONGODB_DB und JWT_SECRET in den Vercel-Umgebungsvariablen konfiguriert sind",
      "Rufen Sie /api/bootstrap auf, um die Datenbank zu initialisieren",
      "Verwenden Sie admin@easylog.de / admin123 oder staff@easylog.de / staff123 zur Anmeldung"
    ]
  });
}
