import BootScreen from "@/components/about/bootScreen";

const bootLines = [
  "Initializing profile operating system...",
  "Loading professional identity modules...",
  "Mounting work, stack, and impact directories...",
  "Checking command-driven navigation...",
  "Starting candidate brief service...",
  "Opening Karobia workstation...",
  "System ready.",
];

export default function Page() {
  return <BootScreen bootLines={bootLines} />;
}
