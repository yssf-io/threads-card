import Link from "next/link";
import { ThreadsAPI, ThreadsUser } from "threads-api";
import { Card } from "./(components)/Card";

const mockUser: ThreadsUser = {
  is_private: false,
  profile_pic_url: "",
  username: "",
  hd_profile_pic_versions: [],
  is_verified: false,
  biography: "",
  biography_with_entities: "",
  follower_count: 0,
  profile_context_facepile_users: "",
  bio_links: [],
  pk: "",
  full_name: "",
  id: "",
};

async function getData(
  username: string
): Promise<{ id: string; profile: ThreadsUser; qrcode?: string }> {
  const threads = new ThreadsAPI();
  const id = await threads.getUserIDfromUsername(username);

  if (!id) {
    return { id: "-1", profile: mockUser };
  }

  const profile = await threads.getUserProfile(username, id);

  return { id, profile };
}

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const { id, profile } = await getData(params.username);

  return (
    <div>
      {id !== "-1" ? (
        <Card {...profile} />
      ) : (
        <div className="flex flex-col h-screen align-middle justify-center">
          <p className="text-center text-3xl font-light">
            This user does not exist
          </p>
          <p className="text-center text-xl underline cursor-pointer">
            <Link href="/">Back</Link>
          </p>
        </div>
      )}

      <p className="text-center underline cursor-pointer text-3xl mt-16 font-light">
        <Link href="/">Back</Link>
      </p>
    </div>
  );
}
