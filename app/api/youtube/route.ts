import { NextRequest, NextResponse } from "next/server";

// @typescript-eslint/no-unused-vars
type RequestInput = {
  youtubeLink: string;
  timestamp?: number;
  hourtimestamp: number;
  minutetimestamp: number;
  secondtimestamp: number;
};
const youtubeLinkPattern =
  // /^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/;
  /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|v\/|\S*?v=))([A-Za-z0-9_-]{11})/;

const linkWithTimestamp =
  /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(&.+)?$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      youtubeLink,
      hourtimestamp,
      minutetimestamp,
      secondtimestamp,
    }: RequestInput = body;

    if (!youtubeLink) {
      return NextResponse.json(
        { error: "YouTube link is required" },
        { status: 400 },
      );
    }

    if (youtubeLinkPattern.test(youtubeLink)) {
      const cleanLink = cleanYoutubeLink(youtubeLink);
      console.log(cleanLink);
      const timeInSeconds =
        hourtimestamp * 3600 + minutetimestamp * 60 + secondtimestamp;

      const newLink = `${cleanLink}&t=${timeInSeconds}`;

      return NextResponse.json({
        message: "YouTube link received successfully",
        link: newLink,
      });
      // }
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" + error },
      { status: 500 },
    );
  }
}

const cleanYoutubeLink = (youtubeLink: string): string => {
  // i guess turn timestamp to number but just stringfy it to string it here and then convert it back
  const cleanLink = youtubeLink.split("&t=")[0];
  return linkWithTimestamp.test(youtubeLink) ? cleanLink : youtubeLink;
};

// 1. Single regex that handles many formats (including optional parameters)
// (?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|v\/|\S*?v=))([A-Za-z0-9_-]{11})(?:[?&].*)?

// Supports both youtube.com and youtu.be.

// Captures the 11-character video ID.

// Allows trailing query parameters.

// CodeEase
// Stack Overflow

// 2. Simpler but still effective for /watch?v= and optional &...
// /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{11})(&.+)?$/

// Ensures the video ID is exactly 11 characters.

// Allows optional trailing parameters (like &t=250s).

// Latenode Official Community

// 3. Comprehensive StackOverflow favorite
// ^(?:https?:)?\/\/(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w\-]{11})(?:[&\?].*)?$

// Handles various YouTube forms: watch, embed, v, youtu.be, plus optional extra parameters.

// To validate URLs like https://www.youtube.com/watch?v=SXnHqFGLNxA&t=250s, I’d recommend this pattern:

// /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})(?:[?&].*)?$/
