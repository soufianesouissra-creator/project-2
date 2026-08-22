export type DownloadItem = {
  name: string;
  /** Path under /public/docs, absent while the PDF does not exist yet. */
  href?: string;
  pendingLabel: string;
};

/** Fiches techniques and attestations. Entries without a file state it. */
export function DownloadList({ items }: { items: DownloadItem[] }) {
  return (
    <ul className="divide-y divide-granulat border-y border-granulat">
      {items.map((item) => (
        <li key={item.name}>
          {item.href ? (
            <a
              href={item.href}
              className="flex items-baseline justify-between gap-4 py-3 hover:bg-granulat/30"
              download
            >
              <span className="text-16 font-medium">{item.name}</span>
              <span className="font-mono text-12 uppercase tracking-[0.08em] text-chaud-encre">
                PDF ↓
              </span>
            </a>
          ) : (
            <div className="flex items-baseline justify-between gap-4 py-3 opacity-60">
              <span className="text-16">{item.name}</span>
              <span className="font-mono text-12 uppercase tracking-[0.08em]">
                {item.pendingLabel}
              </span>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
