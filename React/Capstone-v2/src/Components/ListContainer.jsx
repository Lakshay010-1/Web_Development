import Timeline from '@mui/lab/Timeline';
import { timelineItemClasses } from '@mui/lab/TimelineItem';

export default function ListContainer(props) {
    return (
        <Timeline sx={{ [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0, } }}>
            {props.children}
        </Timeline>
    );
}
