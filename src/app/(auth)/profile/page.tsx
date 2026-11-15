
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClient from "@/components/ProfileClient";

export const instant = false;

const Profilepage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const { user } = session;

    return (
        <ProfileClient
            user={{
                name: user.name,
                email: user.email,
                image: user.image,
            }}
        />
    );
};

export default Profilepage;


