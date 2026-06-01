import { getPosters } from "@/app/actions/posters";
import { PostersClient } from "./PostersClient";

export const dynamic = "force-dynamic";

export default async function ContentAdmin() {
  const posters = await getPosters();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display text-primary">Posters and stuff</h1>
        <p className="text-muted-foreground mt-1">Manage the images displayed in the Gallery section.</p>
      </div>

      <PostersClient initialPosters={posters} />
    </div>
  );
}
