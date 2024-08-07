import MUIAccordion, { AccordionProps } from '@mui/material/Accordion';
import MUIAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';

export function Accordion({ ...props }: AccordionProps) {
  return (
    <MUIAccordion
      {...props}
      disableGutters
      elevation={0}
      sx={{
        '&.MuiAccordion-root': {
          backgroundColor: 'background.default',
        },
        '&:before': {
          display: 'none', // Accordion의 기본 구분선 제거
        },
      }}
    >
      {props.children}
    </MUIAccordion>
  );
}

export function AccordionSummary({ ...props }: AccordionSummaryProps) {
  return (
    <MUIAccordionSummary
      sx={{
        '&.MuiAccordionSummary-root:hover': {
          backgroundColor: 'background.paper',
          borderRadius: 2,
        },
      }}
    >
      {props.children}
    </MUIAccordionSummary>
  );
}
