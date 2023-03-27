import {createApp, defineComponent, onMounted, ref} from 'vue';

export function usePopupNotification() {
    const showPopup = ref(false);
    const popup = document.createElement('div');
    popup.classList.add('popup-message');

    function showMessage(msg, isSuccess) {
        const PopupComponent = defineComponent({
            setup() {
                popup.innerHTML = msg;
                if(isSuccess === 'success'){
                    popup.classList.remove('red');
                    popup.classList.add('green');
                }else{
                    popup.classList.remove('green');
                    popup.classList.add('red');
                }

                onMounted(() => {
                    document.body.appendChild(popup);
                    popup.style.opacity = '1';
                    showPopup.value = true;
                    setTimeout(() => {
                        popup.style.opacity = '0';
                        showPopup.value = false;
                        setTimeout(() => {
                            document.body.removeChild(popup);
                        }, 500);
                    }, 5000);
                });

                return {};
            },
        });

        const app = createApp(PopupComponent);
        const el = document.createElement('div');
        document.body.appendChild(el);
        app.mount(el);
    }

    return {showMessage};
}
