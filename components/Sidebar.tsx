"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { IconLogin, IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import {
  IconBraces,
  IconTransform,
  IconDatabase,
  IconFileCode,
  IconLink,
  IconCode,
  IconFingerprint,
  IconHash,
  IconLock,
  IconRegex,
  IconFileDiff,
  IconClock,
  IconTools,
  IconSearch,
} from "@tabler/icons-react";

const nav = [
  {
    section: "Formatters",
    items: [
      { id: "json", label: "JSON Formatter", icon: IconBraces },
      { id: "yaml", label: "YAML ↔ JSON", icon: IconTransform },
      { id: "sql", label: "SQL Formatter", icon: IconDatabase, pro: true },
    ],
  },
  {
    section: "Encoders",
    items: [
      { id: "base64", label: "Base64 Encoder/Decoder", icon: IconFileCode },
      { id: "url", label: "URL Encoder/Decoder", icon: IconLink },
      { id: "html", label: "HTML Encoder/Decoder", icon: IconCode },
    ],
  },
  {
    section: "Generators",
    items: [
      { id: "uuid", label: "UUID Generator", icon: IconFingerprint },
      { id: "hash", label: "Hash Generator", icon: IconHash },
    ],
  },
  {
    section: "Tools",
    items: [
      { id: "jwt", label: "JWT Decoder", icon: IconLock },
      { id: "regex", label: "Regex Tester", icon: IconRegex },
      { id: "diff", label: "Diff Checker", icon: IconFileDiff },
      { id: "timestamp", label: "Timestamp Converter", icon: IconClock },
    ],
  },
];

function SidebarUser() {
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  if (!session) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 px-[14px] py-2 text-[13px] text-muted hover:text-foreground transition-colors no-underline"
      >
        <IconLogin size={15} className="shrink-0" />
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2 px-[14px] py-2">
      {session.user?.image ? (
        <Image
          src={session.user.image}
          alt=""
          width={22}
          height={22}
          className="rounded-full shrink-0"
        />
      ) : (
        <span className="size-[22px] rounded-full bg-brand flex items-center justify-center text-white text-[10px] font-medium shrink-0">
          {session.user?.name?.[0]?.toUpperCase() ?? "?"}
        </span>
      )}
      <span className="flex-1 truncate text-[12px] text-foreground">
        {session.user?.name ?? session.user?.email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-muted hover:text-foreground transition-colors"
        title="Sign out"
      >
        <IconLogout size={14} />
      </button>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] shrink-0 bg-surface-2 border-r border-r-edge-subtle flex flex-col overflow-hidden">
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-3 text-[15px] font-medium border-b border-b-edge-subtle no-underline text-inherit"
      >
        <span className="size-[26px] rounded-[7px] bg-brand flex items-center justify-center text-white shrink-0">
          <IconTools size={14} />
        </span>
        DevUtils
      </Link>

      <button
        onClick={() =>
          window.dispatchEvent(
            new KeyboardEvent("keydown", {
              key: "k",
              ctrlKey: true,
              bubbles: true,
            }),
          )
        }
        className="flex items-center gap-2 px-[14px] py-2 border-b border-b-edge-subtle text-xs text-muted hover:text-foreground hover:bg-surface transition-colors cursor-pointer w-full"
      >
        <IconSearch size={13} className="shrink-0" />
        <span className="flex-1 text-left">Search tools</span>
        <kbd className="text-[10px] border border-edge rounded px-1 py-px">
          ⌘ K
        </kbd>
      </button>

      <div className="flex-1 overflow-y-auto">
        {nav.map(({ section, items }) => (
          <div key={section}>
            <p className="text-[10px] font-medium tracking-[.08em] uppercase text-subtle px-[14px] pt-2 pb-1">
              {section}
            </p>
            {items.map(({ id, label, icon: Icon, pro }) => {
              const href = `/tools/${id}`;
              const active = pathname === href;
              return (
                <Link
                  key={id}
                  href={href}
                  className={`
                    flex items-center gap-2 py-1.5 text-[13px] no-underline
                    border-l-2 transition-colors
                    ${
                      active
                        ? "pl-3 pr-[14px] text-foreground font-medium border-l-brand"
                        : "px-[14px] text-muted border-l-transparent hover:text-foreground"
                    }
                  `}
                >
                  <Icon size={15} className="shrink-0" />
                  {label}
                  {pro && (
                    <span className="ml-auto text-[9px] font-medium px-[5px] py-px rounded bg-[#EEEDFE] text-brand">
                      Pro
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
      <div className="border-t border-t-edge-subtle">
        <SidebarUser />
        <ThemeToggle />
      </div>
    </aside>
  );
}
