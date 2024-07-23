import type { Meta, StoryObj } from '@storybook/react';
import { z } from 'zod';

import { Form } from '../Form';

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const loginSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  password: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

export const Login: Story = {
  args: {
    schema: loginSchema,
    config: {
      email: {
        label: '이메일',
        placeholder: '이메일을 입력해주세요',
        type: 'email',
      },
      password: {
        label: '비밀번호',
        placeholder: '비밀번호를 입력해주세요',
        type: 'password',
      },
    },
    onSubmit: (data) => console.log(data),
  },
};
