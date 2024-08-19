import { ReactElement, forwardRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import CloseIcon from '@mui/icons-material/Close';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  IconButton,
  Slide,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

import { FormInput } from '@packages/components/form/FormInput';
import { Announcement } from '@packages/components/types/post';
import { addAnnouncement } from '@services/post.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQueryClient } from '@tanstack/react-query';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { Layout } from '@components/common/Layout';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

interface AnnouncementDialogProps {
  open: boolean;
  handleClose: () => void;
  form: UseFormReturn<Announcement>;
}

export default function AnnouncementDialog({
  open,
  handleClose,
  form,
}: AnnouncementDialogProps) {
  const content = form.watch('content');
  const queryClient = useQueryClient();
  const { openSingleButtonDialog } = useDialogStore();
  const handleAdd = () => {
    const formData = form.getValues();
    try {
      addAnnouncement(formData);
      openSingleButtonDialog({
        title: '공지사항 추가',
        message: '공지사항이 추가되었습니다.',
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonText: '확인',
      });
      queryClient.invalidateQueries({
        queryKey: ['announcements'],
      });
      handleClose();
    } catch (err) {
      console.error(err);
      openSingleButtonDialog({
        title: '오류 발생',
        message: '공지사항 추가 중 오류가 발생했습니다. 다시 시도해주세요.',
        dialogIconType: DialogIconType.WARNING,
        mainButtonText: '확인',
      });
    }
  };
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          backgroundColor: 'background.default',
        },
      }}
    >
      <AppBar sx={{ position: 'relative', mb: 8 }}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1 }}
            variant='titleMedium'
            component='div'
          >
            새로운 공지사항 추가
          </Typography>
          <Button autoFocus color='inherit' onClick={handleAdd}>
            추가
          </Button>
        </Toolbar>
      </AppBar>
      <Layout width={'100%'} data-color-mode='light'>
        <FormInput
          fullWidth
          control={form.control}
          name='title'
          label='제목을 작성해주세요.'
          placeholder='제 13회 해커톤 개최!'
        />
        <Stack direction={'row'} mt={2} gap={2}>
          <FormInput
            control={form.control}
            placeholder='# 해커톤 개최 안내'
            name='content'
            multiline
            minRows={12}
            sx={{
              flexGrow: 1,
              flexBasis: '50%',
              width: '50%',
            }}
          />
          <Box
            border={1}
            borderColor={'divider'}
            p={2}
            sx={{
              flexGrow: 1,
              flexBasis: '50%',
              width: '50%',
            }}
          >
            <Markdown
              children={content}
              rehypePlugins={[rehypeRaw]}
              remarkPlugins={[remarkGfm]}
              components={{
                code(props) {
                  const { children, className, ...rest } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  return match ? (
                    <SyntaxHighlighter
                      PreTag={'div'}
                      children={String(children).replace(/\n$/, '')}
                      language={match[1]}
                    />
                  ) : (
                    <code {...rest} className={className}>
                      {children}
                    </code>
                  );
                },
              }}
            />
          </Box>
        </Stack>
      </Layout>
    </Dialog>
  );
}
