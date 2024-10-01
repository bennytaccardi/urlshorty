import { Input } from "@/components/ui/input";
import { getAllItems } from "./actions/items/actions";

export default function Home() {
  (async () => {
    const t = await getAllItems();
    console.log(t);
  })();

  return (
    <div className="fixed flex ">
      <Input type="url" placeholder="url" />
      <Input type="url" placeholder="short url" />
    </div>
  );
}
