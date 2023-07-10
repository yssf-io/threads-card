import React from "react";
import { Card } from "../(components)/Card";
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

  return (
    <div>
      {id !== "-1" ? (
        <Card {...profile} />
      ) : (
        <p>There has been an error loading this resource</p>
      )}
    </div>
  );
}
