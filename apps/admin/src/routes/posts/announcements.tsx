import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import Markdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import DeleteOutline from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  BoxProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { Button, IconButton } from '@packages/components/Button';
import { FormInput } from '@packages/components/form/FormInput';
import { Table } from '@packages/components/table/Table';
import { Announcement } from '@packages/components/types/post';
import {
  deleteAnnouncement,
  editAnnouncement,
  getAnnouncement,
  getAnnouncements,
} from '@services/post.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { getUser } from '@stores/user.store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';
import AnnouncementDialog from '@components/posts/AnnouncementDialog';

export const Route = createFileRoute('/posts/announcements')({
  component: FaqPage,
});

function FaqPage() {
  const {
    data: announcements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['announcements'],
    queryFn: () => getAnnouncements(),
  });

  const user = getUser();
  const queryClient = useQueryClient();
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<Announcement>({
    defaultValues: {
      title: '',
      content: '',
      created_by: user.name!,
      id: 0,
    },
  });

  if (error) {
    console.error(error);
  }
  const { openDualButtonDialog, openSingleButtonDialog, closeDialog } =
    useDialogStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  console.log(announcements);

  const handleRowClick = async (row: GridRowParams) => {
    try {
      const announcement: Announcement = await getAnnouncement(
        row.id as string,
      );

      form.setValue('title', announcement.title);
      form.setValue('content', announcement.content);
      form.setValue('created_by', announcement.created_by);
      form.setValue('id', announcement.id);

      setOpen(true);
    } catch (e) {
      console.error(e);
      openSingleButtonDialog({
        title: '공지사항 불러오기 실패',
        message: '해당 공지사항을 불러오는데 실패했습니다. 다시 시도해주세요.',
        dialogIconType: DialogIconType.WARNING,
        mainButtonText: '확인',
      });
    }
  };

  const formData = form.getValues();
  const handleEdit = async () => {
    console.log(formData);

    try {
      await editAnnouncement(formData);
      queryClient.invalidateQueries({
        queryKey: ['announcements'],
      });
      openSingleButtonDialog({
        title: '수정 완료',
        message: '해당 공지사항 수정을 완료했습니다.',
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonText: '확인',
      });
      setOpen(false);
    } catch (e) {
      console.error(e);
      openSingleButtonDialog({
        title: '수정 실패',
        message: '공지사항 수정에 실패했습니다. 다시 시도해주세요.',
        dialogIconType: DialogIconType.WARNING,
        mainButtonText: '확인',
      });
    }
  };

  const handleClose = () => {
    form.reset();
    setIsEdit(false);
    setOpen(false);
  };

  const handleAddClose = () => {
    form.reset();
    setIsAdd(false);
  };

  function AddFooter() {
    return (
      <GridToolbarContainer
        sx={{
          py: 2,
        }}
      >
        <Button variant='outlined' fullWidth onClick={() => setIsAdd(true)}>
          공지사항 추가
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleDelete = async (id: GridRowId) => {
    openDualButtonDialog({
      title: '공지사항 삭제',
      message: '해당 공지사항을 삭제할까요?',
      mainButtonText: '삭제',
      dialogIconType: DialogIconType.WARNING,
      mainButtonAction: async () => {
        try {
          await deleteAnnouncement(id);
          queryClient.invalidateQueries({
            queryKey: ['announcements'],
          });
          closeDialog();
          openSingleButtonDialog({
            title: '삭제 완료',
            message: '해당 공지사항 삭제를 완료했습니다.',
            dialogIconType: DialogIconType.CONFIRM,
            mainButtonText: '확인',
          });
        } catch (e) {
          console.error(e);
        }
      },
      subButtonText: '취소',
    });
  };

  const columns: GridColDef<Announcement>[] = [
    {
      field: 'id',
      headerName: '아이디',
      flex: 1,
    },
    {
      field: 'title',
      headerName: '제목',
      flex: 2,
    },
    {
      field: 'created_by',
      headerName: '작성자',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: '작성일',
      flex: 1,
      type: 'date',
      valueFormatter: (params) => dayjs(params).format('YYYY-MM-DD'), // Format the date
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: '삭제',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<DeleteOutline />}
            label='Delete'
            sx={{
              color: 'primary.main',
            }}
            onClick={() => handleDelete(id)}
          />,
        ];
      },
    },
  ];

  return (
    <Box>
      <Title
        title='공지사항 관리'
        label='공지사항을 게시·수정·삭제할 수 있습니다.'
      />
      <Layout>
        <Typography variant='bodySmall'>
          현재 <strong>{user.name}</strong>님으로 로그인되어 있습니다. 작성자
          이름에 해당 이름이 자동으로 입력됩니다.
        </Typography>
        <Table
          rows={announcements}
          loading={isLoading}
          columns={columns}
          onRowClick={handleRowClick}
          sx={{
            mt: 2,
          }}
          slots={{
            footer: AddFooter,
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 30,
              },
            },
          }}
          pageSizeOptions={[30]}
        />
      </Layout>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby='announcements-add-dialog-title'
      >
        <DialogTitle
          id='announcements-add-dialog-title'
          component={'div'}
          sx={{
            px: 2,
          }}
        >
          {isEdit ? (
            <FormInput
              control={form.control}
              name='title'
              sx={{
                width: '90%',
              }}
            />
          ) : (
            <Typography variant='titleMedium' maxWidth={'90%'}>
              {form.getValues('title')}
            </Typography>
          )}
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={() => setIsEdit(!isEdit)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          {isEdit ? <DoneIcon color='primary' /> : <EditIcon color='primary' />}
        </IconButton>
        <DialogContent
          sx={{
            position: 'relative',
            minWidth: '560px',
            px: 2,
            py: 6,
          }}
        >
          {isEdit ? (
            <FormInput
              control={form.control}
              name='content'
              fullWidth
              multiline
              minRows={3}
            />
          ) : (
            <BorderBox>
              <Markdown
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
              >
                {form.getValues('content')}
              </Markdown>
            </BorderBox>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>수정</Button>
          <Button onClick={handleClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <AnnouncementDialog
        open={isAdd}
        handleClose={handleAddClose}
        form={form}
      />
    </Box>
  );
}

function BorderBox({
  children,
  props,
}: {
  children: ReactNode;
  props?: BoxProps;
}) {
  return (
    <Box
      border={1}
      borderColor={'divider'}
      p={3}
      width={'100%'}
      borderRadius={2}
      minHeight={120}
      {...props}
    >
      {children}
    </Box>
  );
}
