function Result({score, total, onReplay}){
 return(
     <div>
         <h2>Quiz Completed</h2>
         <h3>you are score : {score}/{total}</h3>
         <button onClick={onReplay}>Replay</button>
     </div>
 )
}
export  default Result;