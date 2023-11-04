import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  id: '11',
  closeOnClick: true,
  position: 'topRight',
  progressBar: false,
  timeout: false,
  transitionIn: 'bounceInUp',
});

export const toastError = () => {
  iziToast.error({
    title: 'Error!',
    message: 'Oops! Something went wrong! Try reloading the page!',
  });
};
