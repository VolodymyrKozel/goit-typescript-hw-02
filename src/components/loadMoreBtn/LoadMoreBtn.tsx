import css from './LoadMoreBtn.module.css';
import Loader from '../loader/Loader';

interface LoadMoreBtnProps {
  handleLoadMore: () => void;
  loading: boolean;
}
const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ handleLoadMore, loading }) => {
  return (
    <button className={css.btn} type="button" onClick={handleLoadMore}>
      {!loading ? 'Load more' : <Loader width={20} height={20} />}
    </button>
  );
}

export default LoadMoreBtn;
