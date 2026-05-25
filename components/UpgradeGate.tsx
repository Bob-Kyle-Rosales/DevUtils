import { createCheckoutSession } from "@/app/actions/checkout";
import { IconLock } from "@tabler/icons-react";

export default function UpgradeGate() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center px-4">
      <span className="size-12 rounded-full bg-surface-2 flex items-center justify-center">
        <IconLock size={22} className="text-brand" />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-foreground">Pro Tool</h2>
        <p className="text-sm text-muted mt-1">
          SQL Formatter is available on the Pro plan.
        </p>
      </div>
      <form action={createCheckoutSession}>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer"
        >
          Upgrade to Pro — $9 / month
        </button>
      </form>
    </div>
  );
}
