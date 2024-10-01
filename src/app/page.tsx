import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="fixed flex ">
      <Input type="url" placeholder="url" />
      <Input type="url" placeholder="short url" />
    </div>
  );
}
