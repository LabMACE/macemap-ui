import LicorCreate from './LicorCreate';
import LicorEdit from './LicorEdit';
import LicorList from './LicorList';
import LicorShow from './LicorShow';
import RadarIcon from '@mui/icons-material/Radar';

export default {
    create: LicorCreate,
    edit: LicorEdit,
    list: LicorList,
    show: LicorShow,
    icon: RadarIcon,
    options: {
        label: 'LI-COR',
    },
    recordRepresentation: 'name.en',
};
