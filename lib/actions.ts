"use server";

export async function getTrascript(url: string) {
  try {
    const value = new URL(url);
    const videoId = value.searchParams.get("v");

    const res = await fetch(`http://localhost:3000/api?video_id=${videoId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(JSON.stringify({ message: "Could not fetch Transcript" }));
  }
}
