export const PostDescription = ({ description }: { description: string }) => {
    return (
        description.split('\n').map((line) => (
            <p className="my-[5px] text-[15px] text-black dark:text-white">{line}</p>
        ))
    )
 };
 