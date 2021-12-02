 myFunction = function(){
    $(function(){
        var dtToday = new Date(document.getElementById("fromdate").value);  
         console.log(dtToday);
         var day = dtToday.getDate() + 1;
         var month = dtToday.getMonth() + 1;
         var year = dtToday.getFullYear();
       if(month < 10)
            month = '0' + month.toString();
       if(day < 10)
            day = '0' + day.toString();
   
       var minDate= year + '-' + month + '-' + day; 
   
        $('#todate').attr('min', minDate); 
   });

    let amountForBooking = 0;
    //alert(document.getElementById("fromdate").value +" >> "+document.getElementById("todate").value)
    let adult = document.getElementById("adult").value;	  
    
    
     let fromdate = new Date(document.getElementById("fromdate").value);
        
    let todate = new Date(document.getElementById("todate").value);	
    
    let timeDiff = Math.abs(todate.getTime() - fromdate.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      let adultVal = parseInt(adult);
    amountForBooking = adultVal * (1000 *  parseInt(diffDays));  
     
     console.log("amountForBooking =" + amountForBooking  + " " +  diffDays + " days "); 
     if(amountForBooking >= 1000)
     document.getElementById("total").value = amountForBooking;
     
}

$(function(){
    var dtToday = new Date(); 

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if(month < 10)
         month = '0' + month.toString();
    if(day < 10)
         day = '0' + day.toString();

    var minDate= year + '-' + month + '-' + day; 

     $('#fromdate').attr('min', minDate); 
});


let imgObjectList = new Array();

const fetchCity = async () => { 
    const result = await fetch("https://travel-advisor.p.rapidapi.com/photos/list?location_id=306931&currency=USD&limit=50&lang=en_US&rapidapi-key=9929b549bdmsh519be7692f11e24p1009a1jsn9f08cd2457fb");
    const respObject = await result.json();
    respObject.data.forEach((element) => {
      let eachHotel = { 
        hotelPhoto: element.images.medium.url, 
      }; 
          imgObjectList.push(eachHotel); 
    });
    createHotelListAndAttachToUL(imgObjectList);
  };
  
  const fetchHotelUsingAjax = () => {
    let xhr = new XMLHttpRequest();
    let url = "https://travel-advisor.p.rapidapi.com/photos/list?location_id=306931&currency=USD&limit=50&lang=en_US&rapidapi-key=9929b549bdmsh519be7692f11e24p1009a1jsn9f08cd2457fb";
    xhr.open("GET", url, true);
    xhr.send();
  
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        let respObject = JSON.parse(xhr.response);
        console.log("respObject -> ", respObject);
  
        respObject.data.forEach((element) => {
            let eachHotel = { 
                hotelPhoto: element.images.medium.url, 
              };
           
              imgObjectList.push(eachHotel);
        });
        console.log("imgObjectList -> ", imgObjectList);
        createHotelListAndAttachToUL(imgObjectList);
      }
    };
  };
  
  const createHotelListAndAttachToUL = (hotelArrayList) => {
    const allHotelStringAppended = hotelArrayList
      .map((dishObject) => {
        return ` <div class="carousel-item active">
        <img class="move-img" class="d-block w-100" src="${dishObject.hotelPhoto}" alt="First slide"> 
        </div> `;
      })
      .join("");
    console.log(allHotelStringAppended);
  

//     for(var i=0 ; i< m.length ; i++) {
//      $('<div class="item"><img src="'+m[i]+'"><div class="carousel-caption"></div>   </div>').appendTo('.carousel-inner');
//      $('<li data-target="#carousel-example-generic" data-slide-to="'+i+'"></li>').appendTo('.carousel-indicators')
 
//    }
//    $('.item').first().addClass('active');
//    $('.carousel-indicators > li').first().addClass('active');
//    $('#carousel-example-generic').carousel();

    //attach the response array of <li>s  in dishlist -> UL
    const dishListUL = document.getElementsByClassName("carousel-inner");
    dishListUL.innerHTML = allHotelStringAppended;
  };


  fetchCity();

 
