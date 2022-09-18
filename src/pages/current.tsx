import Album from "../components/Album";

import { trpc } from "../utils/trpc";

function Current() {
  let { data, isLoading } = trpc.useQuery(["album.updateCurrent"]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!data) {
    return <div>There are no albums</div>;
  }

  return (
    <div>
      <div className="pt-20">
        <Album album={data.album} />
      </div>
    </div>
  );
}

export default Current;
