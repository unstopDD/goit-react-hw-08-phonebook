import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Loader.module.css';

function LoaderComponent() {
  return (
    <div className={s.overlay}>
      <Loader type="Hearts" color="#f50057" height="35" />
    </div>
  );
}

export default LoaderComponent;
