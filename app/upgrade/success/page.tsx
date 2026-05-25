import Link from "next/link";
import { IconCircleCheck } from "@tabler/icons-react";

export default function UpgradeSuccess() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-4 text-center px-4">
      <span className="size-12 rounded-full bg-surface-2 flex items-center justify-center">
        <IconCircleCheck size={24} className="text-green-500" />
      </span>
      <div>
        <h2 className="text-lg font-semibold text-foreground">
          You&apos;re on Pro!
        </h2>
        <p className="text-sm text-muted mt-1">
          Your plan has been upgraded. All Pro tools are now unlocked.
        </p>
      </div>
      <Link
        href="/tools/sql"
        className="px-4 py-2 rounded-lg bg-brand text-white text-sm font-medium hover:opacity-90 transition-opacity no-underline"
      >
        Try SQL Formatter
      </Link>
    </div>
  );
}
