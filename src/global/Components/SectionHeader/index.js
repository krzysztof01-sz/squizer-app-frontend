import './styles.scss';

const SectionHeader = ({ children, isCenter }) => {
  return <h1 className={`sectionHeader ${isCenter ? 'center' : ''}`}>{children}</h1>;
};

export default SectionHeader;
