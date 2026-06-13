import BootScreen from "@/components/about/bootScreen";

const bootLines = [
  "Initializing system...",
  "Checking memory...",
  "Loading kernel modules...",
  "Mounting filesystem...",
  "Starting developer environment...",
  "Booting karobia.dev shell...",
  "System ready.",
];

export default function Page() {
  return <BootScreen bootLines={bootLines} />;
}
