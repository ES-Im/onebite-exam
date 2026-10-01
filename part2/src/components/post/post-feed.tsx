import { usePostsData } from "@/hooks/queries/use-posts-data";
import Fallback from "../fallback";
import Loader from "../loader";
import PostItem from "./post-item";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import { useInfinitePostData } from "@/hooks/queries/use-infinite-posts-data";

export default function PostFeed() {
  const { data, error, isPending, fetchNextPage, isFetchingNextPage } =
    useInfinitePostData();
  const { ref, inView } = useInView();

  useEffect(() => {
    console.log(inView); // 하단 감지되면 true 표시된다
    if (inView) fetchNextPage();
  }, [inView]);

  if (error) return <Fallback />;
  if (isPending) return <Loader />;

  return (
    <div className="flex flex-col gap-10">
      {/* 2차원에 맞게 map */}
      {data.pages.map((page) =>
        page.map((post) => <PostItem key={post.id} {...post} />),
      )}
      {isFetchingNextPage && <Loader />}
      <div ref={ref}></div>
    </div>
  );
}
