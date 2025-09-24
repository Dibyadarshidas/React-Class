export const Card = ({data, renderCard}) => {
  return <>
<div className="container">
        {data?.length > 0 && renderCard}
      </div>
  </>
};