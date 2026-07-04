import { User, Bell, Shield, PaintBucket } from "lucide-react";

export function Settings() {
  return (
    <div className="p-8 pb-24 h-full flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and dashboard preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/20 text-primary font-medium text-left">
            <User className="w-5 h-5" /> Account
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors text-left">
            <Bell className="w-5 h-5" /> Notifications
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors text-left">
            <PaintBucket className="w-5 h-5" /> Appearance
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-colors text-left">
            <Shield className="w-5 h-5" /> Security
          </button>
        </div>

        <div className="md:col-span-3 glass p-8 rounded-3xl flex flex-col gap-8">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white">
                OP
              </div>
              <div>
                <h3 className="font-medium text-lg">Operator Name</h3>
                <p className="text-muted-foreground">operator@windsphere.ai</p>
                <div className="flex gap-3 mt-3">
                  <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium">Change Avatar</button>
                  <button className="px-4 py-2 rounded-lg text-red-alert hover:bg-red-alert/10 transition-colors text-sm font-medium">Remove</button>
                </div>
              </div>
            </div>

            <hr className="border-white/10" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">First Name</label>
                <input type="text" defaultValue="John" className="bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-muted-foreground">Last Name</label>
                <input type="text" defaultValue="Doe" className="bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <input type="email" defaultValue="operator@windsphere.ai" className="bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground" />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="bg-primary hover:bg-primary/80 text-primary-foreground px-6 py-2.5 rounded-lg font-medium transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
