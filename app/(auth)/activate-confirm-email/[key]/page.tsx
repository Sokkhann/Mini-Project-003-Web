"use client"
import { Button } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Props = {
    params: {
        key: string;
    };
    searchParams: any;
};

export default function ConfirmEmail(props: Props) {
    const route = useRouter();

    useEffect(() => {
        // Function to confirm email with the provided key
        const confirmEmail = async () => {
            try {
                // Make an API call to confirm the email with the provided key
                const response = await fetch(`/api/confirm-email?key=${props.params.key}`);
                if (response.ok) {
                    // Email confirmed successfully
                    console.log("Email confirmed successfully!");
                } else {
                    // Handle error response
                    console.error("Failed to confirm email:", response.statusText);
                }
            } catch (error) {
                console.error("Error confirming email:", error);
            }
        };

        // Call the confirmEmail function when the component mounts
        confirmEmail();
    }, [props.params.key]); // Ensure useEffect runs when the key changes

    return (
        <main>
            {/* Confirm Email Card */}
            <section className="flex flex-col items-center">
                <h1>This is Confirm Email Section</h1>
                <Button onClick={() => route.push("/login")}>Click Here to Confirm</Button>
            </section>
        </main>
    );
}
