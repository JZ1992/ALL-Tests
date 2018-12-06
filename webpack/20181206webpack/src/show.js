//声明一个函数，最终做为一个模块被导出
const show=content=>{
    const box=document.getElementById("box");
    box.innerHTML=`你好！${content}`;
}

export {show};  //ES6导出模块的语法