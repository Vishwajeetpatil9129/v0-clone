import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-clo items-center justify-center h-screen">
      <Button>Test</Button>
      <UserButton />
    </div>
  );
}
