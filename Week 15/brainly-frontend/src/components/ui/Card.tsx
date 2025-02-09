import { ShareIcon } from "../../icons/Share"

function Card() {
  return (
    <div  >
      <div className="pg-8 bg-white rounded-md shadow-md border-gray-200 max-w-96 border" >
        
        <div className="flex justify-between" >
            <div  className="flex" > 
              <ShareIcon size="sm"/>
              Project Ideas
            </div>
            <div className="flex" >
            <ShareIcon size="md"/>
            <ShareIcon size="md"/>
            </div>
        </div>

      </div>
    </div>
  )
}

export default Card
