import { ChevronRight, CircleHelp, LockKeyhole, ShieldCheck, UserRound } from "lucide-react"
import { Auth } from "../../context/AuthContext";

const Settings = () => {
  const { userInfo } = Auth();
  return (
    <main className="min-h-screen w-full px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-500">Manage your account and how you track your money.</p>
        </div>

        <section className="mb-8 grid gap-6 border-b border-gray-200 pb-8 md:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-2 text-gray-900">
              <UserRound className="size-4 text-blue-700" />
              <h2 className="font-semibold">Profile</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-500">Your personal details and account information.</p>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-800">{userInfo?.email.charAt(0).toUpperCase()}</div>
              
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-gray-700">
                <h3>Profile Name</h3>
                <p>{userInfo?.displayName}</p>
              </label>
              <label className="space-y-2 text-sm font-medium text-gray-700">
                <h3>Email address</h3>
                <p>{userInfo?.email}</p>
              </label>
            </div>
          </div>
        </section>


        <section className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
          <div>
            <div className="flex items-center gap-2 text-gray-900">
              <ShieldCheck className="size-4 text-blue-700" />
              <h2 className="font-semibold">Security</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-gray-500">Keep your account and personal data protected.</p>
          </div>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            <button type="button" className="flex w-full items-center gap-3 py-4 text-left">
              <LockKeyhole className="size-4 text-gray-500" />
              <span className="flex-1">
                <span className="block text-sm font-medium text-gray-800">Change password</span>
                <span className="mt-1 block text-xs text-gray-500">Update your account password.</span>
              </span>
              <ChevronRight className="size-4 text-gray-400" />
            </button>
            <button type="button" className="flex w-full items-center gap-3 py-4 text-left">
              <CircleHelp className="size-4 text-gray-500" />
              <span className="flex-1">
                <span className="block text-sm font-medium text-gray-800">Help & support</span>
                <span className="mt-1 block text-xs text-gray-500">Find answers or get in touch with us.</span>
              </span>
              <ChevronRight className="size-4 text-gray-400" />
            </button>
          </div>
        </section>

       
      </div>
    </main>
  )
}

export default Settings