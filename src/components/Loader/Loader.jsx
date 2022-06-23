import { Watch } from 'react-loader-spinner';
import s from './Loader.module.css';
const Loader = () => {
  return (
    <>
      <span className={s.Loader}>
        <Watch ariaLabel="loading-indicator" />
      </span>
    </>
  );
};
export default Loader;
