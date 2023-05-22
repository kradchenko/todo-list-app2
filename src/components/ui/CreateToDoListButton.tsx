import { ReactComponent as PlusIcon } from 'assets/plus.svg';

interface CreateToDoListButtonnProps {
    onClick: () => void;
}

export const CreateToDoListButton = ({ onClick }: CreateToDoListButtonnProps) => (
    <button
        type="button"
        className="flex justify-center items-center h-11 mb-8 rounded-xl border border-white text-white bg-white bg-opacity-30 hover:bg-opacity-20 transition-all duration-200 ease-in-out"
        onClick={onClick}
    >
        <PlusIcon width={12} height={12} className="mr-2" />
        Create TODO List
    </button>
);
