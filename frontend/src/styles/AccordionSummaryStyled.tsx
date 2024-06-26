import { styled } from "@mui/material/styles";
import { AccordionSummary } from "@mui/material";
import hovered from "../assets/cursor_hovered.png";
import cursor from "../assets/cursor.png";
export const AccordionSummaryStyled = styled(AccordionSummary)(({ theme }) => ({
  "&.MuiAccordionSummary-root:hover": {
    cursor: `url(${cursor}),auto`,
  },
  "&.MuiAccordionSummary-root button,&.MuiAccordionSummary-root svg": {
    cursor: `url(${hovered}),auto`,
  },
}));
