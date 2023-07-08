import Image from "next/image";
import Link from "next/link";
import { ThreadsAPI, ThreadsUser } from "threads-api";

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
  const { full_name, hd_profile_pic_versions, biography, bio_links } = profile;
  const picture =
    hd_profile_pic_versions.length > 1
      ? hd_profile_pic_versions[1]
      : hd_profile_pic_versions[0];

  return (
    <div>
      {id !== "-1" ? (
        <div>
          <div className="p-2 md:border border-grey-500 rounded-md mt-3 shadow-lg w-11/12 md:w-fit m-auto">
            <div className="flex flex-col md:flex-row md:w-fit m-auto">
              <Image
                src={`https://quickchart.io/qr?text=https://www.threads.net/@${params.username}&dark=EA7C14&margin=1&format=png&ecLevel=H&size=400`}
                alt="profile pic"
                width={300}
                height={300}
                className="w-[65%] md:w-[300px] m-auto md:m-0"
              />
              <div className="mt-3">
                <Image
                  src={picture.url}
                  alt="profile pic"
                  width={picture.width}
                  height={picture.height}
                  className="rounded-full w-[65%] m-auto"
                />
                <p className="text-2xl text-center w-10/12 m-auto">
                  {profile.full_name}
                </p>
                <p
                  className={`text-center m-auto ${
                    full_name ? "text-xl" : "text-2xl mt-3"
                  }`}
                >
                  @{params.username}
                </p>
              </div>
            </div>
            <p className="whitespace-pre-wrap mt-3 w-fit m-auto">{biography}</p>
            {bio_links.map((link) => (
              <p className="mt-3 w-fit m-auto text-blue-500 underline">
                <Link href={link.url}>
                  {link.url.split("/").slice(2).join("/")}
                </Link>
              </p>
            ))}
          </div>
        </div>
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
