"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f9fbff] to-[#f0f4ff] text-gray-900 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Settings</h1>

        <div className="space-y-6">
          {/* Profile Section */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Profile</h2>
            <p className="text-gray-600 text-sm">
              Update your name, email, and profile photo.
            </p>
          </div>

          {/* Notifications */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Voice Agents</h2>
            <p className="text-gray-600 text-sm">
              Manage which voice you want top select for your interviews and
              update with new voices.
            </p>
          </div>

          {/* Privacy */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Feedback</h2>
            <p className="text-gray-600 text-sm">
              Make changes in feedback section, access more skill options.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <Button
            onClick={() => router.push("/dashboard")}
            variant={"primary"}
            className="bg-primary text-white hover:bg-blue-800 cursor-pointer"
          >
            ← Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
