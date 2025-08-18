import type { FormConfigMap } from './config.ts';

export const loginFormConfig: FormConfigMap = [
    {
        name: 'username',
        placeHolder: 'Enter your username',
        description: 'Username',
        type: 'text',
        defaultValue: '',
        required: true,
        submittable: (username: string) => username.trim() !== ''
    }
];
