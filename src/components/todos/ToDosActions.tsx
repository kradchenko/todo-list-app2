import { ChangeEvent } from 'react';
import { ReactComponent as RemoveIcon } from 'assets/bin.svg';
import { ReactComponent as CompletedIcon } from 'assets/completed.svg';
import { ReactComponent as NotCompletedIcon } from 'assets/not-completed.svg';
import { ReactComponent as PlusIcon } from 'assets/plus.svg';

export interface ToDosSearchProps {
    markType: 'completed' | 'not-completed';
    disabled: boolean;
    onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
    onCreate: () => void;
    onMark: () => void;
    onRemove: () => void;
}

export const ToDosActions = ({
    markType,
    onSearch,
    onCreate,
    onMark,
    onRemove,
    disabled,
}: ToDosSearchProps) => {
    return (
        <div className="flex mb-10 items-center">
            <input
                className="flex-1 bg-transparent h-10 text-lg outline-none border-b border-gray-500"
                type="search"
                placeholder="Search..."
                onChange={onSearch}
            />
            <button
                type="button"
                className="hover:text-purple-500 transition-all duration-200 ease-in-out disabled:text-gray-500 disabled:hover:text-gray-500 ml-10"
                onClick={onCreate}
            >
                <PlusIcon width={24} height={24} />
            </button>
            <button
                type="button"
                className="hover:text-purple-500 transition-all duration-200 ease-in-out disabled:text-gray-500 disabled:hover:text-gray-500 ml-5"
                disabled={disabled}
                onClick={onMark}
            >
                {markType === 'completed' ? (
                    <CompletedIcon width={28} height={28} />
                ) : (
                    <NotCompletedIcon width={28} height={28} />
                )}
            </button>
            <button
                type="button"
                onClick={onRemove}
                className="hover:text-red-500 transition-all duration-200 ease-in-out
                disabled:text-gray-500 disabled:hover:text-gray-500 ml-5"
                disabled={disabled}
            >
                <RemoveIcon width={28} height={28} />
            </button>
        </div>
    );
};
