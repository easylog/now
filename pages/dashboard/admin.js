import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Kunden</h2>
          <p className="text-4xl font-bold">3</p>
          <p className="text-gray-500">Aktive Kunden</p>
          <Link href="/changeboard">
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Details anzeigen
            </button>
          </Link>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Änderungen</h2>
          <p className="text-4xl font-bold">12</p>
          <p className="text-gray-500">Offene Änderungen</p>
          <Link href="/changeboard">
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              ChangeBoard öffnen
            </button>
          </Link>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Journal</h2>
          <p className="text-4xl font-bold">8</p>
          <p className="text-gray-500">Journal-Einträge</p>
          <Link href="/journal">
            <button className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600">
              Journal öffnen
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
