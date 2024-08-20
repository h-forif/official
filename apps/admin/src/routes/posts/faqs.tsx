import { useState } from 'react';
import { useForm } from 'react-hook-form';

import CloseIcon from '@mui/icons-material/Close';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridRowId,
  GridRowParams,
  GridToolbarContainer,
} from '@mui/x-data-grid';

import { FAQ_TAG_OPTIONS } from '@constants/faq.constant';
import { Button, IconButton } from '@packages/components/Button';
import { Select } from '@packages/components/Select';
import { FormInput } from '@packages/components/form/FormInput';
import { FormSelect } from '@packages/components/form/FormSelect';
import { FAQ } from '@packages/components/types/post';
import { addFaq, editFaq, getFaqs } from '@services/post.service';
import { DialogIconType, useDialogStore } from '@stores/dialog.store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';

import { Layout } from '@components/common/Layout';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/posts/faqs')({
  component: FaqPage,
});

function FaqPage() {
  const {
    data: faqs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['faqs'],
    queryFn: () => getFaqs(),
  });

  const queryClient = useQueryClient();
  const tags = FAQ_TAG_OPTIONS.map((tag) => tag.value);
  const [isAdd, setIsAdd] = useState(false);
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState<FAQ | undefined>();
  const [isEdit, setIsEdit] = useState(false);

  const form = useForm<FAQ>({
    defaultValues: {
      title: '',
      content: '',
      tag: '',
      id: 0,
    },
  });

  if (error) {
    console.error(error);
  }
  const { openDualButtonDialog, openSingleButtonDialog } = useDialogStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleRowClick = (row: GridRowParams) => {
    const idx = faqs?.findIndex((faq) => faq.id === row.id);
    if (faqs) {
      setFaq(faqs[idx!]);
      form.setValue('title', faqs[idx!]!.title);
      form.setValue('content', faqs[idx!]!.content);
      form.setValue('tag', faqs[idx!]!.tag);
      form.setValue('id', faqs[idx!]!.id);
      setOpen(true);
    }
  };

  const handleEdit = async () => {
    const formData = form.getValues();
    console.log(formData);

    try {
      await editFaq(formData);
      queryClient.invalidateQueries({
        queryKey: ['faqs'],
      });
      openSingleButtonDialog({
        title: '수정 완료',
        message: '해당 자주 묻는 질문 수정을 완료했습니다.',
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonText: '확인',
      });
      setOpen(false);
    } catch (e) {
      console.error(e);
      openSingleButtonDialog({
        title: '수정 실패',
        message: 'FAQ 수정에 실패했습니다. 다시 시도해주세요.',
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

  const handleAdd = async () => {
    const formData = form.getValues();
    try {
      await addFaq(formData);
      setIsAdd(false);
      form.reset();
      queryClient.invalidateQueries({
        queryKey: ['faqs'],
      });
      openSingleButtonDialog({
        title: '추가가 완료되었습니다.',
        dialogIconType: DialogIconType.CONFIRM,
        mainButtonText: '확인',
      });
    } catch (e) {
      console.error(e);
      openSingleButtonDialog({
        title: '추가 실패',
        message: 'FAQ 추가에 실패했습니다. 다시 시도해주세요.',
        dialogIconType: DialogIconType.WARNING,
        mainButtonText: '확인',
      });
    }
  };

  function AddToolbar() {
    return (
      <GridToolbarContainer
        sx={{
          py: 2,
        }}
      >
        <Button variant='outlined' fullWidth onClick={() => setIsAdd(true)}>
          자주 묻는 질문 추가
        </Button>
      </GridToolbarContainer>
    );
  }

  const handleDelete = async (id: GridRowId) => {
    openDualButtonDialog({
      title: '자주 묻는 질문 삭제',
      message: '해당 자주 묻는 질문을 삭제할까요?',
      mainButtonText: '삭제',
      dialogIconType: DialogIconType.WARNING,
      mainButtonAction: async () => {
        // TODO: Delete the faq
        console.log('delete', id);
      },
      subButtonText: '취소',
    });
  };

  const columns: GridColDef<FAQ>[] = [
    {
      field: 'title',
      headerName: '제목',
      flex: 2,
    },
    {
      field: 'tag',
      headerName: '태그',
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
        title='자주 묻는 질문 관리'
        label='자주 묻는 질문을 게시·수정·삭제할 수 있습니다.'
      />
      <Layout>
        <Typography variant='bodySmall'>
          태그는 <strong>[{tags.join(', ')}]</strong> 중에서 선택해주세요.
        </Typography>
        <DataGrid
          rows={faqs}
          loading={isLoading}
          columns={columns}
          onRowClick={handleRowClick}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          disableRowSelectionOnClick
          pageSizeOptions={[10]}
          slots={{
            footer: AddToolbar,
          }}
          sx={{
            mt: 2,
          }}
        />
      </Layout>
      <Dialog
        open={open}
        fullScreen={fullScreen}
        onClose={handleClose}
        aria-labelledby='faqs-add-dialog-title'
      >
        <DialogTitle
          id='faqs-add-dialog-title'
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
          {!isEdit && (
            <Typography variant='bodySmall' color={'text.secondary'}>
              작성일: {dayjs(faq?.created_at).format('YYYY-MM-DD')}
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
            <>
              <FormSelect
                control={form.control}
                name='tag'
                options={FAQ_TAG_OPTIONS}
                fullWidth
                multiline
                sx={{
                  mb: 2,
                }}
              />
              <FormInput
                control={form.control}
                name='content'
                fullWidth
                multiline
                minRows={3}
              />
            </>
          ) : (
            <>
              <Typography variant='labelMedium'>태그</Typography>
              <Select
                val={form.getValues('tag')}
                placeholder=''
                options={FAQ_TAG_OPTIONS}
                disabled
                sx={{
                  mb: 2,
                }}
              />
              <Typography variant='labelMedium'>답변</Typography>
              <TextField
                fullWidth
                multiline
                minRows={4}
                value={form.getValues('content')}
                disabled
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEdit}>수정</Button>
          <Button onClick={handleClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={isAdd}
        fullScreen={fullScreen}
        onClose={handleAddClose}
        aria-labelledby='faqs-add-dialog-title'
      >
        <DialogTitle id='faqs-add-dialog-title' component={'div'}>
          <Typography variant='titleMedium'>자주 묻는 질문 추가</Typography>
          <Typography variant='labelSmall' color={'text.secondary'}>
            새로운 자주 묻는 질문울 추가해주세요. 기존에 있는 질문인지
            확인해주세요.
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleAddClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.text.secondary,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
          sx={{
            position: 'relative',
            minWidth: '560px',
          }}
        >
          <FormSelect
            control={form.control}
            name='tag'
            options={FAQ_TAG_OPTIONS}
            label='태그를 선택해주세요.'
            fullWidth
            sx={{
              mb: 2,
            }}
          />
          <FormInput
            control={form.control}
            name='title'
            label='질문을 입력해주세요.'
            placeholder='왜 인가요?'
            fullWidth
            sx={{
              mb: 2,
            }}
          />
          <FormInput
            multiline
            minRows={2}
            control={form.control}
            name='content'
            fullWidth
            placeholder='그렇기 때문입니다.'
            label='답변을 입력해주세요.'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAdd}>추가</Button>
          <Button onClick={handleAddClose} autoFocus>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
