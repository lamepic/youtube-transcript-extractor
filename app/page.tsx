export default function Home() {
  return (
    <main className="w-7/12 mx-auto flex flex-col items-center justify-center gap-10">
      <h1 className="mt-20 text-center text-4xl font-semibold">
        Youtube Trascript Extractor
      </h1>

      <form className="w-10/12">
        <div className="border flex items-center overflow-hidden rounded-md">
          <label htmlFor="url" className="px-5 py-3 bg-slate-400/40">
            URL
          </label>
          <input
            name="url"
            type="text"
            className="w-full outline-1 outline-slate-400 py-3"
          />
        </div>
      </form>

      <div className="mt-5 text-justify p-2 max-h-[500px] overflow-scroll leading-7"></div>
    </main>
  );
}
