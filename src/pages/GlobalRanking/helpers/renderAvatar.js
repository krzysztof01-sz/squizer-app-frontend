import Loader from '../../../global/Components/Loader';

export const renderAvatar = (loading, avatar) => {
  return loading ? (
    <div className="data__avatar">
      <Loader width={40} height={40} />
    </div>
  ) : (
    <img className="data__avatar" src={loading ? '' : avatar} alt="user avatar" />
  );
};
