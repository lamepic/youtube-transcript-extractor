"use server";

export async function getTrascript(url: string) {
  try {
    const value = new URL(url);
    const videoId = value.searchParams.get("v");

    if (videoId) {
      const res = await fetch(
        `${process.env.SITE_URL}/api?video_id=${videoId}`
      );
      const data = await res.json();
      return data;
    }

    throw new Error("Invalid URL");
  } catch (error) {
    throw new Error(JSON.stringify({ message: "Could not fetch Transcript" }));
  }
}
