"use server";

export async function getTrascript(
  prevState: { message: string },
  formData: FormData
) {
  try {
    const value = formData?.get("url") as string;
    const url = new URL(value);
    const video_id = url.searchParams.get("v");

    const res = await fetch(`http://localhost:3000/api?video_id=${video_id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    return { message: "Could not fetch Transcript" };
  }
}
