import { FormlyFieldConfig } from "@ngx-formly/core";

export const PermissionFormlyFields: FormlyFieldConfig[] = [
    {
        key: 'name',
        type: 'input',
        templateOptions: {
            label: 'Role Name',
            placeholder: 'Enter Role Name',
            required: true,
        },
    },
    {
        key: 'description',
        type: 'textarea',
        templateOptions: {
          label: 'Role Description',
          rows: 3
        },
    }
];
