import { FormlyFieldConfig } from "@ngx-formly/core";

export const FeedbackFormlyFields: FormlyFieldConfig[] = [
  {
    className:'col-12',
    key: 'title',
    type: 'input',
    templateOptions: {
      label: 'Title',
      placeholder: 'Enter title...',
      required: true,
    },
  },
  {
    className:'col-12',
    key: 'description',
    type: 'textarea',
    templateOptions: {
      label: 'Description',
      placeholder: 'Enter description...',
      rows: 3,
    },
  }
]
