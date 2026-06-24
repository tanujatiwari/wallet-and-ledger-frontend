import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { apis } from "../apis/constants";
import { showToast } from "../components/ToastMessage";

export function useLogin() {
    const router = useRouter()
    const [form, setForm] = useState({
        email: '',
        password: "",
        rememberMe: false
    })

    const handleFormChange = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
        switch (e.target.name) {
            case 'email':
                setForm({
                    ...form,
                    email: e.target.value
                })
                break;
            case 'password':
                setForm({
                    ...form,
                    password: e.target.value
                })
                break;
            case 'rememberMe':
                setForm({
                    ...form,
                    rememberMe: e.target.checked
                })
                break;
        }
    }

    const handleContinueWithGoogle = async () => {
        try {
            window.location.href =
                `${process.env.NEXT_PUBLIC_API_URL}${apis.googleLogin}`

        }
        catch (err) {
            console.log({ err })
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        showToast({
            type: 'success',
            title: 'Welcome',
            subtitle: 'Successfully signed in to Ledger Pro.'
        });
        router.push("/dashboard");
    };

    return {
        handleSubmit,
        form,
        handleFormChange,
        handleContinueWithGoogle
    }
}
