import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

interface DateTimePickerProps {
    name: string;
    label: string;
    className?: string;
}

export const DateTimePicker = ({ name, label, className }: DateTimePickerProps) => {
    const { register } = useFormContext();

    return (
        <div className={classNames('form-control', className)}>
            <label htmlFor={name}>
                <span className="label-text">{label}</span>
            </label>
            <input
                {...register(name)}
                name={name}
                type="datetime-local"
                className="input input-bordered w-full"
            />
        </div>
    );
};
