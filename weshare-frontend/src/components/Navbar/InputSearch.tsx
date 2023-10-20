import { useAppDispatch } from "@/redux/hooks";
import { usersRedux } from "@/redux/reducers/user.slice";
import { userSearch } from "@/services/user";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { BsSearch } from "react-icons/bs";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "../icon/Search";

export const InputSearch = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();

    const { results } = await userSearch(e.target.elements[0].value);
    dispatch(usersRedux(results));

    e.target.elements[0].value = "";
    router.push("/search");
  };
  return (
    <div className="w-[750px] py-0 px-[15px]">
      <form className="w-full" onSubmit={handleSubmit}>
        <Input
          isClearable
          radius="md"
          placeholder="Search..."
          startContent={
            <SearchIcon className="text-black/50 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
          }
        />
      </form>
    </div>
  );
};
