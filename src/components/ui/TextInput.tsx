import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface TextInputProps {
    name: string;
    label: string;
    placeholder: string;
    className?: string;
}

export const TextInput = ({ name, label, placeholder, className }: TextInputProps) => {
    const { register } = useFormContext();

    return (
        <div className={classNames('form-control', className)}>
            <label htmlFor={name} className="mb-2">
                <span className="label-text">{label}</span>
            </label>
            <input
                {...register(name)}
                name={name}
                placeholder={placeholder}
                type="text"
                className="input input-bordered w-full"
            />
        </div>
    );
};
