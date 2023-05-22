import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface TextAreProps {
    name: string;
    label: string;
    placeholder: string;
    className?: string;
}

export const TextArea = ({ name, label, placeholder, className }: TextAreProps) => {
    const { register } = useFormContext();

    return (
        <div className={classNames('form-control flex flex-col', className)}>
            <label htmlFor={name} className="mb-2">
                <span className="label-text">{label}</span>
            </label>
            <textarea
                {...register(name)}
                name={name}
                placeholder={placeholder}
                className="input input-bordered w-full h-32"
            />
        </div>
    );
};
