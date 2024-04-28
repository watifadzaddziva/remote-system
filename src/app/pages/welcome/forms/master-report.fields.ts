import { FormlyFieldConfig } from '@ngx-formly/core';

export const weeklyFields = function get( motors:Array<any>): FormlyFieldConfig[] {
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

      { 
        key: 'fromDate',
        type: 'input',
        templateOptions: {
          label: 'From',
          placeholder: 'Select date',
          required: false,
          type:'date',

        }
      },

      { 
        key: 'toDate',
        type: 'input',
        templateOptions: {
          label: 'To',
          placeholder: 'Select date',
          required: false,
          type:'date',

        }
      },
  
    ]
  }
  
