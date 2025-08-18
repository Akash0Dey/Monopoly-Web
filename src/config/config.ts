export interface FormConfig {
    name : string;
    placeHolder ?: string;
    description ?: string;
    type ?: string;
    defaultValue ?: string;
    submittable ?: (value: string) => boolean;
    required ?: boolean;
}

export type FormConfigMap = Array<FormConfig>;