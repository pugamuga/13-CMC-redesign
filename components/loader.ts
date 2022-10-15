export default `
body{
display: block;
}
#globalLoader{
    position: absolute;
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

   #globalDiv{
    width: 110px;
        height: 110px;
       

}
#globalDiv img:nth-child(1) {
    width: 110px;
        height: 110px;
        

}

  `;
