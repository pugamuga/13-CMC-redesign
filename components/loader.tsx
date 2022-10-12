export default `
body{
display: block;
}
#globalLoader{
    position: fixed;
    z-index: 1700;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgb(19,0,63);
    background: linear-gradient(148deg, rgba(19,0,63,1) 0%, rgba(88,28,135,1) 100%);
    display: flex;
    left: 0,
    right: 0;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
}
// #globalDiv{
    
//     border: 12px solid #f3f3f3; /* Light grey */
//     border-top: 12px solid #3498db; /* Blue */
//     border-radius: 50%;
//     width: 120px;
//     height: 120px;
//     animation: spin 2s linear infinite;
//   }
  
//   @keyframes spin {
//     0% { transform: rotate(0deg); }
//     100% { transform: rotate(360deg); }
//   }
   #globalDiv{
    width: 50px;
        height: 50px;
       

}
#globalDiv img:nth-child(1) {
    width: 50px;
        height: 50px;
        

}

  `;
