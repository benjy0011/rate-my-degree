import { createClient } from "@/lib/supabase/server"
import Link from "next/link";

export default async function page() {
  const supabase = await createClient();

  const { data: { user }, error } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Test</h1>
        
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error.message}
          </div>
        ) : user ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <h2 className="text-xl font-bold mb-4">✅ Logged In!</h2>
            <div className="space-y-2">
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Name:</strong> {user.user_metadata?.full_name || 'N/A'}</p>
              <p><strong>User ID:</strong> {user.id}</p>
              <p><strong>Provider:</strong> {user.app_metadata?.provider || 'N/A'}</p>
            </div>
            
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold">View Full User Object</summary>
              <pre className="mt-2 p-4 bg-gray-800 text-green-400 rounded overflow-auto text-sm">
                {JSON.stringify(user, null, 2)}
              </pre>
            </details>
          </div>
        ) : (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
            <p>❌ Not logged in</p>
            <Link href="/" className="text-blue-600 underline">Go to homepage to sign in</Link>
          </div>
        )}
      </div>
    </div>
  )
}