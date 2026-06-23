import BootScreen from "@/components/about/bootScreen";

const bootLines = [
  "Booting Karobia Terminal...",
  "Checking window chrome, translucency, and focus state...",
  "Loading portfolio modules: about, skills, education, projects...",
  "Preparing quick actions: help, launch, coffee, contact...",
  "Handing control to the shell...",
  "Session ready.",
];

export default function Page() {
  return <BootScreen bootLines={bootLines} />;
}
