import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from '../Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    keepMounted: false,
  },
  argTypes: {
    keepMounted: {
      description:
        '모달창을 항상 마운트시킵니다. 동일한 모달을 자주 발생시킬 시 사용해주세요.',
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: [
      <ModalTrigger>
        <Button variant='contained'>Open Modal</Button>
      </ModalTrigger>,
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Modal Title</ModalTitle>
          <ModalDescription>
            This is description of modal. 2~3 lines are appropriate.
          </ModalDescription>
        </ModalHeader>
        <p>모달 내용이 여기에 들어갑니다.</p>
      </ModalContent>,
    ],
  },
};

export const KeepMounted: Story = {
  args: {
    keepMounted: true,
    children: [
      <ModalTrigger>
        <Button variant='contained'>Open modal</Button>
      </ModalTrigger>,
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Keep Mounted 모달</ModalTitle>
          <ModalDescription>
            이 모달은 항상 마운트된 상태를 유지합니다.
          </ModalDescription>
        </ModalHeader>
        <p>이 모달은 닫혀도 DOM에서 제거되지 않습니다.</p>
      </ModalContent>,
    ],
  },
};
