

export default function Loader({size=60}) {

    return (
        <div className="container pt-5">
          
          <div className="d-flex justify-content-center">
            <div className="spinner-border" style={{width: `${size}px`, height: `${size}px`}} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
    )
    
}