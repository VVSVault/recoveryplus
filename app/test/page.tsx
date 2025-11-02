export default function TestPage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Tailwind CSS Test</h1>
      <p className="text-lg text-gray-300 mb-4">If you can see this styled text, Tailwind is working.</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
        Test Button
      </button>
      <div className="mt-8 p-4 bg-gray-800 rounded">
        <p>This should have a gray background</p>
      </div>
    </div>
  );
}