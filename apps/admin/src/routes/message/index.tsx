import { SyntheticEvent, useState } from 'react';

import { Box, Tab, Tabs, Typography } from '@mui/material';

import { createFileRoute } from '@tanstack/react-router';

import { Layout } from '@components/common/Layout';
import { TabPanel } from '@components/common/TabPanel';
import { Title } from '@components/common/Title';

export const Route = createFileRoute('/message/')({
  component: MessagePage,
});

function a11yProps(index: number) {
  return {
    id: `message-tab-${index}`,
    'aria-controls': `message-tabpanel-${index}`,
  };
}

function MessagePage() {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Layout>
      <Title title='문자 발송 서비스' label='문자 발송 서비스 관리' />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='전체 문자 발송' {...a11yProps(0)} />
          <Tab label='조건 문자 발송' {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Typography variant='titleSmall'>안녕하세요.</Typography>
      </TabPanel>
    </Layout>
  );
}
