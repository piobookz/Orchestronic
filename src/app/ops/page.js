import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./actions";

export default async function Ops() {
    const client = await clerkClient();
    const users = (await client.users.getUserList()).data;

    return (
        <>
            {users.map((user) => {
                return (
                    <div
                        key={user.id}
                        className={`flex items-center justify-between gap-4 p-4 ${
                            users.indexOf(user) % 2 === 0
                                ? "bg-neutral-50 dark:bg-neutral-800"
                                : "bg-white dark:bg-neutral-900"
                        }`}
                    >
                        <div className="flex gap-8">
                            <div className="text-black">
                                {user.firstName} {user.lastName}
                            </div>

                            <div className="text-black">
                                {
                                    user.emailAddresses.find(
                                        (email) => email.id === user.primaryEmailAddressId
                                    )?.emailAddresses
                                }
                            </div>

                            <div className="text-black">
                                {user.publicMetadata.role}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <form action={setRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="dev" name="role" />
                                <button
                                    type="submit"
                                    className="px-2 py-1 text-sm text-black border border-neutral-300"
                                >
                                    Make Dev
                                </button>
                            </form>

                            <form action={setRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="pm" name="role" />
                                <button
                                    type="submit"
                                    className="px-2 py-1 text-sm text-black border border-neutral-300"
                                >
                                    Make PM
                                </button>
                            </form>

                            <form action={setRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <input type="hidden" value="ops" name="role" />
                                <button
                                    type="submit"
                                    className="px-2 py-1 text-sm text-black border border-neutral-300"
                                >
                                    Make Ops
                                </button>
                            </form>

                            <form action={removeRole} className="inline">
                                <input type="hidden" value={user.id} name="id" />
                                <button
                                    type="submit"
                                    className="px-2 py-1 text-sm text-black border border-neutral-300"
                                >
                                    Remove Role
                                </button>
                            </form>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
