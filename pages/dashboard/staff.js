import Link from 'next/link';

export default function StaffDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8">Mitarbeiter Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">ChangeBoard</h2>
          <p className="text-gray-500">Neue Einträge und Updates verwalten</p>
          <Link href="/changeboard">
            <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              ChangeBoard öffnen
            </button>
          </Link>
        </div>
        <div className="p-6 border rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Journal</h2>
          <p className="text-gray-500">Einträge erstellen und bearbeiten</p>
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
