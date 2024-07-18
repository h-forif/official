import { ReactNode } from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

import { Button } from '@packages/components/Button';
import { Link } from '@tanstack/react-router';

interface ProfileCardProps {
  title: string;
  children: ReactNode;
  href: string;
}

export function ProfileCard({ title, href, children }: ProfileCardProps) {
  return (
    <Card
      sx={{
        minWidth: 275,
        backgroundColor: 'background.default',
        borderRadius: 3,
        boxShadow: 4,
        p: 2,
      }}
    >
      <CardContent>
        <Typography variant='titleMedium' sx={{ mb: 2 }} fontWeight={'bold'}>
          {title}
        </Typography>
        <ProfileCardDescription>{children}</ProfileCardDescription>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Link to={href}>
          <Button variant='contained' size='large'>
            이동하기
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}

export function ProfileCardDescription({ children }: { children?: ReactNode }) {
  return <Box>{children}</Box>;
}
