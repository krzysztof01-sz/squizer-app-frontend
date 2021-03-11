const AccessibleWrapper = ({ children }) => {
  return (
    <div
      className="accessibleWrapper"
      tabIndex="0"
      onKeyDown={(e) => (e.key === 'Enter' ? e.target.firstElementChild?.click() : false)}
      role="contentinfo"
    >
      {children}
    </div>
  );
};

export default AccessibleWrapper;
