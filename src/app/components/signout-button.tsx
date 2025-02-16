import { signOut } from "auth";

export function SignOutButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({ redirectTo: "/signin" });
      }}
    >
      <button
        type="submit"
        className="text-white hover:text-[#07032B] hover:bg-[rgba(255,255,255,0.85)] rounded px-2 py-1 transition duration-300"
      >
        Sign Out
      </button>
    </form>
  );
}
