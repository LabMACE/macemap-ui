import FieldCampaignCreate from './FieldCampaignCreate';
import FieldCampaignEdit from './FieldCampaignEdit';
import FieldCampaignList from './FieldCampaignList';
import FieldCampaignShow from './FieldCampaignShow';
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';

export default {
    create: FieldCampaignCreate,
    edit: FieldCampaignEdit,
    list: FieldCampaignList,
    show: FieldCampaignShow,
    recordRepresentation: 'name.en',
    icon: EmojiFlagsIcon,
    options: {
        label: 'Field campaigns',
    }
};
