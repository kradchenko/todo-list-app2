import { useFormContext } from 'react-hook-form';

interface TextInputProps {
    name: string;
    label: string;
}

export const TextInput = ({ name, label }: TextInputProps) => {
    const { register } = useFormContext();

    return (
        <div className="form-control">
            <label htmlFor={name}>
                <span className="label-text">{label}</span>
                <input {...register(name)} name={name} type="checkbox" />
            </label>
        </div>
    );
};
