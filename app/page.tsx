"use client";
import Input from "@/app/components/Input";
import { Container } from "./components/container";
import { useState } from "react";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import GitHubButton from "./components/githubButton";

export default function Home() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [htimestamp, setHTimestamp] = useState(0);
  const [mtimestamp, setMTimestamp] = useState(0);
  const [stimestamp, setSTimestamp] = useState(0);
  const [newLink, setNewLink] = useState("");

  const ytLinkPattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|v\/|\S*?v=))([A-Za-z0-9_-]{11})(?:[?&].*)?$/;
  const fromSchema = z.object({
    youtubeLink: z.url({
      pattern: ytLinkPattern,
      error: "Enter a Youtube URL",
    }),
    htimestamp: z
      .number({ error: "Enter a valid hour timestamp" })
      .min(0)
      .max(59)
      .optional(),
    mtimestamp: z
      .number({ error: "Enter a valid minute timestamp" })
      .min(0)
      .optional(),
    stimestamp: z
      .number({ error: "Enter a valid second timestamp" })
      .min(0)
      .optional(),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${htimestamp}:${mtimestamp}:${stimestamp}`);
    try {
      const h = htimestamp || 0;
      const m = mtimestamp || 0;
      const s = stimestamp || 0;
      const timestamp = h + m + s;
      // if (!ytLinkPattern.test(youtubeLink)) {
      //   toast.error("Enter a YouTube link");
      //   return;
      // }
      const result = fromSchema.safeParse({
        youtubeLink,
        htimestamp,
        mtimestamp,
        stimestamp,
      });
      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }

      if (!ytLinkPattern.test(youtubeLink)) {
        toast.error("Enter a YouTube link");
        return;
      }
      const response = await fetch("/api/youtube", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubeLink,
          // timestamp,
          hourtimestamp: htimestamp,
          minutetimestamp: mtimestamp,
          secondtimestamp: stimestamp,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data);
        toast.error(data.error || "Something went wrong");
        throw new Error(data.error || "Something went wrong");
      }
      setNewLink(data.link);
    } catch (error) {
      console.error("Error submitting link:", error);
    }
  };

  return (
    // <div className="flex min-h-screen flex-col">
    <div className="flex min-h-screen flex-col bg-neutral-900 p-2">
      <Container>
        {/* <div className="flex h-[5rem] min-w-[10rem] items-center justify-center bg-orange-400 text-center text-lg font-bold text-neutral-900">
          Bookmark Me
        </div> */}
        <GitHubButton />
      </Container>
      <div className="flex flex-1 flex-col justify-center">
        <Container>
          <form
            onSubmit={handleSubmit}
            className="flex grid-cols-1 justify-center gap-2"
          >
            <Input
              placeholder="Paste your link"
              // zod validation for not adding more than 3 digits
              type="text"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="relative min-w-2xl rounded-xl border-2 border-dashed border-neutral-800 p-2 text-neutral-400 placeholder:text-neutral-400 focus:border-0 focus:ring-1 focus:ring-neutral-800 focus:outline-none"
            />
            <Input
              placeholder="Hour"
              type="text"
              value={htimestamp}
              onChange={(e) => setHTimestamp(Number(e.target.value))}
              className="relative max-w-[5rem] rounded-xl border-2 border-dashed border-neutral-800 p-2 text-neutral-400 placeholder:text-sm placeholder:text-neutral-400 focus:border-0 focus:ring-1 focus:ring-neutral-800 focus:outline-none"
            />
            <Input
              placeholder="Minute"
              type="text"
              value={mtimestamp}
              onChange={(e) => setMTimestamp(Number(e.target.value))}
              className="relative max-w-[5rem] rounded-xl border-2 border-dashed border-neutral-800 p-2 text-neutral-400 placeholder:text-sm placeholder:text-neutral-400 focus:border-0 focus:ring-1 focus:ring-neutral-800 focus:outline-none"
            />
            <Input
              placeholder="Second"
              type="text"
              value={stimestamp}
              onChange={(e) => setSTimestamp(Number(e.target.value))}
              className="relative max-w-[5rem] rounded-xl border-2 border-dashed border-neutral-800 p-2 text-neutral-400 placeholder:text-sm placeholder:text-neutral-400 focus:border-0 focus:ring-1 focus:ring-neutral-800 focus:outline-none"
            />
            <button
              id="submit"
              type="submit"
              className="cursor-submit my-2 rounded-xl bg-neutral-800 p-2 text-white"
            >
              Submit
            </button>
          </form>
          {newLink && (
            <div className="mt-4">
              <a
                href={newLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {newLink}
              </a>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}
