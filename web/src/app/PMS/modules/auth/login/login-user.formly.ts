import { FormlyFieldConfig } from "@ngx-formly/core";

export const loginFormlyFields: FormlyFieldConfig[] = [


    {
        fieldGroupClassName: 'Grid',
        fieldGroup: [
            {
                className: "com-12 md:col-8",
                key: "email",
                type: "input",
                templateOptions: {
                    label: "Email",
                    
                    placeholder:'Enter Email',
                    required: true,
                },

            },
            {
                className: " col-12 md:col-8",
                key: "password",
                type: "input",
                templateOptions: {
                    type:"password",

                    label: "Password",
                    placeholder:"Enter password",
                    required: true,
                },

            },
        ]

        }
    


];
