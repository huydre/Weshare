"use client";
import { Form } from "@/interfaces/interface";
import Image from "next/image";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { BsFillImageFill } from "react-icons/bs";
import Link from "next/link";
import { login, register } from "@/services/auth";
import toast, { Toaster } from "react-hot-toast";
import { loginRedux } from "@/redux/reducers/auth.slice";
import { useAuth } from "@/hooks/useAuth";
import { Button, Input, Textarea } from "@nextui-org/react";

export const AuthForm = ({ process }: { process: string }) => {
  const [form, setForm] = useState<Form>({});
  const [image, setImage] = useState<File>();
  const [prevImage, setPrevImage] = useState();
  const imgRef = useRef<HTMLInputElement>(null);

  const { dispatch, pathname, router, authChecked } = useAuth();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);

    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files![0]);

    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pathname === "/login") {
      try {
        const { message, user } = await login(form);
        toast.success(message, { duration: 1000 });
        dispatch(loginRedux(user));

        setTimeout(() => {
          toast.dismiss();
          router.push("/");
        }, 1500);
      } catch (error: any) {
        toast.error(error.response.data.message, { duration: 2500 });
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("email", form.email);
        formData.append("first_name", form.first_name || "");
        formData.append("last_name", form.last_name || "");
        formData.append("bio", form.bio || "");
        formData.append("image", image!);

        const { data, status } = await register(formData);
        if (status === 201) {
          const user = { username: data.username, password: form.password };
          const { user: loggedUser } = await login(user);
          dispatch(loginRedux(loggedUser));
          toast.success("Successfully registered", { duration: 1000 });

          setTimeout(() => {
            toast.dismiss();
            router.push("/");
          }, 1500);
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.response.data.message, { duration: 2500 });
      }
    }
  };
  return (
    <>
      {authChecked ? (
        <div className="flex h-screen ">
          <div className="w-1/2 relative">
            <Image
              src="/login-bg.png"
              alt="bg"
              fill
              className="z-0"
              style={{
                objectFit: "cover",
              }}
            />
            <div className="z-10 absolute flex items-center justify-center h-full w-full">
               <div className="flex flex-col justify-center space-y-4">
                  <h1 className="text-5xl font-bold">Welcome to Weshare</h1>
                  <p>Share everything</p>
               </div>
            </div>
          </div>

          <div className="flex items-center justify-center w-1/2 bg-white dark:dark:bg-neutral-900">
            <form
              className="flex flex-col justify-center gap-y-4 text-black w-2/3 dark:text-white"
              onSubmit={handleSubmit}
            >
              <h1 className="text-4xl font-bold ">{process}</h1>
              {process === "Login" && (
                <p className="text-gray-400 text-sm font-medium py-4">
                  Welcome! Please confirm that you are visiting <br />{" "}
                  https://weshare.com
                </p>
              )}
              <Input
                type="text"
                label="Username"
                name="username"
                required
                autoFocus
                onChange={handleChange}
              />
              <Input
                type="password"
                label="Password"
                name="password"
                required
                onChange={handleChange}
              />

              {pathname === "/register" && (
                <>
                  <Input
                    type="email"
                    label="Email"
                    name="email"
                    className="input"
                    required
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    label="First Name"
                    name="first_name"
                    className="input"
                    onChange={handleChange}
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    name="last_name"
                    className="input"
                    onChange={handleChange}
                  />
                  <Textarea
                    label="Bio ..."
                    name="bio"
                    rows={5}
                    className="input resize-none"
                    onChange={handleChange}
                  />

                  <input
                    type="file"
                    className="hidden"
                    name="image"
                    required
                    onChange={fileSelected}
                    ref={imgRef}
                  />

                  {image === undefined && (
                    <BsFillImageFill
                      className="inputImage"
                      onClick={() => imgRef.current?.click()}
                    />
                  )}

                  {prevImage && (
                    <div className="w-full max-w-[80px] h-[80px] self-end mr-5 top-8 absolute">
                      <Image
                        src={prevImage}
                        alt="prevImage"
                        fill
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="/blur.svg"
                        sizes="(max-width:80px) 100vw"
                        className="rounded-full object-cover cursor-pointer"
                        onClick={() => imgRef.current?.click()}
                      />
                    </div>
                  )}
                </>
              )}

              {pathname === "/login" ? (
                <Link
                  href={"/register"}
                  className="text-[13px] font-semibold text-blue-600 self-end"
                >
                  No account? Register here
                </Link>
              ) : (
                <Link
                  href={"/login"}
                  className="text-[13px] font-semibold text-blue-600 self-end"
                >
                  Already have an account? Login here
                </Link>
              )}

              <Button color="primary" size="lg">
                <button className="w-full">{process}</button>
              </Button>
            </form>
          </div>
          <Toaster />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
