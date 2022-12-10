export interface Member {
    id: string;
    name: string;
    email: string;
    role: string;
    isSelected?: boolean;
    enableEditing?: boolean;
}

export interface ButtonType {
    id: number;
    name: string;
    value: number;
    isActive: boolean;
    isDisabled: boolean;
}