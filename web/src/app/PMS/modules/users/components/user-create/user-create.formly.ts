import { FieldWrapper, FormlyFieldConfig } from '@ngx-formly/core';

export const userFormly: FormlyFieldConfig[] = [
  {
 
    fieldGroup: [
      {
        fieldGroupClassName: 'grid',
        fieldGroup: [
          {
            className: 'col-6',
            key: 'firstname',
            type: 'input',
            templateOptions: {
             label:'Enter firstname',
              placeholder: 'Enter firstname',
              required: true,
            },
          },
          {
            className: 'col-6',
            key: 'lastname',
            type: 'input',
            templateOptions: {
              placeholder: 'Enter lastname',
              required: true,
              label: 'Enter lastname',
            },
          },
        ],
      },
      {
        className:'col-12',
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Enter Email',
          placeholder: 'Enter email',
        },
      },
      {
        className:'col-12',
        key: 'password',
        type: 'input',
        templateOptions: {
          type: 'password',
          label: 'Enter Password',
          placeholder: 'Enter Password',
        },
      }
    ],
  },
];
