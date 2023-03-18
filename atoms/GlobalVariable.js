import {atom} from 'recoil';

//to show and close the Modal that is being used to post comments.
export const ToShowAndCloseModal = atom({
    key: 'ToShowAndCloseModal',
    default:'false',
})