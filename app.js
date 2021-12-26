const express=require('express');
const app=express();

const cheerio=require('cheerio');
const axios =require('axios');



let key=[
    "rank",
    "name",
    "price",
    "24th return",
    "7d",
    "marketcap",
    "volume",
    "circulatingSupply"
]

async function getprice(){
    try{
        const siteurl="https://coinmarketcap.com/";
        const {data} = await axios({
            method:"GET",
            url:siteurl

        })
        const $=cheerio.load(data);
let name ='#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr';

let coininfo={}

$(name).each((index,data)=>{
    
 let pos=0

   if(index<=9){
       $(data).children().each((indx,dta)=>{
           
       let tdvalue=$(dta).text()
       if(tdvalue){
        coininfo[key[pos]]=tdvalue;
       
        pos++;
       

       }
      
       })
     
       console.log(coininfo);
   }
   
  
})




    }
    catch(err){
        console.log(err);
    }
}
getprice();


app.listen('3000',()=>{
    console.log("started");
})