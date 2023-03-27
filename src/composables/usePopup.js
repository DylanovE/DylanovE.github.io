// usePopup.js
import {ref} from 'vue';

export default function usePopup() {
    const wizkid = ref({});
    const isPopupVisible = ref(false);
    const popupType = ref('');

    function togglePopup(type, wizkidData) {
        popupType.value = type;
        if (wizkidData) {
            wizkid.value = wizkidData;
        } else {
            wizkid.value = '';
        }
        if (popupType.value === 'create' || popupType.value === 'update') {
            isPopupVisible.value = !isPopupVisible.value;
        }
    }

    return {
        wizkid,
        isPopupVisible,
        popupType,
        togglePopup,
    };
}
