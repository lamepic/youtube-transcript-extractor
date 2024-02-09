"use client";

import { fetchTrascript } from "@/lib/actions";
import { useFormState, useFormStatus } from "react-dom";

const initialState = {
  message: "",
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="py-3 px-5 border-l bg-red-600 text-white"
      disabled={pending}
    >
      {pending ? "Loading..." : "Submit"}
    </button>
  );
};

function URLForm() {
  const [state, formAction] = useFormState(fetchTrascript, initialState);

  return (
    <form className="w-10/12" action={formAction}>
      <div className="border flex items-center overflow-hidden rounded-md">
        <label htmlFor="url" className="p-3 bg-slate-50 border-r">
          URL
        </label>
        <input
          name="url"
          type="text"
          className="w-full outline-1 outline-slate-400 py-3 pl-1"
        />
        <SubmitButton />
      </div>
      {state?.message ? (
        <div className="text-red-600 text-sm mt-1">{state?.message}</div>
      ) : null}
    </form>
  );
}

export default URLForm;
