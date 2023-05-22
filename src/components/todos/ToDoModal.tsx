import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Dialog, Switch } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { format, parseISO } from 'date-fns';
import { z } from 'zod';

import { DateTimePicker } from 'components/ui/DateTimePicker';
import { TextArea } from 'components/ui/TextArea';
import { TextInput } from 'components/ui/TextInput';
import { ToDo } from 'schema';
import { api } from 'utils/api';

interface ToDoFormModalProps {
    initValues: ToDo | null;
    isOpen: boolean;
    toDoListId: number;
    onClose: () => void;
    onSuccess: () => void;
}

const ToDoFormSchema = z.object({
    name: z.string().min(3).max(80),
    description: z.string().max(280).optional(),
    deadline: z.string().optional(),
});

type ToDoForm = z.infer<typeof ToDoFormSchema>;

export const ToDoFormModal = ({
    initValues,
    isOpen,
    onClose,
    onSuccess,
    toDoListId,
}: ToDoFormModalProps) => {
    const methods = useForm<ToDoForm>({
        defaultValues: initValues
            ? {
                  name: initValues.name,
                  description: initValues.description,
                  deadline: initValues.deadline
                      ? format(parseISO(initValues.deadline), "yyyy-MM-dd'T'HH:mm")
                      : format(new Date(), "yyyy-MM-dd'T'HH:mm"),
              }
            : {
                  name: '',
                  description: '',
                  deadline: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
              },
        resolver: zodResolver(ToDoFormSchema),
    });

    const [isDeadline, setIsDeadline] = useState<boolean>(
        initValues ? (initValues.deadline ? true : false) : false,
    );

    const onSubmit = async (formData: ToDoForm) => {
        if (!initValues) {
            try {
                const { data } = await api.post(`/todo-list/${toDoListId}/todo`, {
                    name: formData.name,
                    description: formData.description,
                    deadline: isDeadline ? formData.deadline : null,
                    completed: false,
                });

                onSuccess();

                console.log(data);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await api.put(`/todo-list/${toDoListId}/todo/${initValues.id}`, {
                    name: formData.name,
                    description: formData.description,
                    deadline: isDeadline ? formData.deadline : null,
                    completed: initValues.completed,
                });

                onSuccess();

                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-gray-800 w-full max-w-lg rounded-lg p-5">
                    <Dialog.Title className="text-2xl">
                        {initValues ? `Edit ${initValues.name}` : 'Create ToDo'}
                    </Dialog.Title>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)}>
                            <div className="my-10">
                                <TextInput
                                    name="name"
                                    label="Name"
                                    placeholder="Enter ToDo name"
                                    className="mb-5"
                                />
                                <TextArea
                                    name="description"
                                    label="Description"
                                    placeholder="Enter a description of ToDo if you want"
                                    className="mb-5"
                                />
                                <Switch
                                    checked={isDeadline}
                                    onChange={setIsDeadline}
                                    className={`${isDeadline ? 'bg-purple-900' : 'bg-gray-300'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75 mb-3`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className={`${
                                            isDeadline ? 'translate-x-9' : 'translate-x-0'
                                        }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                                    />
                                </Switch>
                                {isDeadline ? (
                                    <DateTimePicker
                                        name="deadline"
                                        label="Deadline"
                                        className={!isDeadline ? 'hidden' : undefined}
                                    />
                                ) : null}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={!methods.formState.isValid}
                                >
                                    Confirm
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-error ml-5"
                                    onClick={() => {
                                        methods.reset();
                                        onClose();
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
