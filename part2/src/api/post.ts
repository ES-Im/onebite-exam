import { supabase } from "@/lib/supabase";
import { uploadImage } from "./image";
import type { PostEntity } from "@/type";

//----
export async function fetchPosts({ from, to }: { from: number; to: number }) {
  const { data, error } = await supabase
    .from("post")
    .select("*, author:profile!author_id(*)")
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) throw error;
  return data;
}

export async function createPost(content: string) {
  const { data, error } = await supabase
    .from("post")
    .insert({
      content,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createPostWithImages({
  content,
  images,
  userId,
}: {
  content: string;
  images: File[];
  userId: string;
}) {
  //1. 새로운 포스트 생성
  const post = await createPost(content);
  if (images.length === 0) return post; // image 없으면 그대로 끝내기

  // 4. 이미지 업로드 실패시 예외 처리
  try {
    // 2. 이미지 업로드 - 각 이미지 저장 병렬 처리
    const imageUrls = await Promise.all(
      images.map((image) => {
        const fileExtension = image.name.split(".").pop() || "webp";
        const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;
        const filePath = `${userId}/${post.id}/${fileName}`;

        return uploadImage({
          file: image,
          filePath,
        });
      }),
    );

    // 3. 포스트 테이블 업데이트
    const updatedPost = await updatePost({
      id: post.id,
      image_urls: imageUrls,
    });
    return updatePost;
  } catch (error) {
    deletePost(post.id);
    throw error;
  }
}

// update경우는 PUT 성질 -> 선택적 프라퍼티로 변환 필요
export async function updatePost(post: Partial<PostEntity> & { id: number }) {
  const { data, error } = await supabase
    .from("post")
    .update(post)
    .eq("id", post.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 포스트 삭제
export async function deletePost(id: number) {
  const { data, error } = await supabase
    .from("post")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
