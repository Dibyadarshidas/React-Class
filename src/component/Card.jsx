export const Card = ({data, renderCard}) => {
  return (
    <div className="container">
      {data?.length > 0 ? (
        <div className="grid grid-4 fade-in">
          {renderCard}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">
            🔍
          </div>
          <h3 className="empty-title">Start Your Search</h3>
          <p className="empty-description">
            Enter a search term above to discover amazing content. Your results will appear here.
          </p>
        </div>
      )}
    </div>
  );
};