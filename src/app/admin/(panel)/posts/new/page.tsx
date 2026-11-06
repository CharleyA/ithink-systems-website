import { PostEditor } from "@/components/admin/PostEditor";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">New post</h1>
      <PostEditor />
    </div>
  );
}
