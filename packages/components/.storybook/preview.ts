import type { Preview } from '@storybook/react';

import previewDecorators from './preview-decorators';

const preview: Preview = {
  decorators: previewDecorators,
  globalTypes: {
    mode: {
      description: 'Mode for preview area',
      defaultValue: 'light',
      toolbar: {
        title: 'Mode',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'starhollow', title: '라이트 모드' },
          { value: 'dark', icon: 'star', title: '다크 모드' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
