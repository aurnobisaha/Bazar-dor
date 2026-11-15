
"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import {
  Button,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
} from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      toast.error("দুটি পাসওয়ার্ড মিলছে না!");
      return;
    }

    const data = Object.fromEntries(formData.entries());

    const { data: resData, error } = await signUp.email({
      email: data.email as string,
      password: data.password as string,
      name: data.name as string,
    });
    //console.log(resData,error);
    if (error) {
      toast.error(error.message || "Account creation failed");
      return;
    }
    if (resData?.user.name) {
      toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!')
      router.push('/sign-in')
    }

    
  };
  const handleGoogleSignIn=async()=>{
     const data = await signIn.social({
    provider: "google",
  });
  console.log(data);
  };

  return (
    <main className="min-h-screen bg-[#F0F6F1] px-4 py-10">
      <div className="mx-auto max-w-md">

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-[#26382C]">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            সেবা পেতে সাইন আপ করে সব বিশেষ সুবিধা লাভ করুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#E5ECE6] bg-white p-6 shadow-sm">

          <Form
            className="flex flex-col gap-4"
            onSubmit={onSubmit}
          >
            <TextField isRequired name="name">
              <Label>নাম</Label>
              <Input placeholder="যেমন: রহিম উদ্দিন" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) =>
                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                  ? null
                  : "সঠিক ইমেইল ঠিকানা লিখুন"
              }
            >
              <Label>ইমেইল</Label>
              <Input placeholder="you@example.com" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              minLength={8}
              type="password"
              validate={(value) =>
                value.length >= 8
                  ? null
                  : "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"
              }
            >
              <Label>পাসওয়ার্ড</Label>
              <Input placeholder="কমপক্ষে ৮ অক্ষর" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="confirmPassword"
              type="password"
            >
              <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input placeholder="আবার লিখুন" />
              <FieldError />
            </TextField>

            <Button
              type="submit"
              className="w-full bg-[#078B45] font-semibold text-white hover:bg-[#06783C]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </Form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-500">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-2">

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="bordered"
              className="h-auto min-h-11 gap-2 border-gray-200 px-2 py-3 text-xs text-gray-700"
            >
              <svg viewBox="0 0 48 48" className="h-4 w-4">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" transform="translate(0 5)" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.62 5.91c4.45-4.11 7.14-10.16 7.14-17.56z" />
                <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.93 23.93 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19z" transform="translate(0 5)" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.9-5.89l-7.62-5.91c-2.12 1.42-4.83 2.25-8.28 2.25-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" transform="translate(0 -5)" />
              </svg>
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              onClick={async () => {
    const { error } = await signIn.social({
        provider: "github",
    });

    if (error) {
        toast.error("GitHub login failed!");
    }
}}
              variant="bordered"
              className="h-auto min-h-11 gap-2 border-gray-200 px-2 py-3 text-xs text-gray-700"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.08 1.83 1.23 1.83 1.23 1.07 1.83 2.81 1.3 3.5.99.11-.77.42-1.3.76-1.6-2.67-.3-5.48-1.34-5.48-5.96 0-1.32.47-2.39 1.23-3.23-.12-.3-.53-1.53.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.88.13 3.18.77.84 1.23 1.91 1.23 3.23 0 4.63-2.81 5.65-5.49 5.95.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5z" />
              </svg>
              GitHub দিয়ে চালিয়ে যান
            </Button>

          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট আছে?
            <Link
              href="/sign-in"
              className="ml-1 font-semibold text-[#078B45] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>

        </div>

        <Link
          href="/"
          className="mt-7 block text-center text-sm text-gray-500 hover:text-green-700"
        >
          ← হোম পেজে ফিরে যান
        </Link>

      </div>
    </main>
  );
}





