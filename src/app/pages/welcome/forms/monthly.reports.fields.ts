import { FormlyFieldConfig } from "@ngx-formly/core"

export const monthlyFields = function get( motors:Array<any>): FormlyFieldConfig[] {
    return [
      { 
        key: 'motorName',
        type: 'select',
        templateOptions: {
          label: 'Select Motor',
          placeholder: 'Select name',
          required: false,
          options:motors
        }
      },



    ]
  }