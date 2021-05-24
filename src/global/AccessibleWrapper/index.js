/* 
This component enables to make elements clickable and focusable.
The "withTabIndex" props means: Does the WrappedComponent should be focusable
The "clickable" props means: Does the WrappedComponent should be clickable
Usage: 
  - to make links clickable when they are currently focused
  - to make button-like elements clickable and focusable
*/

const AccessibleWrapper = ({ children, withTabIndex = true, clickable = true }) => {
  return (
    <div
      className="accessibleWrapper"
      tabIndex={withTabIndex ? 0 : -1}
      onKeyDown={(e) => (e.key === 'Enter' && clickable ? e.target.firstElementChild?.click() : false)}
      role="contentinfo"
    >
      {children}
    </div>
  );
};

export default AccessibleWrapper;
