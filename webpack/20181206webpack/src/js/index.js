import '../css/index.css';  //两个点是找上级目录
import  '../css/sa.scss';  //两个点是找上级目录
// import $ from 'jquery';

var log_a = ()=>{
    debugger;
    let b = [1,2];
    let c = ['a',...b];
    console.log($)
    console.log(c);
}
setTimeout(function(){
    log_a();
},1000)
