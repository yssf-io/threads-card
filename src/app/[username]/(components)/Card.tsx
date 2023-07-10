"use client";
import Link from "next/link";
import Image from "next/image";
import { ThreadsUser } from "threads-api";

function splitByMention(input: string): { value: string; mention: boolean }[] {
  let result: { value: string; mention: boolean }[] = [];
  let parts = input.split(/(@\w+)/g);

  parts.forEach((part) => {
    if (part) {
      let isMention = part.startsWith("@");
      result.push({ value: part, mention: isMention });
    }
  });

  return result;
}

export const Card = ({
  username,
  full_name,
  bio_links,
  biography,
  hd_profile_pic_versions,
}: ThreadsUser) => {
  const picture =
    hd_profile_pic_versions.length > 1
      ? hd_profile_pic_versions[1]
      : hd_profile_pic_versions[0];

  return (
    <div>
      <div
        id="card"
        className="p-2 md:border border-grey-500 rounded-md mt-3 shadow-lg w-11/12 md:w-fit m-auto"
      >
        <div className="flex flex-col md:flex-row md:w-fit m-auto">
          <Image
            src={`https://quickchart.io/qr?text=https://www.threads.net/@${username}&dark=EA7C14&margin=1&format=png&ecLevel=H&size=400`}
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
            <p className="text-2xl text-center w-10/12 m-auto">{full_name}</p>
            <p
              className={`text-center m-auto ${
                full_name ? "text-xl" : "text-2xl mt-3"
              }`}
            >
              <a
                className="text-blue-500 underline"
                href={`https://threads.net/@${username}`}
              >
                @{username}
              </a>
            </p>
          </div>
        </div>
        <p className="whitespace-pre-wrap mt-3 w-fit m-auto">
          {splitByMention(biography).map(({ value, mention }) => (
            <span>
              {mention ? (
                <a
                  className="text-blue-500 underline"
                  href={`https://threads.net/${value}`}
                >
                  {value}
                </a>
              ) : (
                value
              )}
            </span>
          ))}
        </p>

        {bio_links.map((link) => (
          <p className="mt-3 w-fit m-auto text-blue-500 underline">
            <Link href={link.url}>
              {link.url.split("/").slice(2).join("/")}
            </Link>
          </p>
        ))}
      </div>
    </div>
  );
};
