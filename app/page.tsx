"use client";
import Input from "@/components/Input";
import { Container } from "../components/container";
import { useState } from "react";
import { toast, Toaster } from "sonner";

export default function Home() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [htimestamp, setHTimestamp] = useState(0);
  const [mtimestamp, setMTimestamp] = useState(0);
  const [stimestamp, setSTimestamp] = useState(0);
  const [newLink, setNewLink] = useState("");

  const ytLinkPattern =
    /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?v=|embed\/|v\/|\S*?v=))([A-Za-z0-9_-]{11})(?:[?&].*)?$/;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${htimestamp}:${mtimestamp}:${stimestamp}`);
    try {
      const h = htimestamp || 0;
      const m = mtimestamp || 0;
      const s = stimestamp || 0;
      const timestamp = h + m + s;
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
    <div className="bg flex min-h-screen flex-col justify-center bg-neutral-900">
      <Toaster />
      <Container className="">
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
  );
}
