import Loader from '../../../global/Components/Loader';

const renderAvatar = (loading, avatar) => {
  return loading ? (
    <div className="data__avatar">
      <Loader width={40} height={40} />
    </div>
  ) : (
    <img className="data__avatar" src={loading ? '' : avatar} alt="user avatar" />
  );
};

export default renderAvatar;
