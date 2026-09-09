import type { IpData, LookupStatus } from "../types/ip";

interface InfoPanelProps {
  data: IpData | null;
  status: LookupStatus;
}

interface Field {
  label: string;
  value: string;
  mono?: boolean;
}

function SkeletonField({ label }: { label: string }) {
  return (
    <div className="flex flex-1 flex-col gap-2 px-6 py-6 md:py-0">
      <span className="text-xs font-semibold uppercase tracking-[0.14em] text-haze">{label}</span>
      <span className="h-5 w-32 animate-shimmer rounded bg-gradient-to-r from-hairline via-white to-hairline bg-[length:400px_100%]" />
    </div>
  );
}

export default function InfoPanel({ data, status }: InfoPanelProps) {
  const isLoading = status === "loading" && !data;

  const fields: Field[] = data
    ? [
        { label: "ip address", value: data.ip, mono: true },
        {
          label: "location",
          value: [data.city, data.region].filter(Boolean).join(", ") + (data.postal ? ` ${data.postal}` : ""),
        },
        { label: "timezone", value: data.timezone ? `UTC ${data.timezone}` : "—", mono: true },
        { label: "isp", value: data.isp },
      ]
    : [];

  return (
    <div
      className={`relative z-20 mx-auto -mb-16 w-full max-w-5xl rounded-2xl bg-white/95 backdrop-blur px-2 py-2 shadow-2xl shadow-signal-deep/30 md:px-0 ${
        data ? "animate-rise-in" : ""
      }`}
    >
      <div className="flex flex-col divide-y divide-hairline md:flex-row md:divide-x md:divide-y-0">
        {isLoading
          ? ["ip address", "location", "timezone", "isp"].map((label) => <SkeletonField key={label} label={label} />)
          : fields.map((field) => (
              <div key={field.label} className="flex flex-1 flex-col gap-1.5 px-6 py-6 md:py-8">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-haze">{field.label}</span>
                <span
                  className={`text-lg font-semibold leading-snug text-ink md:text-xl ${
                    field.mono ? "font-mono tracking-tight" : "font-display"
                  }`}
                >
                  {field.value}
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
