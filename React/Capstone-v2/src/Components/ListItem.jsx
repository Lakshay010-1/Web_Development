import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function ListItem(props) {
    return (
        <TimelineItem>
            <TimelineSeparator>
                <TimelineDot variant="outlined" color="primary" />
                <TimelineConnector sx={{ backgroundColor: "#111827" }} />
            </TimelineSeparator>
            <TimelineContent>{props.children}</TimelineContent>
        </TimelineItem>
    );
}
