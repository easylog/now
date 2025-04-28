import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// Importieren Sie useSession, wenn Sie Authentifizierung verwenden
// import { useSession } from 'next-auth/react';

export default function Dashboard() {
  // Entfernen Sie useSession, wenn Sie keine Authentifizierung verwenden
  // const { data: session, status } = useSession();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(3); // Beispielwert
  const [journalCount, setJournalCount] = useState(8); // Beispielwert

  // Entfernen Sie useEffect, wenn Sie keine Authentifizierung verwenden
  // useEffect(() => {
  //   if (status === 'unauthenticated') {
  //     router.push('/auth/login');
  //   }
  //   if (session) {
  //     fetchUnreadChanges();
  //   }
  // }, [session, status, router]);

  // Funktion zum Abrufen ungelesener Änderungen (vereinfacht)
  const fetchUnreadChanges = async () => {
    // Hier würden Sie normalerweise die Daten von Ihrer API abrufen
    // Beispiel:
    // const response = await fetch('/api/customers');
    // const customers = await response.json();
    // const unread = customers.filter(customer => customer.hasUnreadChanges).length;
    // setUnreadCount(unread);
    setUnreadCount(2); // Beispielwert für ungelesene Änderungen
  };

  // Rufen Sie fetchUnreadChanges einmal beim Laden auf (optional)
  useEffect(() => {
    fetchUnreadChanges();
  }, []);

  // Entfernen Sie dies, wenn Sie keine Authentifizierung verwenden
  // if (status === 'loading') {
  //   return <div className="d-flex justify-content-center mt-5"><div className="spinner-border" role="status"></div></div>;
  // }

  return (
    <>
      <Head>
        <title>Dashboard | EasyLog</title>
      </Head>
      <div className="container mt-4">
        <h1>Dashboard</h1>
        <p className="lead">Übersicht über Kunden und Journal</p>

        {/* Karten für Kunden und Journal */}
        <div className="row mt-4">
          {/* Kundenkarte */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">
                  Kunden
                  {unreadCount > 0 && (
                    <span 
                      className="badge bg-danger ms-2"
                      style={{ 
                        borderRadius: '50%', 
                        padding: '0.4em 0.6em',
                        fontSize: '0.75em'
                      }}
                    >
                      {unreadCount}
                    </span>
                  )}
                </h5>
                <p className="h2">{customerCount}</p>
                <p className="card-text">Aktive Kunden</p>
                <Link href="/customers" className="btn btn-outline-primary">
                  Details anzeigen
                </Link>
              </div>
            </div>
          </div>

          {/* Journalkarte */}
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Journal</h5>
                <p className="h2">{journalCount}</p>
                <p className="card-text">Journal-Einträge</p>
                <Link href="/journal" className="btn btn-outline-primary">
                  Journal öffnen
                </Link>
              </div>
            </div>
          </div>

          {/* Optional: Fügen Sie hier weitere Karten hinzu, falls benötigt */}

        </div>

        {/* 
          ABSCHNITT "LETZTE AKTIVITÄTEN" ENTFERNT
          Der folgende Code wurde entfernt:
          
          <div className="mt-5">
            <h4>Letzte Aktivitäten</h4>
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  <th>Datum</th>
                  <th>Benutzer</th>
                  <th>Aktivität</th>
                  <th>Kunde</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>22.04.2025</td>
                  <td>Mitarbeiter</td>
                  <td>Neuer ChangeBoard-Eintrag</td>
                  <td>Kunde A</td>
                </tr>
                // Weitere Zeilen...
              </tbody>
            </table>
          </div>
        */}

      </div>
    </>
  );
}
