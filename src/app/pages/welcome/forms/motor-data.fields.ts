import { FormlyFieldConfig } from '@ngx-formly/core';

export const thresholdFields = function get(motornames:Array<any>): FormlyFieldConfig[] {
    return [
      {
        key: 'motorName',
        type: 'select',
        templateOptions: {
          label: 'Select Motor Name',
          placeholder: 'select motor',
          required: true,
          options:motornames,
        }
      },

      {
        key: 'current',
        type: 'number',
        templateOptions: {
          label: 'Current',
          placeholder: 'Enter current',
          required: true,
        }
      },
      {
        key: 'temperature',
        type: 'number',
        templateOptions: {
          label: 'Temperature',
          placeholder: 'Enter temperature',
          required: true,
        }
      },
  
      {
        key: 'vibrations',
        type: 'number',
        templateOptions: {
          label: 'Vibrations',
          placeholder: 'Enter vibrations',
          required: true,
        }
      },
      
    ]
  }
  