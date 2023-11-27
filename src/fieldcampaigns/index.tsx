import FieldCampaignCreate from './FieldCampaignCreate';
import FieldCampaignEdit from './FieldCampaignEdit';
import FieldCampaignList from './FieldCampaignList';
import FieldCampaignShow from './FieldCampaignShow';

export default {
    create: FieldCampaignCreate,
    edit: FieldCampaignEdit,
    list: FieldCampaignList,
    show: FieldCampaignShow,
    recordRepresentation: 'name.en',
    options: {
        label: 'Field campaigns',
    }
};
