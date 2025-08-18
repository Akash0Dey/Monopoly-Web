import React, {useState} from 'react';
import type {FormConfig, FormConfigMap} from '../config/config.ts';

interface DynamicFormProps {
    config: FormConfigMap;
    onSubmit: (formData: Record<string, string>) => void;
    submitButtonText?: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
                                                     config,
                                                     onSubmit,
                                                     submitButtonText = 'Submit'
                                                 }) => {
    const [formData, setFormData] = useState<Record<string, string>>(() => {
        const initialData: Record<string, string> = {};
        config.forEach(field => {
            if (field.name) {
                initialData[field.name] = field.defaultValue || '';
            }
        });
        return initialData;
    });

    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let submittable = true;
        const FaultyFields: string[] = [];
        config.forEach(
            (field: FormConfig) => {
                const isSubmittable: boolean = !field.submittable || field.submittable(formData[field.name]);
                submittable = submittable && isSubmittable;
                if (!isSubmittable) {
                    FaultyFields.push(field.name);
                }
            });
        if (!submittable) {
            alert("Please check the following fields: " + FaultyFields.join(', '));
            return;
        }
        onSubmit(formData);

    };

    return (
        <form onSubmit={handleSubmit}>
            {config.map((field, index) => (
                <div key={index}>
                    {field.description && (
                        <label htmlFor={field.name}>
                            {field.description}:
                        </label>
                    )}
                    <input
                        type={field.type || 'text'}
                        id={field.name}
                        name={field.name}
                        placeholder={field.placeHolder || ''}
                        value={formData[field.name || ''] || ''}
                        onChange={(e) => handleInputChange(field.name, e.target.value)}
                        required={field.required || false}
                    />
                </div>
            ))}
            <button type="submit">{submitButtonText}</button>
        </form>
    );
};

export default DynamicForm;
